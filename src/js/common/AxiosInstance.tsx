import axions from "axios";

const instance = axions.create({
									baseURL:"./AdvEvent",
});

instance.interceptors.response.use(function (response) {

		if(response.status != 20000){
			return response;
		}else{// session过期，重新登录
			 return Promise.reject();
		}
    
    
  }, function (error) {
   	
    return Promise.reject(error);
  });

export default instance ;