import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import axios from "@js/common/AxiosInstance";
import Calendar from "@js/common/calendar/index";


type ReportHeadProp = {
  formType:string;// 上报事件的id
  getMethods:ReportSpace.ReportAPI["getMethods"];
	upOrgName:string;
	hospitalName:ReportSpace.hospitalName;

}



type ReportHeadState = {
			 profession:{//职称
					 id:string;
					 text:string;
				}[];
				happenScene:{//事发场所
					id:string;
					text:string;
					parId:string;
					children:ReportHeadState["happenScene"];
				}[];
				topClass:{ //层级
					 id:string;
					 text:string;
				}[];	
				medicalTypeArr:any[]; //医疗类型
				incidentTimeArr:any[];//事发时段
				dataTypeArr:any[];//日期类型
				anonymity:boolean;
				orgArr:{
					 id:string;
          	name:string;
				}[]
}


interface ReportImplement{

	getAllFormData:(formType:string)=>void; // 获取上报表单的数据;
	
}


class ReportHead extends React.PureComponent<ReportHeadProp,ReportHeadState> implements ReportImplement{

	state:ReportHeadState={
			profession:[],
			happenScene:[],
			topClass:[],	
			medicalTypeArr:[],
			incidentTimeArr:[],
			dataTypeArr:[],
			anonymity:false,
			orgArr:[],
	}

	

	getAllFormData(formType:string){

		//事发场景职称层级
		const getSceneCareerClass = axios({
				url:"/event/sceneCareerClass",
				params:{formType}
		});
		//日期类型事发时段医疗类别
		const getMedicalIncidentDate = axios({
			url:"/event/medicalIncidentDate",
		});		

		//科室
		const listOrgTree = axios({
			url:"/event/listOrgTree",
		});	

		Promise.all([getSceneCareerClass,getMedicalIncidentDate,listOrgTree]).then(arr=>{

				const {profession, happenScene, topClass} = arr[0].data;
				const [medicalTypeArr,incidentTime,dataType] = arr[1].data.data;
				const orgArr = arr[2].data.data;

				this.setState({
					profession,
					happenScene,
					topClass,
					medicalTypeArr:medicalTypeArr.children,
					incidentTimeArr:incidentTime.children,
					dataTypeArr:dataType.children,
					orgArr,
				});
		}).catch(error=>{
			console.log(error);
			alert("获取表单数据出错");
		});
	}

