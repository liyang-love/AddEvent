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

import {createTypedMap} from "@js/common/ImmutableMap";

enum ReportType {
	accident="7025",//意外
	drug="7023",//药品
	infection="7033",//院感
	logistics="7031",//后勤
	medical="7021",//医疗
	medicalDevice="7024",//医疗器械
	nurseReport="7022"//护理
}

type ReportProp = {
	formType:string;
	text:string;
	data:ReportSpace.params;
	orgName:string;
	eventId:string;
}


type ReportState = {
	curPage: number;
	totalPage: number;
	params:TypedMap<ReportSpace.params>;
}


type field = keyof ReportSpace.params;


class Report extends React.PureComponent<ReportProp, ReportState> implements ReportSpace.ReportAPI {
	uniqueFile: ReportSpace.infectionUniqueFile;
	constructor(props:ReportProp){

		super(props);
		const {uniqueFile} = this.props.data;
		const inflection = {
			skin: ["0", "0"],//皮肤暴露
			SharpWeapon: ["0", "0", "0", "0"],//利器利器伤
			mucosal: ["0", "0", "0"],//黏膜暴露
			flushingTime: "",//冲洗时间
			flushingTimeTxt: "",//备注
			HBV: "",//HBV
			fiveCase: "",//乙肝五项情况 
			HBV_DNA: "",
			HBV_RNA: "",
			treponema: "",//梅毒螺旋体抗体 
			hiVAntibody: "",//HIV抗体 
			otherIll: "",//其他传染病 
			vaccine: "0",//是否接种过乙型肝炎疫苗
			vaccineReaction: "",//疫苗反应
			vaccineTime: "",//接种时间 
			createAntibody: "0",//是否产生抗体
			antibodyTiter: "",//抗体滴度(mIU/ml)
			antibodyLastTime: "",//最后一次复查抗体时间
			training: "0",//是否接受职业暴露培训
			trainingPlace: "",//培训地点 
			HBVTxt: "",//接触HBV后的预防措施
			fiveCase1: "",
			HBV_DNA1: "",
			HBV_RNA1: "",
			treponema1: "",
			hiVAntibody1: "",
			HCV: "",//抗-HCV
		};

		if(uniqueFile){
			try {
				this.uniqueFile = JSON.parse(uniqueFile);
			} catch (error) {
				console.log(error);
				this.uniqueFile = inflection;
			}
			
		}else{
			this.uniqueFile = inflection;
		}

		
	}


	state: ReportState = {
		curPage: 0,
		totalPage: this.props.formType == "7033" ? 3 : 1,
		params:createTypedMap(this.props.data) 
	}

	notificationRef:React.RefObject<Notification>=React.createRef();

	inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

		const target = e.currentTarget!;

		const field = target.name as field;
		const requireValid = target.validity.valueMissing;
		requireValid ? target.classList.add("no-fill") : target.classList.remove("no-fill");

