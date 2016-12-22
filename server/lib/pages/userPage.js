let api = require('../dao/UserDao.js')
// const UserModle = require('../models/user.js')
const Joi=require('joi');
let Crypto = require('crypto');

/**1.microsoft visual stiduo 2015
2. npm install node-gyp --save
3.npm install bcrypt --save
**/
// const Bcrypt=require('bcrypt');

// authentication


//list users
exports.users = {
    description :'list users',
    notes: 'return a list',
    tags: ['api'],  
    cors:true,
    handler: function (request, reply) {     
            api.list(reply)
        }
}


//get a user
exports.user = {
    description: 'get a user by user id',
    notes: 'get a user',
    tags: ['api'],  
    cors:true,
    validate: {
        params: {
            id: Joi.number().integer()
        }
    },
    handler: function(request,reply) {
      api.get(request,reply)
    }
    
}

// new a user
exports.addUser = {
    description :'Add a new user',
    notes: '0 or 1 ',
    tags: ['api'],
    cors:true,
    validate: {
        payload: {
            name: Joi.string().trim().min(3).max(90),
            login_name: Joi.string().trim().min(3).max(90),
            password: Joi.number().integer()
        }
    },
    handler: function (request, reply) {
           api.add(request,reply);
        }
}

exports.deleteUser = {
    description: 'delete a user',
    notes: '删除用户信息',
    tags:['api'],
    cors:true,
    validate: {
        params: {
            id: Joi.number().integer()
        }
    },
    handler: function(request, reply) {
        api.delete(request,reply);
    }
}

exports.updateUser = {
    description: 'update a user information',
    notes: '根据用户ID更新用户信息。密码除外。',
    tags: ['api'],
    cors:true,
    validate: {
        params: {
            id: Joi.number().integer()
        },
        payload: {
            name: Joi.string().trim().min(3).max(90),
            login_name: Joi.string().trim().min(3).max(90)
        }
    },
    handler: function (request, reply) {    
            api.update(request,reply);
        }
}

exports.login = {
    description:'user login',
    notes:'user login ',
    tags:['api'],
    cors:true,
     validate: {
        payload: {            
            login_name: Joi.string().trim().min(3).max(90).description('登陆名'),
            password: Joi.string().trim().min(3).max(90).description('密码')
        }
    },
    handler: function(request, reply) {
        api.login(request,reply);
    }
}
