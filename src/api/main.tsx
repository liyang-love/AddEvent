import axios from "@js/common/AxiosInstance";
//import * as qs from "qs";

export default {

    getMenu:function(roleId:string){

        return  axios.get("main/getLeftMenu",{
                params:{roleId}
        });


    },
   
    updatePwd:function(data:{id:string,userName:string,	password:string, newPassword:string}){ 
        return axios.post("login/changeCheckPwd",data,{
            headers:{
                "Content-Type":"application/json"
            }
        })

    },
    logOut:function(){
        return axios.get("login/logOut");
    }
    







}