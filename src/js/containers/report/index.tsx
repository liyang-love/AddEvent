import * as React from "react";
import "@css/report.scss" ;
import {RouteComponentProps} from "react-router-dom";
import  NurseReport from "./NurseReport";
import {connect,MapStateToProps} from "react-redux";


type ReportProp={

}


type ReportState={
		curPage:number;
		totalPage:number;
}

interface ReportAPI {
	getMethods:ReportSpace.getMethods;
	params:{
			upOrgId:string; //科室
			patientOrgId:string;//患者所在科室
			bedNumber:number;//床号
			patientName:string;//姓名
			sex:string;
			age:number;
			admissionTime:string; //入院时间
			medicalRecordNumber:string;// 病历号
			primaryDiagnosis:string;//主要诊断
			rsaFall:string;//跌倒(相关风险评估)
			rsaPressureSore:string;//压疮(相关风险评估)
			rsaCareAbility :string;//自理能力(相关风险评估)
			rsaNonPlanned:string;//非计划拔管(相关风险评估)
			rsaOther:string;//其他(相关风险评估)
			currentPeople:string;//当事人
			cpProfession:string;//职称(当事人)
			cpTopClass:string;//层级(当事人)
			HappenTime:string;//发生时间(当事人)
			discoverer:string;//发现人
			dProfession:string;//职称(发现人)
			dTopClass:string;//层级(发现人)
			dDiscoveryTime:string;//发现时间(发现人)
			reporter:string;//报告人
			rProfession:string;//报告人(职称)
			rTopClass:string;//层级(报告人)
			ReportTime:string;//报告时间
			incidentSceneId:string;//事发场景
			dadIncidentSceneId:string;//事发场景父级id
			dateType:string;//日期类型
			reporterNumber:number;//上报科室人手机号
			medicalType:string;//医疗类型 
			incidentTime:string;//事发时段
	}
}

type field = keyof ReportAPI["params"] ;

class Report extends React.PureComponent< RouteComponentProps<ReportProp> & reduxState,ReportState> implements ReportAPI  {

	params = {
		upOrgId:this.props.orgId,
		patientOrgId:"",
		bedNumber:0,
		patientName:"",
		sex:"男",
		age:0,
		admissionTime:"",
		medicalRecordNumber:"",
		primaryDiagnosis:"",
		rsaFall:"",
		rsaPressureSore:"",
		rsaCareAbility :"",
		rsaNonPlanned:"",
		rsaOther:"",
		currentPeople:"",
		cpProfession:"",
		cpTopClass:"",
		HappenTime:"",
		discoverer:"",
		dProfession:"",
		dTopClass:"",
		dDiscoveryTime:"",
		reporter:"",
		rProfession:"",
		rTopClass:"",
		ReportTime:"",
		incidentSceneId:"",
		dadIncidentSceneId:"",
		dateType:"",
		reporterNumber:0,
		medicalType:"",
		incidentTime:"",
	}
	state:ReportState={
		curPage:0,
		totalPage:1,
	}

	inputChange(e:React.ChangeEvent<HTMLInputElement>){
			const field = e.currentTarget.name as field;
			this.params[field] = e.target.value.trim();
	}

	setCalendarObj(setTimeArr:any[],field:string){
			this.params[field as field]= setTimeArr.join("");
	}

	setComboboxObj(selArr:any[],field:string){

			this.params[field as field] = selArr[0].id;
	}

	upReportHandle=()=>{

			console.log(this.params);

	}

	getMethods=(methodsName:"inputChange" | "setCalendarObj" | "setComboboxObj")=>{
		return  this[methodsName].bind(this);

	}

	changePage=()=>{
		this.setState(pre=>{
			return {
				curPage: (1 - pre.curPage),
			}
		})
	}



	
	render(){

		const {curPage,totalPage} = this.state;
		const {location:{state:{id,text}},orgName} = this.props;
		const is_first = curPage === totalPage;


		return (
				<div className="page-report">
					<div className="g-theme">
						<span ><b style={{fontSize:18}}>{text}</b><span>&nbsp;&nbsp;第 {curPage + 1} 页</span></span>
						<span>
									<button className="s-btn normal-btn" onClick={this.changePage}>{is_first ?"上" :"下"}一页</button>&nbsp;
									<button className="s-btn normal-btn" onClick={this.upReportHandle}>上报</button>&nbsp;
									<button className="s-btn normal-btn">关闭</button>
						</span>
					</div>
					<div className="g-report">
						<div className="report-article">
									<NurseReport formType={id} showPage={curPage} getMethods={this.getMethods} upOrgName={orgName} />
						</div>
					</div>
				</div>
			)
	}
}


type reduxState={
	orgName:string;
	orgId:string;
}


const mapStateToProps:MapStateToProps<reduxState,RouteComponentProps<ReportProp>,appStore>=({app})=>{


	return {
		orgName:app.get("userInfo").orgName![0],
		orgId:app.get("userInfo").orgId![0],
	}
}


export default connect(mapStateToProps)(Report);