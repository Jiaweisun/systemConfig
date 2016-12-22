const Hapi=require('hapi');
const Good =require('good');//for log
const Inert=require('inert');// for directing to static page
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');

let Routers = require('./lib/routers/routes.js')

const server = new Hapi.Server();
server.connection({ port: 3200});



const swaggerOptions = {
	info: {
		'title' : 'Test api Documentation',
		'version': '1.0',
		'contact': {
                'name': 'Jiaweisun Sun',
                'email': 'sunjiawei8930@163.com'
            }
	}
};

const goodOptions = {
	ops:{
		interval:1000
	},
	reporters:{
		console:[{
			module:'good-squeeze',
			name:'Squeeze',
			args:[{
				response:'*',
				log:'*'
			}]
		},{
			module:'good-console'
		}, 'stdout']}
};

server.register([
		Inert,
		Vision,
		{
			'register': HapiSwagger,
			'options': swaggerOptions
		},
		{
			register: Good,
			options: goodOptions
}],(err)=>{
	if(err){throw err;}	
	server.start((err) => {
    	if (err) {throw err;}
    	console.log('【info】','Server running at:', server.info.uri);
	});
});


server.route(Routers.routers );