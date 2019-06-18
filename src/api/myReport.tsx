
import axios from "@js/common/AxiosInstance";
import * as qs from "qs";

export default {

    upOrgShowBar:function(orgId:string){

        return  axios.post("handle/upOrgShowBar",qs.stringify({orgId}))
    },
   
    updatePwd:function(data:{id:string,userName:string,	password:string, newPassword:string}){ 
        return axios.post("login/changeCheckPwd",data,{
            headers:{
                "Content-Type":"application/json"
            }
        })

    },
    
    







}