import axions ,{AxiosResponse}from "axios";
const instance = axions.create({
		baseURL:window.getSession("getPath"),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-Requested-With': 'XMLHttpRequest',
			'X-Custom-Header': 'foobar'
		},
		

});

declare global{


	interface AxiosInterfaceResponse extends AxiosResponse<any>{
		data:any;
		message:string;
		code:number;
	}


}



instance.interceptors.response.use(function (response) {

		if(response.headers["content-type"].includes("text/html")){
			window.location.href=window.getSession("getPath")+"login";
			return Promise.reject();
		}	
		const data = response.data;

		const has_init = "code" in data;

		if(has_init){

			if (data.code == 200 || data.code == 4000) {
				return response.data;
			} else {// session过期，重新登录
				return Promise.reject(data);
			}


		}else{

			const objInit = {
				code:200,
				message:"",
				data:null
			}
		
			const dataType = Object.prototype.toString.call(data);
			if(dataType === "[object Array]"){
				objInit.data = data ;
			}else if(dataType === "[object Object]"){
				if("data" in data){
					objInit.data = data.data;
				}else{
					objInit.data = data;
				}
			};

			console.log(objInit)

			return objInit ;
		
		
		}
		

		

		
    
    
  }, function (error) {
   	
    return Promise.reject(error);
	});
	

export default instance ;