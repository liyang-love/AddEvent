import axios from "@js/common/AxiosInstance";
//import * as qs from "qs";


export default {

   
    categoryLinkOrg:function (formType:string) {
        return axios.get("event/categoryLinkOrg?formType="+formType)
    },
    sceneCareerClass:function(id?:string){
       console.log(id)
        return axios.get("event/sceneCareerClass")
    },
    submitAllotOrg:function(eventId:string){
       
        return axios.get("event/submitAllotOrg?eventId="+eventId)
    },
    getAllEvent:function(id:string){
       
        return axios.get("event/getAllEvent?id="+id)
    },
    updateAllEvent:function(data:any){
       
        return axios.post("event/updateAllEvent",data,{
            headers:{
                "Content-Type":"application/json"
            }
        })
    },
    medicalIncidentDate:function(){
       
        return axios.get("event/medicalIncidentDate")
    },
    allReport:function(data:any){
       return axios.post("event/allReport",data,{
            headers:{
                "Content-Type":"application/json"
            }
        })
    },
    orgDefineLevel:function(){
       
        return axios.get("event/orgDefineLevel")
    },
    listOrgTree:function(){
       
        return axios.get("event/listOrgTree")
    },
    causeDamageDegree:function(){
       
        return axios.get("event/causeDamageDegree")
    },
    uploadFile:function(data:FormData){
        return axios.post("excel/uploadFile",data,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })

    },
   


}