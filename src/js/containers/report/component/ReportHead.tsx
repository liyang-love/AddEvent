import * as React from "react";
import Combobox from "@js/common/Combobox";
import axios from "@js/common/AxiosInstance";
import Calendar from "@js/common/calendar/index";


type ReportHeadProp = {
  formType:string;// 上报事件的id
  getMethods:ReportSpace.getMethods;
	upOrgName:string;

}

type ReportHeadState = {
			profession:{
					 id:string;
					 text:string;
				}[];
				happenScene:{
					id:string;
					text:string;
					parId:string;
					children:ReportHeadState["happenScene"];
				}[];
				topClass:{
					 id:string;
					 text:string;
				}[];	
				
}


interface ReportImplement{

	getAllFormData:(formType:string)=>void; // 获取上报表单的数据;
	
}


class ReportHead extends React.PureComponent<ReportHeadProp,ReportHeadState> implements ReportImplement{

	state:ReportHeadState={
			profession:[],
			happenScene:[],
			topClass:[],	
	}

	

	getAllFormData(formType:string){
		
		//事发场景职称层级
		axios({
				url:"/event/sceneCareerClass",
				params:{formType}
		}).then(res=>{
				
				const levAndEventArr = res.data;												
				const {profession, happenScene, topClass} = levAndEventArr;
				this.setState({
					profession,
					happenScene,
					topClass,
				})


				
		}).catch(error=>{
			console.log(error);
			alert("获取表单数据出错");
		})

	}

