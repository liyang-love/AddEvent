import * as React from "react";
import Api from "@api/report";
import { profession, topClass, medicalTypeArr } from "../config";


type treeItem = {
    id:string;
    text:string;
    children:treeItem[];
}
type ReportHeadState = {

    happenScene: {//事发场所
        id: string;
        text: string;
        parId: string;
        children: ReportHeadState["happenScene"];
    }[];
    orgArr:treeItem[],
    happenSceneSon: ReportHeadState["happenScene"],
}




export default  function (WrapComponent: React.ComponentType<ReportSpace.HeadHQText>) {


    return class  extends React.PureComponent<ReportSpace.HeadHQText, ReportHeadState>  {

        state: ReportHeadState = {
            happenScene: [],
            orgArr: [],
            happenSceneSon: [],
        }

        getAllFormData() {

            //事发场景职称层级
            const getSceneCareerClass = Api.sceneCareerClass();
            //科室
            const listOrgTree = Api.listOrgTree();

            Promise.all([getSceneCareerClass, listOrgTree]).then(arr => {

                const {happenScene} = arr[0].data;
                const orgArr = arr[1].data.data;

                this.setState({
                    happenScene,
                    orgArr,
                });

            }).catch(error => {
                console.log(error);
                alert("获取表单数据出错");
            });
        }

        componentDidMount() {

            this.getAllFormData();

        }

        findArrNode(id:string,data:{id:string,text:string,children?:{id:string;text:string}[]}[],childId?:string){
               
                const node = data.find(val=>val.id==id);

                if(childId){
                    const childNode =  node!.children!.find(val=>val.id==childId);

                    return childNode ? childNode.text :"";


                }else{
                    return node ? node.text : "";
                }


                
        }

        findTreeNode(targetId:string,treeData:treeItem[]){

           

            let node= "";
           const fn = function(arr:treeItem[]){
                arr.find(({children,id,text})=>{
                    if(children.length){
                        return fn(children);
                    }else{
                        const is_target = id == targetId;
                        is_target && (node = text)
                        return is_target;
                    }
                })
           }


           fn(treeData);

           return node ;



        }
      

       getDateType(timeStr: string) {


            const arr = [{ "51": "五一" }, { "101": "国庆" }, { "11": "元旦" }];
            const data = new Date(timeStr.split(" ")[0]);
            const _data = data.getMonth() + 1 + "" + data.getDate() as "51";
            const node = arr.find(val => Object.keys(val)[0] == _data);

            let dayString = "";
            if (node) {
                dayString = node[_data]!;
            } else {
                const day = data.getDay();
                dayString = day == 0 ? "周日" : day == 6 ? "周六" : "工作日"
            }
            return dayString;
        }

       
        render() {

            const { happenScene, orgArr, happenSceneSon,} = this.state;
            const {hospitalName,upOrgName,uniqueFile,parmas} = this.props;

            return <WrapComponent 
                        arrConfig = {{profession,medicalTypeArr,topClass,orgArr,happenScene,happenSceneSon}} 
                        getDateType={this.getDateType}
                        parmas={parmas}
                        findArrNode = {this.findArrNode}
                        findTreeNode = {this.findTreeNode}
                        uniqueFile={uniqueFile}
                        hospitalName ={hospitalName}
                        upOrgName={upOrgName}


                     />



        }
    }




};