	componentDidMount(){

		const {formType} = this.props;
		this.getAllFormData(formType);

	}
	changeAnonymity=()=>{


		this.setState(pre=>({
			anonymity:!pre.anonymity
		}))
	}
	render(){

			const {profession,topClass,happenScene,dataTypeArr,incidentTimeArr,medicalTypeArr,anonymity,orgArr} = this.state;
			const {getMethods,upOrgName,hospitalName} = this.props;

			const inputChange = getMethods<"inputChange">("inputChange");
			const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
			const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");


			const {bedNumber,patientName,age,admissionTime,medicalRecordNumber,
							primaryDiagnosis,medicalType,incidentTime ,rsaFall ,rsaPressureSore ,rsaCareAbility,
							rsaNonPlanned,rsaOther,currentPeople ,cpProfession ,cpTopClass,dProfession,discoverer,dTopClass,
							reporter,rProfession,rTopClass,dadIncidentSceneId,reporterNumber,incidentSceneId,happenTime,discoveryTime,reportTime,patientOrgId
						} = getMethods<"getParams">("getParams")();
				patientOrgId		
			return (<>
								<div className="item-tr">
								
									<span className="detail">
										 <span >科室：</span>
										
										 	<ComTreebox data={orgArr} textFiled="name" filed="patientOrgId" hasSlideIcon={false}  width={100} pannelWidth={300} />
										 	
									</span>
									<span className="detail">
										 <label >床号：<input type="text" defaultValue={bedNumber} name="bedNumber" className="inp" style={{width:"80px"}} onChange={inputChange} /> </label>
									</span>
									<span className="detail">
										 <label >姓名：<input type="text" name="patientName" defaultValue={patientName} className="inp" style={{width:"60px"}} /></label>
									</span>
			
									<span className="detail">
										 	<span>性别：</span>
											<select className="select" defaultValue={"1"}>
												<option value="1" >男</option>
												<option value="2">女</option>
											</select>
									</span>
										<span className="detail">
											 <label >年龄：<input type="text" name="age" defaultValue={age} className="inp" style={{width:"40px"}} /></label>
									</span>
									<span className="detail">
										<span>入院时间：</span>
										<Calendar  width={120}  clickBack={setCalendarObj} field="admissionTime" selTimeValArr={admissionTime} />
									</span>
							</div>	
							<div className="item-tr">
								<span className="detail">
										 <label >病历号：<input type="text" name="medicalRecordNumber" defaultValue={medicalRecordNumber} onChange={inputChange} className="inp" style={{width:"150px"}} /></label>
								</span>
								<span className="detail">
										 <label >主要诊断：<input type="text" name="primaryDiagnosis" defaultValue={primaryDiagnosis} onChange={inputChange} className="inp" style={{width:"450px"}}/></label>
								</span>
							</div>
							<div className="item-tr">
								<span className="detail">
										 <label >上报科室：<span className="underline" style={{width: "80px"}}>{upOrgName}</span></label>
								</span>
								<span className="detail">
										  <span>医疗类型：</span>
										 	<Combobox data={medicalTypeArr} defaultVal={medicalType} width={120} hasSlideIcon={false} field="medicalType"  clickCallback={setComboboxObj} />
								</span>
								<span className="detail">
										 <span>事发时段：</span>
										 	<Combobox data={incidentTimeArr} defaultVal={incidentTime} width={120} hasSlideIcon={false} field="incidentTime"  clickCallback={setComboboxObj} />
								</span>
								 <span className="detail">
									 		<span >日期类型：</span>
								 			<span className="underline" style={{width: "90px"}}>{dataTypeArr[0] && dataTypeArr[0].text || ""}</span>
									 </span>
							</div>

							{hospitalName !== "中医院" ?(<div className="item-tr">
															
																<span className="detail">
																		<span>相关风险评估：</span>
																		 <label >跌倒：<input type="text" name="rsaFall" defaultValue={rsaFall} onChange={inputChange} className="inp"  style={{width:"30px"}} /></label>
																		
																</span>
																<span className="detail">
																	<label >压疮：<input type="text" name="rsaPressureSore" defaultValue={rsaPressureSore} onChange={inputChange} className="inp"  style={{width:"30px"}} /></label>
																
																</span>
																<span className="detail">
																	<label >自理能力：<input type="text" name="rsaCareAbility" defaultValue={rsaCareAbility} onChange={inputChange} className="inp"  style={{width:"30px"}} /></label>
																</span>
																<span className="detail">
																		<label >非计划性拔管：<input type="text" name="rsaNonPlanned" defaultValue={rsaNonPlanned} onChange={inputChange} className="inp"  style={{width:"30px"}} /></label>
																		
																</span>
																<span className="detail">
																		 <label >其他：<input type="text"  name="rsaOther" defaultValue={rsaOther} onChange={inputChange} className="inp" style={{width:"175px"}} /></label>
							
																</span>
														</div>) : null	}


							<div className="item-tr">
									 <span className="detail">
									 		<label >当事人：<input type="text" name="currentPeople" defaultValue={currentPeople} onChange={inputChange}  className="inp"  style={{width:"80px"}} /></label>
									 </span>
									 <span className="detail">
									 		<span>职称：</span>
								 			<Combobox data={profession} width={120} hasSlideIcon={false} defaultVal={cpProfession} clickCallback={setComboboxObj} field="cpProfession" />
									 </span>
									 <span className="detail">
									 		<span>层级：</span>
									 		<Combobox data={topClass} width={80} hasSlideIcon={false} defaultVal={cpTopClass} clickCallback={setComboboxObj} field="cpTopClass" />
									 </span>
									 <span className="detail">
									 		<span>发生时间：</span><Calendar time={true} width={200} field="HappenTime" selTimeValArr={happenTime}  clickBack={setCalendarObj}/>
									 </span>
							</div>
							<div className="item-tr">
										<span className="detail">
									 		<label >发现人：<input type="text" name="discoverer" onChange={inputChange} defaultValue={discoverer} className="inp" style={{width:"80px"}}  /></label>
									 </span>
									 <span className="detail">
									 	<span>职称：</span>
								 			<Combobox data={profession} clickCallback={setComboboxObj} defaultVal={dProfession} field="dProfession" width={120} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>层级：</span>
									 		<Combobox data={topClass}  clickCallback={setComboboxObj} defaultVal={dTopClass} field="dTopClass" width={80} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>发现时间：</span><Calendar field="dDiscoveryTime" clickBack={setCalendarObj}  selTimeValArr={discoveryTime} time={true} width={200} />
									 </span>
			
							</div>

							
							<div className="item-tr">
										<span className="detail">
									 		<label >报告人：</label><input type="text" name="reporter" onChange={inputChange} defaultValue={reporter} className="inp" style={{width:"80px"}}/>
									 </span>
									 <span className="detail">
									 	<span>职称：</span>
								 			<Combobox data={profession} width={120} clickCallback={setComboboxObj} defaultVal={rProfession} field="rProfession" hasSlideIcon={false} />
									 </span>
									 <span className="detail">
									 		<span>层级：</span>
									 		<Combobox data={topClass} width={80} clickCallback={setComboboxObj} defaultVal={rTopClass} field="rTopClass" hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>报告时间：</span><Calendar field="ReportTime" clickBack={setCalendarObj} selTimeValArr={reportTime} time={true} width={200} />
									 </span>
									 
							</div>
							<div className="item-tr">
									 <span className="detail">
									 		<span >事发场所：</span>
								 			<Combobox data={happenScene} width={140} hasSlideIcon={false} defaultVal={incidentSceneId} clickCallback={setComboboxObj} field="incidentSceneId"/>
									 		&nbsp;&nbsp;<input type="text" name="dadIncidentSceneId" defaultValue={dadIncidentSceneId} onChange={inputChange} className="inp" style={{width:"300px"}} placeholder="例如：内五病区501病房阳台"/>
									 </span>	
									 <span className="detail">
								 			<label className="m-label m-lab-checkbox" style={{display:"inline"}}><input type="checkbox" checked={anonymity} name="anonymity" style={{verticalAlign:-2}} onChange={this.changeAnonymity} /><span >匿名</span></label>
								 		
								 	 </span>
									{!anonymity ? ( <span className="detail">
																											 		<label >手机号：</label><input type="text" name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange} className="inp" style={{width:"100px"}}/>
																											 </span>) :null }
							</div>

							</>)

	}
}


export default ReportHead ;