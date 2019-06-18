import * as React from "react";
import "@css/report.scss";
import { RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps } from "react-redux";
import Api from "@api/report";
import { SvgIcon, Button, Icon } from "@js/common/Button";
import {Notification} from "@js/common/toast/index";

import NurseReport from "./nurseReport/index";
import Medical from "./medical/index";
import MedicalDevice from "./medicalDevice/index";
import Drug from "./drug/index";
import Accident from "./accident/index";
import Logistics from "./logistics/index";
import Infection from "./infection/index";

enum ReportType {
	accident="",//意外
	drug="7023",//药品
	infection="7033",//院感
	logistics="7031",//后勤
	medical="7021",//医疗
	medicalDevice="7024",//医疗器械
	nurseReport="7022"//护理
}

type ReportProp = {

}


type ReportState = {
	curPage: number;
	totalPage: number;

}


type field = keyof ReportSpace.ReportAPI["params"];


class Report extends React.PureComponent<RouteComponentProps<ReportProp> & reduxState, ReportState> implements ReportSpace.ReportAPI {

	params: ReportSpace.ReportAPI["params"] = {
		upOrgId: this.props.orgId,
		patientOrgId: this.props.orgId,
		bedNumber: "",
		patientName: "",
		sex: "男",
		age: "",
		admissionTime: "",
		medicalRecordNumber: "",
		primaryDiagnosis: "",
		rsaFall: "",
		rsaPressureSore: "",
		rsaCareAbility: "",
		rsaNonPlanned: "",
		rsaOther: "",
		currentPeople: "",
		cpProfession: "",
		cpTopClass: "",
		happenTime: "",
		discoverer: "",
		dProfession: "",
		dTopClass: "",
		discoveryTime: "",
		reporter: "",
		rProfession: "",
		rTopClass: "",
		reportTime: "",
		incidentSceneId: "",
		dadIncidentSceneId: "",
		dateType: "",
		reporterNumber: "",
		medicalType: "",
	//	incidentTime: "",
		workYear: "",
		orgWorkYear: "",
		beforeAccident: "",
		patientNumber: "",
		weight: "",
		liveDoorNumber: "",
		birthDate: "",
		anamnesis: "",
		productName: "",
		registerNo: "",
		modelNumber: "",
		standard: "",
		instrumentDate: "",
		batchNumber: "",
		UDI: "",
		manufactureDate: "",
		effectiveDate: "",
		productCode: "",
		qxReasonDescribe:"",
		qxAnalyseReason: "",
		hurtRank: "",
		hurtPerform: "",
		kindEquipment:"",
		degreeRisk: "",
		pollutantSource: "",

		passResult: "",
		pass: "",
		result: "",//处理结果
		psSignatory: "",//当事人(简要事件的经过及结果)
		psDate: "",//日期(简要事件的经过及结果)
		treatmentMeasures: "",//处理措施
		tmSignatory: "",//签字人(处理措施)
		tmDate: "",//日期(处理措施)
		analysisCauses: "",//原因分析
		acSignatory: "",//签字人(原因分析)
		acDate: "",//日期(原因分析)
		correctiveActions: "",//改进措施
		caSignatory: "",//签字人(改进措施)
		caDate: "",//日期(改进措施)

		orgRank: "",//科室定级

		functionOrgRank: "",//职能科室定级
		property: "",//不良事件性质界定：风险注册、系统错误、个人错误
		propertyContent: "",//界定说明
		frequency: "",//不良事件频率界定
		frequencyContent: "",//界定说明
		allotStatus: "",//分配的状态

		man: "",//人(主要原因分析)
		machine: "",//机(主要原因分析)
		object: "",//物(主要原因分析)
		law: "",//法(主要原因分析)
		ring: "",//环(主要原因分析
		deleteSaveCommit: "1",//删除或保存或提交
		formType: this.props.location.state.id,//表单类型 

		admissionNumber: "",//住院号
		similarIncidentOne: "",//发生过类似的事件1
		similarIncidentTwo: "",//发生的类似事件2
		damageDegree: "",
		// modifyStatus :"",//修改状态
	}

	state: ReportState = {
		curPage: 0,
		totalPage: 1,
	}

	notificationRef:React.RefObject<Notification>=React.createRef();

	inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

