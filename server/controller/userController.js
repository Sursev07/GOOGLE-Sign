const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken')

class userController{
    static googleSign = (req, res)=>{
        var token = req.body.token;
        console.log(token);
        client.verifyIdToken({
            idToken:token,
            audience:process.env.CLIENT_ID
        })
        .then(ticket=>{
            const payload = ticket.getPayload();
            var user = {
                name:payload.name,
                email:payload.email,
                password:"1234"
            }
            return User.findOne({where : {email:user.email}})
        })
        .then(data => {
            if(data) {
                return data;
            } else {
                return User.create(user);
            }
        })
        .then(data => {
            console.log(data.dataValues);
            var token = jwt.sign({email:payload.email}, process.env.SECRET, )
            res.status(200).json({access_token: token, data:data.dataValues.name})
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }
}

module.exports = userController