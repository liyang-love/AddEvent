import axios from "@js/common/AxiosInstance";
import * as qs from "qs";


export default {

   
    categoryLinkOrg:function (formType:string) {
        return axios.get("event/categoryLinkOrg?formType="+formType)
    },
    sceneCareerClass:function(formType:string){
       
        return axios.get("event/sceneCareerClass?formType="+formType)
    },
    submitAllotOrg:function(eventId:string){
       
        return axios.get("event/submitAllotOrg?eventId="+eventId)
    },
    getAllEvent:function(id:string){
       
        return axios.get("event/getAllEvent?id="+id)
    },
    updateAllEvent:function(){
       
        return axios.get("event/updateAllEvent")
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
    upSummaryCaseError:function(id:string,errMessages:string){//报错不翻译
        return axios.post("/summary/upSummaryCaseError",qs.stringify({id,errMessages}))
    },
    passEnSummaryCase:function(id:string){//通过

        return axios.post("summary/passEnSummaryCase",{id},{
            headers:{
                "Content-Type":"application/json"
            }
        })
    },
    returnSummaryCase:function(id:string,descr:string){//驳回

        return axios.post("/summary/returnSummaryCase",qs.stringify({id,descr}))
    },
    getAllOrg(){
        return axios.get("/summary/getAllOrg")
    },
    


}