		const target = e.currentTarget!;

		const field = target.name as field;
		const requireValid = target.validity.valueMissing;
		requireValid ? target.classList.add("no-fill") : target.classList.remove("no-fill")

		this.params[field] = e.target.value.trim();
	}

	setCalendarObj = (setTimeArr: Readonly<any[]>, field: string) => {
		this.params[field as field] = setTimeArr.join("");

	}

	setComboboxObj = (selArr: Readonly<any[]>, field: string) => {

		this.params[field as field] = selArr[0].id;
	}

	upReportHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
		
		console.log(this.params);

		console.log(JSON.stringify(this.params,null,"\t"))

		const noFill = document.querySelectorAll("#gReport .no-fill");
		const Notification = this.notificationRef.current!;
		if (noFill.length) {
			Notification.addNotice("填写完整！","warn")
			return;
		}

		const type = e.currentTarget.name;
		this.params.deleteSaveCommit = type;

		Api.allReport(this.params).then(res => {
			console.log(res);

		});

	
	}

	upFileHandle = (file: FileList) => {


		console.log(file);

		//const formData = new FormData();

		//formData.set("eventId","1");


		//formData.set("files",file);



	}

	getParams = () => {
		return this.params;
	}

	getMethods = <k extends ReportSpace.methodName>(methodsName: ReportSpace.methodName): ReportSpace.ReportAPI[k] => {
		return this[methodsName as k];

	}

	changePage = () => {
		this.setState(pre => {
			return {
				curPage: (1 - pre.curPage),
			}
		})
	}

	getReport(id:string,curPage:number,orgName:string){

		switch(id+""){
			case ReportType.nurseReport :
				return <NurseReport formType={id} hospitalName="中医院" showPage={curPage} getMethods={this.getMethods} upOrgName={orgName} />
				
			case ReportType.accident:

				return <Accident formType={id} hospitalName="中医院" showPage={curPage} getMethods={this.getMethods} upOrgName={orgName} />
			case ReportType.drug:

				return <Drug formType={id}  hospitalName="中医院" showPage={curPage} getMethods={this.getMethods} upOrgName={orgName} />
			case ReportType.infection:

				return <Infection formType={id} hospitalName="中医院" showPage={curPage} getMethods={this.getMethods} upOrgName={orgName} />
			case ReportType.medical:

				return <Medical formType={id} hospitalName="中医院" showPage={curPage} getMethods={this.getMethods} upOrgName={orgName} />
			case ReportType.medicalDevice:

				return <MedicalDevice formType={id} hospitalName="中医院" showPage={curPage} getMethods={this.getMethods} upOrgName={orgName} />
			case ReportType.logistics:

				return <Logistics formType={id} hospitalName="中医院" showPage={curPage} getMethods={this.getMethods} upOrgName={orgName} />


		}

	}


	render() {

		const { curPage, totalPage } = this.state;
		const { location: { state: { id, text } }, orgName } = this.props;
		const is_first = curPage === totalPage;


		return (
			<div className="page-report">

				<Notification ref={this.notificationRef}/>

				<div className="g-theme">
					<span ><b style={{ fontSize: 18 }}>{text}</b><span>&nbsp;&nbsp;第 {curPage + 1} 页</span>&nbsp;&nbsp;&nbsp;<span className="require">（非必填项）</span></span>
					<span className="m-optBtn">
						<Button handle={this.changePage}>
							{is_first ? "上" : "下"}一页
						</Button>
						<Button handle={this.upReportHandle} field="1">
							<SvgIcon styleType="submit"/>
							提交
						</Button>
						<Button handle={this.upReportHandle}>
							<Icon styleType="fa-save"/>
							保存
						</Button>
					</span>
				</div>
				<div className="g-report" id="gReport">
					<div className="report-article">
						{this.getReport(id,curPage,orgName)}	
					</div>
				</div>
			</div>
		)
	}
}


type reduxState = {
	orgName: string;
	orgId: string;
}


const mapStateToProps: MapStateToProps<reduxState, RouteComponentProps<ReportProp>, appStore> = ({ app }) => {

	const index = app.get("roleIndex");

	return {
		orgName: app.get("orgName")[index],
		orgId: app.get("orgId")[index],
	}
}


export default connect(mapStateToProps)(Report);