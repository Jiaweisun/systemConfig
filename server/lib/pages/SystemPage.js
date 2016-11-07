let api = require('../dao/SystemDao.js')
const Joi=require('joi');


exports.list = {
    description :'list Systems',
    notes: 'return a list',
    tags: ['api'],
    cors:true,
    handler: function (request, reply) {        
            api.list(rows => {reply(rows)})
        }
}

exports.findById = {
    description: 'get a System by id',
    notes: 'get a System',
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

exports.findByName = {
    description: 'get a System by name',
    notes: 'get a System',
    tags: ['api'],   
    cors:true, 
    validate: {
         payload: {
            system: Joi.string().trim().min(1).max(90)
        }
    },
    handler: function(request,reply) {
      api.getByName(request,reply)
    }    
}


exports.add = {
    description :'Add a new system',
    notes: '0 or 1 ',
    tags: ['api'],
    cors:true,
    validate: {
        payload: {
            title: Joi.string().trim().min(1).max(90),
            name: Joi.string().trim().min(1).max(90)
            // password: Joi.number().integer()
        }
    },
    handler: function (request, reply) {
           api.add(request,reply);
        }
}


exports.delete = {
    description: 'delete a System',
    notes: '删除系统信息',
    tags: ['api'],
    cors: true,
    validate: {
        params: {
            id: Joi.number().integer()
        }
    },
    handler: function(request, reply) {
        api.delete(request,reply);
    }
}