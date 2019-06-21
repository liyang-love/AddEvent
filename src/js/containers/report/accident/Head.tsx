import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import Calendar from "@js/common/calendar/index";
import HeadBase from "../common/HeadBase";
import {patientBeforeStatus,jobArr} from "../config";


type ReportHeadState={

}

class ReportHead extends React.PureComponent<ReportSpace.HeadHQ & ReportSpace.HeadWrapProp   , ReportHeadState> {

	state: ReportHeadState = {

	}
	
	render() {



		const {arrConfig:{ profession, happenScene, medicalTypeArr, orgArr, happenSceneSon},reportDateType,upOrgName,getMethods,changeHappenceSon,changeReportDayType,anonymity,changeAnonymity} = this.props;
	

		const inputChange = getMethods<"inputChange">("inputChange");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		const parmas = getMethods<"getParams">("getParams")();




		const { patientName, age, medicalRecordNumber,
			 medicalType, beforeAccident,
			 currentPeople, cpProfession,  job, discoverer, cpOrgId,
			reporter, rProfession,  dadIncidentSceneId, reporterNumber, incidentSceneId, happenTime, discoveryTime, reportTime, patientOrgId, 
		} = parmas;






		return (<>
			<div className="item-tr">
				<span className="detail">
					<label>受害人姓名：<input type="text" required name="patientName" defaultValue={patientName} className={!!patientName ? "inp" : "inp no-fill"} style={{ width: "80px" }} onChange={inputChange} /></label>
				</span>
				<span className="detail">
					<span>性别：</span>
					<select className="select" defaultValue={"1"} name="sex" onChange={inputChange} >
						<option value="1" >男</option>
						<option value="2">女</option>
					</select>
				</span>
				<span className="detail">
					<label >年龄：<input type="number" name="age" onChange={inputChange} required defaultValue={age} className={!!age ? "inp" : "inp no-fill"} style={{ width: "60px" }} /></label>
				</span>
				<span className="detail">
					<label className="require">病历号/病案号：<input required type="text" name="medicalRecordNumber" defaultValue={medicalRecordNumber} placeholder="非必填" onChange={inputChange} className={medicalRecordNumber ? "inp" :"inp no-fill"} style={{ width: 120 }} /></label>
				</span>
				
			</div>
			<div className="item-tr">

				<span className="detail">
					<span >所在科室：</span>
					<ComTreebox data={orgArr} textFiled="name" clickCallback={setComboboxObj} defaultSel={patientOrgId + ""} filed="patientOrgId" hasSlideIcon={false} width={130} pannelWidth={300} />
				</span>
				<span className="detail">
					<span >事发前病人状态：</span>
					<Combobox data={patientBeforeStatus} defaultVal={beforeAccident} width={170} hasSlideIcon={false} field="beforeAccident" clickCallback={setComboboxObj} />
				</span>
				<span className="detail">
					<span >就医类型：</span>
					<Combobox data={medicalTypeArr} defaultVal={medicalType} width={100} hasSlideIcon={false} field="medicalType" clickCallback={setComboboxObj} />
				</span>
				<span className="detail">
					<span >事发场所：</span>
					<Combobox data={happenScene} renderClick={true} width={140} hasSlideIcon={false} defaultVal={incidentSceneId} clickCallback={changeHappenceSon} field="incidentSceneId" />
					&nbsp;&nbsp;
					<Combobox data={happenSceneSon} width={300} hasSlideIcon={false} defaultVal={dadIncidentSceneId} clickCallback={setComboboxObj} field="dadIncidentSceneId" />

				</span>
			</div>
			
			<div className="item-tr">

				<span className="detail">
					<span >发生时间：</span><Calendar time={true} width={140} field="happenTime" selTimeValArr={happenTime} clickBack={changeReportDayType} />
				</span>

				<span className="detail">
					<span >日期类型：</span>
					<span className="underline" style={{ width: "90px" }}>{reportDateType}</span>
				</span>	
				
			</div>

			

			
			<div className="item-tr">
				<span className="detail">
					<label  className="require">发现人：<input type="text"  name="discoverer" onChange={inputChange} defaultValue={discoverer}  placeholder="非必填" className= "inp" style={{ width: "80px" }} /></label>
				</span>
				
				
				<span className="detail">
					<span >发现时间：</span><Calendar field="discoveryTime" clickBack={setCalendarObj} selTimeValArr={discoveryTime} time={true} width={200} />
				</span>

			</div>

			<div className="item-tr">
				<span className="detail">
					<label className="require" >涉事人：<input type="text"  name="currentPeople" defaultValue={currentPeople} onChange={inputChange} placeholder="非必填" className="inp" style={{ width: "80px" }} /></label>
				</span>
				<span className="detail">
					<span >职称：</span>

					<Combobox data={profession} width={120}  hasSlideIcon={false} defaultVal={cpProfession} clickCallback={setComboboxObj} field="cpProfession" />
				</span>
                <span className="detail">
					<span >职务：</span>
					<Combobox data={jobArr} width={120}  hasSlideIcon={false} defaultVal={job} clickCallback={setComboboxObj} field="job" />
				</span>
				 <span className="detail">
					<span >所在科室：</span>
					<ComTreebox data={orgArr} textFiled="name" clickCallback={setComboboxObj} defaultSel={ cpOrgId+ ""} filed="cpOrgId" hasSlideIcon={false} width={130} pannelWidth={300} />
				</span>
			</div>

			<div className="item-tr">
				<span className="detail">
					<label className="m-label m-lab-checkbox" style={{ display: "inline" }}><input type="checkbox" checked={anonymity} name="anonymity" style={{ verticalAlign: -2 }} onChange={changeAnonymity} /><span >匿名</span></label>

				</span>

				<span className="detail">
					<label >上报人：</label>
					{anonymity ? (<span className="underline" style={{ width: "80px" }}>匿名</span>) : <input type="text" required name="reporter" placeholder="可匿名非必填" onChange={inputChange} defaultValue={reporter} className={reporter ? "inp" : "inp no-fill"} style={{ width: "90px" }} />}

				</span>
				<span className="detail">
					<span >职称：</span>
					<Combobox data={profession} width={120} clickCallback={setComboboxObj} defaultVal={rProfession} field="rProfession" hasSlideIcon={false} />
				</span>
				
				<span className="detail">
					<span >上报时间：</span><Calendar field="reportTime" clickBack={setCalendarObj} selTimeValArr={reportTime} time={true} width={150} />
				</span>
				{!anonymity ? (<span className="detail">
					<label >手机号：</label><input type="number" required  name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange}  className={reporterNumber ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>) : null}
				<span className="detail">
					<label >上报科室：<span className="underline" style={{ width: "80px" }}>{upOrgName}</span></label>
				</span>
			</div>
			
			


		</>)

	}
}


export default HeadBase(ReportHead);