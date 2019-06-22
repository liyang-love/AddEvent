import * as React from "react";
import Api from "@api/report";
import { profession, topClass, dataTypeArr, medicalTypeArr } from "../config";



type ReportHeadState = {

    happenScene: {//事发场所
        id: string;
        text: string;
        parId: string;
        children: ReportHeadState["happenScene"];
    }[];
    anonymity: boolean;
    orgArr: {
        id: string;
        name: string;
    }[],
    happenSceneSon: ReportHeadState["happenScene"],
    reportDateType: string;
}




export default  function (WrapComponent: React.ComponentType<ReportSpace.HeadHQ & ReportSpace.HeadWrapProp>) {


    return class  extends React.PureComponent<ReportSpace.HeadWrapProp, ReportHeadState>  {

        state: ReportHeadState = {
            happenScene: [],
            anonymity: false,
            orgArr: [],
            happenSceneSon: [],
            reportDateType: "",
        }

        getAllFormData() {

            //事发场景职称层级
            const getSceneCareerClass = Api.sceneCareerClass();
            //科室
            const listOrgTree = Api.listOrgTree();

            Promise.all([getSceneCareerClass, listOrgTree]).then(arr => {

                const {happenScene} = arr[0].data;
                const orgArr = arr[1].data.data;

                const { getMethods } = this.props;
                const parmas = getMethods<"getParams">("getParams")();

                let timeStr = parmas.reportTime.split(" ")[0];

                const daystring = this.changeDateType(timeStr);

                this.setState({
                    happenScene,
                    orgArr,
                    reportDateType: daystring
                });

            }).catch(error => {
                console.log(error);
                alert("获取表单数据出错");
            });
        }

        componentDidMount() {

            this.getAllFormData();

        }
        changeAnonymity = () => {
            this.setState(pre => ({
                anonymity: !pre.anonymity
            }))
        }

        changeHappenceSon = (slecteArr: Readonly<any[]>, filed: string, node: any) => {
            this.setState({
                happenSceneSon: node.children,
            })
            this.props.getMethods<"setComboboxObj">("setComboboxObj")(slecteArr, filed);
        }

        changeDateType(timeStr: string) {


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
            const id = dataTypeArr.find(val => val.text == dayString!)!.id + "";
            this.props.getMethods<"changeDateType">("changeDateType")(id);
            return dayString;
        }

        changeReportDayType = (selTimeArr: Readonly<any[]>, field: string) => {

            const { getMethods } = this.props;

            getMethods<"setCalendarObj">("setCalendarObj")(selTimeArr, field);

            const dayString = this.changeDateType(selTimeArr[0].split(" ")[0]);
            this.setState({
                reportDateType: dayString
            });

        }
        render() {

            const { happenScene, anonymity, orgArr, happenSceneSon, reportDateType } = this.state;
            const {hospitalName,upOrgName,getMethods,uniqueFile} = this.props;

            return <WrapComponent 
                        arrConfig = {{profession,medicalTypeArr,topClass,orgArr,happenScene,happenSceneSon}} 
                        anonymity={anonymity}
                        reportDateType={reportDateType}
                        changeReportDayType={this.changeReportDayType}
                        changeAnonymity={this.changeAnonymity}
                        changeHappenceSon={this.changeHappenceSon}
                        uniqueFile={uniqueFile}
                        hospitalName ={hospitalName}
                        upOrgName={upOrgName}
                        getMethods={getMethods}


                     />



        }
    }




};