		this.setState(pre=>{


			return{

				params:pre.params.set(field,target.value.trim())
			}
		})

		
	}

	inputChangeUniqueFile=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{

		const target = e.currentTarget!;
		const field = target.name ;
		const requireValid = target.validity.valueMissing;
		requireValid ? target.classList.add("no-fill") : target.classList.remove("no-fill");

		(this.uniqueFile as any)[field] = target.value.trim();

	}

	checkboxGroupChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

		const  fieldArr = e.currentTarget!.name.split("@");
		const field = fieldArr[0];
		const index = fieldArr[1];

		(this.uniqueFile as any)[field][index] = e.currentTarget!.value.trim();





	}

	changeDateType=(id:string)=>{

		this.setState(pre=>{


			return{

				params:pre.params.set("dateType",id)
			}
		})
	}

	setCalendarObj = (setTimeArr: Readonly<any[]>, field: field) => {

		if(field in this.uniqueFile){


		(this.uniqueFile as any)[field] = setTimeArr.join("");

		}else{

			this.setState(pre=>{
				return{

					params:pre.params.set(field,setTimeArr.join(""))
				}
			})

		}

	

	}

	setComboboxObj = (selArr: Readonly<any[]>, field: field) => {
		
		this.setState(pre=>{


			return{

				params:pre.params.set(field,selArr[0].id)
			}
		})
	}

	upReportHandle = (e: React.MouseEvent<HTMLButtonElement>) => {

		const params = this.state.params.toJS();
		
		console.log(params);
		console.log(this.uniqueFile);
		console.log(JSON.stringify(params,null,"\t"));

		params.uniqueFile = JSON.stringify(this.uniqueFile);

		const noFill = document.querySelectorAll("#gReport .no-fill");
		const Notification = this.notificationRef.current!;
		if (noFill.length) {
			Notification.addNotice("填写完整！","warn")
			return;
		}

		const type = e.currentTarget.name;
		params.deleteSaveCommit = type as ReportSpace.params["deleteSaveCommit"];

		const {eventId} = this.props;
		if(eventId){//修改
			params.id=eventId;
			Api.updateAllEvent(params).then((res:AxiosInterfaceResponse)=>{

			

				if(res.code==200){

					this.notificationRef.current!.addNotice("修改成功！","success");

				}else{

					this.notificationRef.current!.addNotice("修改失败！","error");
				}
			})

		}else{
			Api.allReport(params).then((res:AxiosInterfaceResponse) => {
			
				if(res.code==200){

					this.notificationRef.current!.addNotice("提交成功！","success");

				}else{

					this.notificationRef.current!.addNotice("提交失败！","error");
				}

			});

		}

		

	
	}

	upFileHandle = (file: FileList) => {


		console.log(file);

		//const formData = new FormData();

		//formData.set("eventId","1");


		//formData.set("files",file);



	}

	getParams = () => {
		return this.state.params.toJS();
	}

	getMethods = <k extends ReportSpace.methodName>(methodsName: ReportSpace.methodName): ReportSpace.ReportAPI[k] => {
		return this[methodsName as k];

	}

	changePage = (e:React.MouseEvent<HTMLButtonElement>) => {

		const is_up = e.currentTarget!.innerText.includes("上");
		this.setState(pre => {
			return {
				curPage: pre.curPage + (is_up ? -1 : 1),
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

				return <Infection infection={this.uniqueFile} formType={id} hospitalName="中医院" showPage={curPage} getMethods={this.getMethods} upOrgName={orgName} />
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
		const { formType, text , orgName ,eventId} = this.props;
		const is_first = curPage === totalPage;

		return (
			<div className="g-layout">

				<Notification ref={this.notificationRef}/>

				<div className="g-layout-head">
					<span ><b style={{ fontSize: 18 }}>{text}</b><span>&nbsp;&nbsp;第 {curPage + 1} 页</span>&nbsp;&nbsp;&nbsp;<span className="require">（非必填项）</span></span>
					<span className="m-optBtn">	
						{
							(curPage > 0 && curPage < totalPage) ? 
							(<Button handle={this.changePage}>
								上一页
							</Button>) : null 
						}
						<Button handle={this.changePage}>
							{is_first ? "上" : "下"}一页
						</Button>
					
						
						<Button handle={this.upReportHandle} field="1">
							<SvgIcon styleType="submit"/>
							{eventId ? "修改":"提交"}
						</Button>
						<Button handle={this.upReportHandle} field="2">
							<Icon styleType="fa-save"/>
							保存
						</Button>
					</span>
				</div>
				<div className="g-report" id="gReport">
					<div className="report-article">
						{this.getReport(formType,curPage,orgName)}	
					</div>
				</div>
			</div>
		)
	}
}


type containerProps = {



}

type containerState={
	data:any;
}

class Container extends React.PureComponent<RouteComponentProps<containerProps> & reduxState,containerState>{

	params: ReportSpace.params = {
		upOrgId: this.props.orgId,
		patientOrgId: this.props.orgId,
		bedNumber: "",
		patientName: "",
		sex: "1",
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
		udi: "",
		manufactureDate: "",
		effectiveDate: "",
		productCode: "",
		qxReasonDescribe:"",
		qxAnalyseReason: "4",
		hurtRank: "4",
		hurtPerform: "",
		kindEquipment:"",
		degreeRisk: "",
		pollutantSource: "",
		dadCategoryId:"",
		categoryId:"",
		job:"",
		cpOrgId:"",

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
		relateHandle:"",
		orgRank: "",//科室定级
		diseaseEffect:"",//对原患者疾病的影响
		analyseImpove: "",//分析与改进

		functionOrgRank: "",//职能科室定级
		property: "",//不良事件性质界定：风险注册、系统错误、个人错误
		propertyContent: "",//界定说明
		frequency: "",//不良事件频率界定
		frequencyContent: "",//界定说明
		allotStatus: "",//分配的状态

		badEventResult: "",//不良事件的结果
		berSignatory:"",//不良事件的结果签字人名字
		berDate: "",//不良事件的结果日期

		man: "",//人(主要原因分析)
		machine: "",//机(主要原因分析)
		object: "",//物(主要原因分析)
		law: "",//法(主要原因分析)
		ring: "",//环(主要原因分析
		deleteSaveCommit: "1",//删除或保存或提交
		formType: this.props.location.state.id,//表单类型 
		uniqueFile:"",

		admissionNumber: "",//住院号
		similarIncidentOne: "",//发生过类似的事件1
		similarIncidentTwo: "",//发生的类似事件2
		damageDegree: "",
	    modifyStatus :"",
	}

	state:containerState={
		data:null,
	}
	componentDidMount(){
		const {location:{state}}=this.props;
	
		if(state.eventId){
			Api.getAllEvent(state.eventId).then((res:AxiosInterfaceResponse)=>{

				
					if(res.code==200){
						for(const key in res.data){
							this.params[key as keyof ReportSpace.params] = res.data[key] || "";
						};
						this.setState({
							data:this.params
						})
					}

					
			})
		}else{

			this.setState({
				data:this.params
			})

		}
	}

	render(){

		const {data} = this.state;
		const {location:{state},orgName} = this.props;
		const {id,text} =  state ;
		let eventId = state.eventId || "";

		return (<>
					{data?<Report 
									formType={id}
									text={text}
									data={data}
									orgName={orgName}
									eventId={eventId}
								/>:null}
				</>)
	}






}


type reduxState = {
	orgName: string;
	orgId: string;
}


const mapStateToProps: MapStateToProps<reduxState, RouteComponentProps<containerProps>, appStore> = ({ app }) => {

	const index = app.get("roleIndex");

	return {
		orgName: app.get("orgName")[index],
		orgId: app.get("orgId")[index],
	}
}


export default connect(mapStateToProps)(Container);