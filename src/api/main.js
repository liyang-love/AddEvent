import "api/index.js";

const {role_id,baseUrl,user_id} = window.jsp_config;

class ApI {
	getLeftMenu(roleId){
		return new Promise((resolve,reject)=>{
			$.get(baseUrl+"getMenu",function(res) {
				resolve(res);
			});
		});
	}
   checkPwd(pwd){
   		return Promise.resolve($.post(baseUrl+"login/checkPwd",{pwd,user_id}));
   }
   changePwd(pwd){

   		return Promise.resolve($.ajax(
   			{
   				method:"post",
   				url:baseUrl+"login/changePwd",
		   		data:{user_id,pwd},
   			}
   		));
   }
   
}



const api = new ApI();


export {api};