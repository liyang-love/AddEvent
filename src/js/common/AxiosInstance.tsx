import axions from "axios";

const instance = axions.create({
									baseURL:"http://localhost:8034/AdvEvent",
});

instance.interceptors.response.use(function (response) {

		if(response.status == 200){
			return response;
		}else{// session过期，重新登录
			console.log("请求出错")
			 return Promise.reject();
		}
    
    
  }, function (error) {
   	
    return Promise.reject(error);
  });

export default instance ;