	componentDidMount(){

		const {formType} = this.props;
		this.getAllFormData(formType);

	}
	render(){

			const {profession,topClass,happenScene} = this.state;
			const {getMethods,upOrgName} = this.props;

			const inputChange = getMethods("inputChange");
			const setCalendarObj = getMethods("setCalendarObj");
			const setComboboxObj = getMethods("setComboboxObj");


			return (<>
								<div className="item-tr">
								
									<span className="detail">
										 <label >科室：<span className="underline" style={{width: "80px"}}>腔镜科</span></label>
									</span>
									<span className="detail">
										 <label >床号：<input type="text" name="bedNumber" className="inp" style={{width:"80px"}} onChange={inputChange} /> </label>
									</span>
									<span className="detail">
										 <label >姓名：<input type="text" name="patientName"  className="inp" style={{width:"60px"}} /></label>
									</span>
			
									<span className="detail">
										 	<span>性别：</span>
											<select className="select" defaultValue={"1"}>
												<option value="1" >男</option>
												<option value="2">女</option>
											</select>
									</span>
										<span className="detail">
											 <label >年龄：<input type="text" name="age" className="inp" style={{width:"40px"}} /></label>
									</span>
									<span className="detail">
										<span>入院时间：</span>
										<Calendar  width={140}  clickBack={setCalendarObj} field="admissionTime" />
									</span>
							</div>	
							<div className="item-tr">
								<span className="detail">
										 <label >病历号：<input type="text" name="medicalRecordNumber" onChange={inputChange} className="inp" style={{width:"150px"}} /></label>
								</span>
								<span className="detail">
										 <label >主要诊断：<input type="text" name="primaryDiagnosis" onChange={inputChange} className="inp" style={{width:"450px"}}/></label>
								</span>
							</div>
							<div className="item-tr">
								<span className="detail">
										 <label >上报科室：<span className="underline" style={{width: "80px"}}>{upOrgName}</span></label>
								</span>
								<span className="detail">
										  <span>医疗类型：</span>
										 	<Combobox data={profession} width={120} hasSlideIcon={false} field="medicalType"  clickCallback={setComboboxObj} />
								</span>
								<span className="detail">
										 <span>事发时段：</span>
										 	<Combobox data={profession} width={120} hasSlideIcon={false} field="incidentTime"  clickCallback={setComboboxObj} />
								</span>
								 <span className="detail">
									 		<span >日期类型：</span>
								 			<span className="underline" style={{width: "90px"}}>工作日</span>
									 </span>
							</div>
							<div className="item-tr">
								
									<span className="detail">
											<span>相关风险评估：</span>
											 <label >跌倒：<input type="text" name="rsaFall" onChange={inputChange} className="inp" value="无" style={{width:"30px"}} /></label>
											
									</span>
									<span className="detail">
										<label >压疮：<input type="text" name="rsaPressureSore" onChange={inputChange} className="inp" value="无" style={{width:"30px"}} /></label>
									
									</span>
									<span className="detail">
										<label >自理能力：<input type="text" name="rsaCareAbility" onChange={inputChange} className="inp" value="无" style={{width:"30px"}} /></label>
									</span>
									<span className="detail">
											<label >非计划性拔管：<input type="text" name="rsaNonPlanned" onChange={inputChange} className="inp" value="无" style={{width:"30px"}} /></label>
											
									</span>
									<span className="detail">
											 <label >其他：<input type="text"  name="rsaOther" onChange={inputChange} className="inp" style={{width:"175px"}} /></label>

									</span>
							</div>	
							<div className="item-tr">
									 <span className="detail">
									 		<label >当事人：<input type="text" name="currentPeople" onChange={inputChange}  className="inp"  style={{width:"80px"}} /></label>
									 </span>
									 <span className="detail">
									 		<span>职称：</span>
								 			<Combobox data={profession} width={120} hasSlideIcon={false} clickCallback={setComboboxObj} field="cpProfession" />
									 </span>
									 <span className="detail">
									 		<span>层级：</span>
									 		<Combobox data={topClass} width={80} hasSlideIcon={false} clickCallback={setComboboxObj} field="cpTopClass" />
									 </span>
									 <span className="detail">
									 		<span>发生时间：</span><Calendar time={true} width={200} field="HappenTime" clickBack={setCalendarObj}/>
									 </span>
							</div>
							<div className="item-tr">
										<span className="detail">
									 		<label >发现人：<input type="text" name="discoverer" onChange={inputChange} className="inp" style={{width:"80px"}}  /></label>
									 </span>
									 <span className="detail">
									 	<span>职称：</span>
								 			<Combobox data={profession} clickCallback={setComboboxObj} field="dProfession" width={120} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>层级：</span>
									 		<Combobox data={topClass}  clickCallback={setComboboxObj} field="dTopClass" width={80} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>发现时间：</span><Calendar field="dDiscoveryTime" clickBack={setCalendarObj} time={true} width={200} />
									 </span>
			
							</div>

							
							<div className="item-tr">
										<span className="detail">
									 		<label >报告人：</label><input type="text" name="reporter" onChange={inputChange}  className="inp" style={{width:"80px"}}/>
									 </span>
									 <span className="detail">
									 	<span>职称：</span>
								 			<Combobox data={profession} width={120} clickCallback={setComboboxObj} field="rProfession" hasSlideIcon={false} />
									 </span>
									 <span className="detail">
									 		<span>层级：</span>
									 		<Combobox data={topClass} width={80} clickCallback={setComboboxObj} field="rTopClass" hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>报告时间：</span><Calendar field="ReportTime" clickBack={setCalendarObj} time={true} width={200} />
									 </span>
									 
							</div>
							<div className="item-tr">
									 <span className="detail">
									 		<span >事发场所：</span>
								 			<Combobox data={happenScene} width={140} hasSlideIcon={false} clickCallback={setComboboxObj} field="incidentSceneId"/>
									 		&nbsp;&nbsp;<input type="text" name="dadIncidentSceneId" onChange={inputChange} className="inp" style={{width:"300px"}} placeholder="例如：内五病区501病房阳台"/>
									 </span>	
									
									 <span className="detail">
									 		<label >手机号：</label><input type="text" name="reporterNumber" onChange={inputChange} className="inp" style={{width:"100px"}}/>
									 </span>
							</div>

							</>)

	}
}


export default ReportHead ;