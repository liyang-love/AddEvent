
import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import Calendar from "@js/common/calendar/index";
import HeadBase from "../common/HeadBase";




type ReportHeadState={

}

class ReportHead extends React.PureComponent<ReportSpace.HeadHQ & ReportSpace.HeadWrapProp   , ReportHeadState> {

	state: ReportHeadState = {

	}
	
	render() {



		const {arrConfig:{ profession, happenScene, medicalTypeArr, orgArr, happenSceneSon},reportDateType,upOrgName,getMethods,changeHappenceSon,changeReportDayType} = this.props;
	

		const inputChange = getMethods<"inputChange">("inputChange");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		const parmas = getMethods<"getParams">("getParams")();







		const { patientName,patientNumber,weight, age,
			 medicalType, liveDoorNumber,primaryDiagnosis,
			 currentPeople, cpProfession,  
			reporter, rProfession,  dadIncidentSceneId, reporterNumber, incidentSceneId, happenTime, reportTime, patientOrgId, 
		} = parmas;


		return (<>
			<div className="item-tr">
				<span className="detail">
					<label>患者姓名：<input type="text" required name="patientName" defaultValue={patientName} className={!!patientName ? "inp" : "inp no-fill"} style={{ width: "80px" }} onChange={inputChange} /></label>
				</span>
				<span className="detail">
					<span>性别：</span>
					<select className="select" defaultValue={"1"} name="sex" onChange={inputChange} >
						<option value="1" >男</option>
						<option value="2">女</option>
					</select>
				</span>
				<span className="detail">
					<label >年龄：<input type="text" name="age" onChange={inputChange} required defaultValue={age} className={!!age ? "inp" : "inp no-fill"} style={{ width: "60px" }} /></label>
				</span>
				<span className="detail">
					<label >体重：<input required type="text" name="weight" defaultValue={weight} onChange={inputChange} className={weight? "inp" :"inp no-fill"} style={{ width: "120px" }} /></label>
				</span>
                <span className="detail">
					<label className="require" >手机号：<input  type="number" placeholder="非必填" name="patientNumber" defaultValue={patientNumber} onChange={inputChange} className="inp" style={{ width: 120 }} /></label>
				</span>
			</div>
			<div className="item-tr">
				
				
				<span className="detail">
					<span >患者所在科室：</span>
					<ComTreebox data={orgArr} textFiled="name" defaultSel={patientOrgId + ""} filed="patientOrgId" hasSlideIcon={false} width={130} pannelWidth={300} />
				</span>
				<span className="detail">
					<label >住院号/门诊号：<input  required type="text" defaultValue={liveDoorNumber} name="liveDoorNumber" className={liveDoorNumber ? "inp" : "inp no-fill"} style={{ width: "80px" }} onChange={inputChange} /> </label>
				</span>
				
			</div>
			<div className="item-tr">
				<span className="detail">
					<label >主要诊断：<input type="text" name="primaryDiagnosis" defaultValue={primaryDiagnosis} onChange={inputChange} required className={primaryDiagnosis ? "inp":"inp no-fill"} style={{ width: "450px" }} /></label>
				</span>
			</div>

			<div className="item-tr">
				

				<span className="detail">
					<label >报告人：</label>
					 <input type="text" required name="reporter"  onChange={inputChange} defaultValue={reporter} className={reporter ? "inp" : "inp no-fill"} style={{ width: 90 }} />

				</span>
				<span className="detail">
					<span >职称：</span>
					<Combobox data={profession} width={120} clickCallback={setComboboxObj} defaultVal={rProfession} field="rProfession" hasSlideIcon={false} />
				</span>
				
				<span className="detail">
					<span >上报时间：</span><Calendar field="reportTime" clickBack={setCalendarObj} selTimeValArr={reportTime} time={true} width={150} />
				</span>
				 <span className="detail">
					<label >手机号：</label><input type="number" required  name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange}  className={reporterNumber ? "inp" : "inp no-fill"} style={{ width: 100 }} />
				</span>
			</div>
			

			<div className="item-tr">
				<span className="detail">
					<label  >当事人：<input type="text" required  name="currentPeople" defaultValue={currentPeople} onChange={inputChange}  className={currentPeople ? "inp" :"inp no-fill"} style={{ width: 80 }} /></label>
				</span>
				<span className="detail">
					<span >职称：</span>

					<Combobox data={profession} width={120} placeholder="非必填" hasSlideIcon={false} defaultVal={cpProfession} clickCallback={setComboboxObj} field="cpProfession" />
				</span>
				<span className="detail">
					<span >发生时间：</span><Calendar time={true} width={140} field="happenTime" selTimeValArr={happenTime} clickBack={changeReportDayType} />
				</span>
					<span className="detail">
					<span >就医类型：</span>
					<Combobox data={medicalTypeArr} defaultVal={medicalType} width={100} hasSlideIcon={false} field="medicalType" clickCallback={setComboboxObj} />
				</span>

				<span className="detail">
					<span >日期类型：</span>
					<span className="underline" style={{ width: "90px" }}>{reportDateType}</span>
				</span>	
			</div>
			


			
            <div className="item-tr">
				
				<span className="detail">
					<span >事发场所：</span>
					<Combobox data={happenScene} width={140} hasSlideIcon={false} defaultVal={incidentSceneId} clickCallback={changeHappenceSon} field="incidentSceneId" />
					&nbsp;&nbsp;
					<Combobox data={happenSceneSon} width={300} hasSlideIcon={false} defaultVal={dadIncidentSceneId} clickCallback={setComboboxObj} field="dadIncidentSceneId" />

				</span>
				<span className="detail">
					<label >上报科室：<span className="underline" style={{ width: "80px" }}>{upOrgName}</span></label>
				</span>
			</div>
			


		</>)

	}
}




export default HeadBase(ReportHead);
