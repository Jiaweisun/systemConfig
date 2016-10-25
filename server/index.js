const Hapi=require('hapi');
const Good =require('good');//for log
const Inert=require('inert');// for directing to static page
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');

let Routers = require('./lib/routers/routes.js')


const server = new Hapi.Server();
server.connection({ port: 3200});

// server.auth.strategy('simple', 'basic', { validateFunc: validate });
server.route(Routers.routers );

const options = {
	info: {
		'title' : 'Test api Documentation',
		'version': '1.0',
		'contact': {
                'name': 'Jiaweisun Sun',
                'email': 'sunjiawei8930@163.com'
            }
	}
};

server.register([
		Inert,
		Vision,
		{
			'register': HapiSwagger,
			'options': options
		},
		{
			register:Good,
			options:{
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
				}
}],(err)=>{
	if(err){throw err;}	
	server.start((err) => {
    	if (err) {throw err;}
    	console.log('info','Server running at:', server.info.uri);
	});
});