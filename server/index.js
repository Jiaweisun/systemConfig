const Hapi=require('hapi');
const Good =require('good');//for log
const Inert=require('inert');// for directing to static page
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const HapiRouter = require('hapi-router');

/**
Authentication ( pending )
**/
const Basic = require('hapi-auth-basic');

/**
**/
const server = new Hapi.Server();
server.connection({ port: 3200});


//1. loading router by a trandition way.
let Routers = require('./lib/routers/routes.js')
server.route(Routers.routers );


/**
* options setting
*/

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
		consoleReporter:[{
			module:'good-squeeze',
			name:'Squeeze',
			args:[{
				response:'*',
				log:'*'
			}]
		},{
			module:'good-console'
		}, 'stdout'],

		fileReporter:[{
			module:'good-squeeze',
			name:'Squeeze',
			args:[{	ops:'*'}]
		},{
			module:'good-squeeze',
			name:'SafeJson'
		},{
			module:'good-file',
			args:['./logs/configcenter_log']
		}],

		httpReporter:[{
			module:'good-squeeze',
			name:'Squeeze',
			args:[{ error:'*'}]
		},{
			module:'good-http',
			args:['http://SJW:3200',{
				wreck:{
					header:{'x-api-key':12345}
				}
			}]
		}],
	}
};

/**
* 2. router options setting.
*/
const routerOptions = {
	routes: '/lib/routers/*.js'// uses glob to include files
};


// plugin register and start.
server.register([
	Inert,
	Vision,
	Basic,
	{
		'register': HapiSwagger,
		'options': swaggerOptions
	},{
		register: Good,
		options: goodOptions
	},{
		register: HapiRouter,
		options: routerOptions
	}
],(err)=>{
	server.start((err) => {
    	if (err) {throw err;}
    	console.log('【info】','Server running at:', server.info.uri);
	});
});


