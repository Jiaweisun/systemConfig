let api = require('../dao/ThirdDao.js');
const Joi=require('joi');


exports.findByPs = {
    description :'find properties',
    notes: '0 or 1 ',
    tags: ['api'],
    cors:true,
    validate: {
        payload: {
            system: Joi.string().trim().min(1).max(90),
            profile: Joi.string().trim().min(1).max(90),
            filename: Joi.string().trim().min(1).max(90),
            format: Joi.string().trim().min(1).max(90)
        }
    },
    handler: function (request, reply) {        
           api.findByPs(request,reply);
        }
}



exports.findFilesByPs = {
    description :'find files',
    notes: '0 or 1 ',
    tags: ['api'],
    cors:true,
    // cors:{
    //     headers: ['Content-Type'],
    //     origin: ['*']
    // },  
    validate: {  
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     // 'Accept': 'application/x-www-form-urlencoded',
        //     // "Content-Length":35,            
        //     // allow: 'application/x-www-form-urlencoded'        
        // },
        payload: {
            // mode: 'parse',
            // parse:true,
            system: Joi.string().trim().min(1).max(90),
            profile: Joi.string().trim().min(1).max(90)   

        }       
    },
   
    handler: function (request, reply) {
        console.log('request:'+request);
           api.getFilesByPs(request,reply);
        }
}
