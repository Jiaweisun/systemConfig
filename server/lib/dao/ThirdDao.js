const connect = require('../../resources/db.js');
let systemApi = require('../dao/SystemDao.js');
let fileApi = require('../dao/SystemFilesDao.js');
let fileConfigApi = require('../dao/SystemConfigDao.js');

var base64 = require("base64-node");

module.exports = {

	findByPs: function(req, res) {
		
		let profile = "";

		systemApi.getByName(req, system_id =>{	
			
			if (req.payload.profile=="dev") {
				profile =  "dev_value";
			}
			if (req.payload.profile=="qa") {
				profile =  "qa_value";
			}
			if (req.payload.profile=="prod") {
				profile =  "prod_value";				
			}

			
			fileApi.getByName(req, file_id=>{

				// fileApi.get()
				let sql = "select key_name ,  "+profile+" from system_cfg where system_id = "+system_id+" and file_id = "+file_id;

				let format = req.payload.format;
				connect.query(sql, function(err, rows) {

				let result = " \t ";
				let resultJson = '{ "propertites":{';
		 		if (err) { throw err;}
		 		if (format == "json") {		 			
		 			for (var i = 0; i < rows.length; i++) {
		 				if(i == rows.length-1) {
		 					if (profile == "dev_value") {
		 						resultJson +='"'+ rows[i].key_name+'":"'+rows[i].dev_value+'"';
		 					}
		 					if (profile == "qa_value") {
		 						resultJson +='"'+ rows[i].key_name+'":"'+rows[i].qa_value+'"';
		 					}
		 					if (profile == "prod_value") {
		 						resultJson +='"'+ rows[i].key_name+'":"'+rows[i].prod_value+'"';
		 					}
		 					
		 				}else{
		 					if (profile == "dev_value") {
		 						resultJson +='"'+ rows[i].key_name+'":"'+rows[i].dev_value+'",';
		 					}
		 					if (profile == "qa_value") {
		 						resultJson +='"'+ rows[i].key_name+'":"'+rows[i].qa_value+'",';
		 					}
		 					if (profile == "prod_value") {
		 						resultJson +='"'+ rows[i].key_name+'":"'+rows[i].prod_value+'",';
		 					}
		 				}		 					
		 			}	
		 			resultJson+='}}';	 			
		 			res(resultJson);
		 		}
		 		if (format == "text") {
					for (var i = 0; i < rows.length; i++) {
						if (profile == "dev_value") {
		 						result += "\n "+ rows[i].key_name+"="+rows[i].dev_value;
		 					}
		 					if (profile == "qa_value") {
		 						result += "\n "+ rows[i].key_name+"="+rows[i].qa_value;
		 					}
		 					if (profile == "prod_value") {
		 						result += "\n "+ rows[i].key_name+"="+rows[i].prod_value;
		 					}		
		 			}
		 			res(result);
		 		}
			});

			});	
		});	
	},



	getFilesByPs:function(req,res) {
		let result = '{"files" :[';
		let resultp = '';	
		let  xml_result = '';
		
		fileApi.getFilesBySysName(req, files=>{		
			let fileSize = files.length;
			let fileSizeMin = fileSize-1;

			var cnt = 0;
			for (var i=0; i < fileSize; i++) {				
				let file_id = files[i].id;
				let file_name = files[i].name;
				let file_type = files[i].type;
				let file_content = files[i].content;

				if (file_type=="xml"||file_type=="text/xml") {										
					xml_result += '{"name": "'+file_name+'", "content": "'+base64.encode(file_content)+'"}';
					cnt++;
				}else {						
					let pro_content ="";			
					
						fileConfigApi.getBySfName(req, file_id, file_config=>{							
							resultp +='{"name": "'+file_name+'", "content": "'+pro_content;											
							for (var j = 0; j < file_config.length; j++) {
								if (profile == "dev_value") {
								 	pro_content += "\n "+ file_config[j].key_name+"="+file_config[j].dev_value;
								}
								if (profile == "qa_value") {
								 	pro_content += "\n "+ file_config[j].key_name+"="+file_config[j].qa_value;
								}
								if (profile == "prod_value") {
								 	pro_content += "\n "+ file_config[j].key_name+"="+file_config[j].prod_value;
								}		
							}
							let  base64_pro_content = base64.encode(pro_content);						
							resultp+=base64_pro_content+'"},';	
							
							cnt ++;							
							if(cnt == fileSize) {
								result += xml_result+','+resultp;	
								result += ']}';
								res(result);								
							}
						});					
				}
			}
		})
	}
}

	