const axios = require('axios')
const Dev = require('../models/Dev')
module.exports = {
    async index(req, resp){
        const {user} = req.headers

        const loggedDev = await Dev.findById(user)
        
        if(!loggedDev){
            return resp.status(400).json('Login to continue')
        }

        const users = await Dev.find({
            //$and = meet all requirements
            $and: [
                { _id: { $ne: user} /*$ne = not equals*/ },
                { _id: { $nin: loggedDev.likes} /*$nin = not in*/},
                { _id: { $nin: loggedDev.dislikes} /*$nin = not in*/}
            ]
        })
        
        return resp.json(users)
    },

    async store(req, resp){
        //console.log(req.body.username)
        
        const {username} = req.body
        
        const userExists = await Dev.findOne({user: username})

        if(userExists){
            return resp.json(userExists)           
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)

        const { name, bio, avatar_url: avatar} = response.data

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return resp.json(dev)
    }
}