import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import Calendar from "@js/common/calendar/index";
import HQHead from "../common/HeadBase";







type ReportHeadState={

}

class ReportHead extends React.PureComponent<ReportSpace.HeadHQ & ReportSpace.HeadWrapProp   , ReportHeadState> {

	state: ReportHeadState = {

	}
	render() {



		

		const {arrConfig:{ profession, happenScene, medicalTypeArr, orgArr,topClass, happenSceneSon},reportDateType,upOrgName,getMethods,changeHappenceSon,changeReportDayType,changeAnonymity,hospitalName,anonymity} = this.props;
	

		const inputChange = getMethods<"inputChange">("inputChange");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		const parmas = getMethods<"getParams">("getParams")();








		const { bedNumber, patientName, age, admissionTime, medicalRecordNumber,
			primaryDiagnosis, medicalType, rsaFall, rsaPressureSore, rsaCareAbility,
			rsaNonPlanned, rsaOther, currentPeople, cpProfession, cpTopClass, dProfession, discoverer, dTopClass,
			reporter, rProfession, rTopClass, dadIncidentSceneId, reporterNumber, incidentSceneId, happenTime, discoveryTime, reportTime, patientOrgId, similarIncidentOne, similarIncidentTwo,orgWorkYear,workYear
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
					<span>入院时间：</span>
					<Calendar width={100} clickBack={setCalendarObj} field="admissionTime" selTimeValArr={admissionTime} />
				</span>
			</div>
			<div className="item-tr">
				<span className="detail">
					<label >病历号/病案号：<input required type="text" name="medicalRecordNumber" defaultValue={medicalRecordNumber} onChange={inputChange} className={medicalRecordNumber ? "inp" :"inp no-fill"} style={{ width: "120px" }} /></label>
				</span>
				<span className="detail">
					<label >床号：<input  required type="text" defaultValue={bedNumber} name="bedNumber" className={bedNumber ? "inp" : "inp no-fill"} style={{ width: "80px" }} onChange={inputChange} /> </label>
				</span>
				<span className="detail">
					<span >患者所在科室：</span>
					<ComTreebox data={orgArr} textFiled="name" defaultSel={patientOrgId + ""} filed="patientOrgId" hasSlideIcon={false} width={130} pannelWidth={300} />
				</span>

				
			</div>
			<div className="item-tr">
				<span className="detail">
					<label >主要诊断：<input type="text" name="primaryDiagnosis" defaultValue={primaryDiagnosis} onChange={inputChange} required className={primaryDiagnosis ? "inp":"inp no-fill"} style={{ width: "450px" }} /></label>
				</span>
			</div>
			<div className="item-tr">

				<span className="detail">
					<span >就医类型：</span>
					<Combobox data={medicalTypeArr} defaultVal={medicalType} width={100} hasSlideIcon={false} field="medicalType" clickCallback={setComboboxObj} />
				</span>

				<span className="detail">
					<span >日期类型：</span>
					<span className="underline" style={{ width: "90px" }}>{reportDateType}</span>
				</span>	
				<span className="detail">
					<span >发生时间：</span><Calendar time={true} width={140} field="happenTime" selTimeValArr={happenTime} clickBack={changeReportDayType} />
				</span>
			</div>

			{hospitalName !== "中医院" ? (<div className="item-tr">

				<span className="detail">
					<span>相关风险评估：</span>
					<label >跌倒：<input type="text" required name="rsaFall" defaultValue={rsaFall} onChange={inputChange} className="inp" style={{ width: "30px" }} /></label>

				</span>
				<span className="detail">
					<label >压疮：<input type="text" name="rsaPressureSore" required defaultValue={rsaPressureSore} onChange={inputChange} className="inp" style={{ width: "30px" }} /></label>

				</span>
				<span className="detail">
					<label >自理能力：<input type="text" name="rsaCareAbility" required defaultValue={rsaCareAbility} onChange={inputChange} className="inp" style={{ width: "30px" }} /></label>
				</span>
				<span className="detail">
					<label >非计划性拔管：<input type="text" required name="rsaNonPlanned" defaultValue={rsaNonPlanned} onChange={inputChange} className="inp" style={{ width: "30px" }} /></label>

				</span>
				<span className="detail">
					<label >其他：<input type="text" name="rsaOther" required defaultValue={rsaOther} onChange={inputChange} className="inp" style={{ width: "175px" }} /></label>

				</span>
			</div>) : null}


			<div className="item-tr">
				<span className="detail">
					<label className="require" >当事人：<input type="text"  name="currentPeople" defaultValue={currentPeople} onChange={inputChange} placeholder="非必填" className="inp" style={{ width: "80px" }} /></label>
				</span>
				<span className="detail">
					<span >职称：</span>

					<Combobox data={profession} width={120} hasSlideIcon={false} defaultVal={cpProfession} clickCallback={setComboboxObj} field="cpProfession" />
				</span>
				<span className="detail">
					<span >层级：</span>
					<Combobox data={topClass} width={80} hasSlideIcon={false} defaultVal={cpTopClass} clickCallback={setComboboxObj} field="cpTopClass" />
				</span>
				<span className="detail">
					<label >工作年资：<input type="text" required defaultValue={workYear} name="workYear" className={workYear ? "inp":"inp no-fill"} style={{ width: 40 }} onChange={inputChange} />年</label>
				</span>
				<span className="detail">
					<label >该科室工作年资：<input type="text" required defaultValue={orgWorkYear} name="orgWorkYear" className={orgWorkYear?"inp":"inp no-fill"} style={{ width: 40 }} onChange={inputChange} />年</label>
				</span>
			</div>
			<div className="item-tr">
				<span className="detail">
					<label  className="require">发现人：<input type="text"  name="discoverer" onChange={inputChange} defaultValue={discoverer}  placeholder="非必填" className= "inp" style={{ width: "80px" }} /></label>
				</span>
				<span className="detail">
					<span >职称：</span>
					<Combobox data={profession} clickCallback={setComboboxObj} defaultVal={dProfession} field="dProfession" width={120} hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span  >层级：</span>
					<Combobox data={topClass} clickCallback={setComboboxObj} defaultVal={dTopClass} field="dTopClass" width={80} hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span >发现时间：</span><Calendar field="discoveryTime" clickBack={setCalendarObj} selTimeValArr={discoveryTime} time={true} width={200} />
				</span>

			</div>


			<div className="item-tr">
				<span className="detail">
					<label className="m-label m-lab-checkbox" style={{ display: "inline" }}><input type="checkbox" checked={anonymity} name="anonymity" style={{ verticalAlign: -2 }} onChange={changeAnonymity} /><span >匿名</span></label>

				</span>

				<span className="detail">
					<label >报告人：</label>
					{anonymity ? (<span className="underline" style={{ width: "80px" }}>匿名</span>) : <input type="text" name="reporter" placeholder="可匿名非必填" onChange={inputChange} defaultValue={reporter} className={"inp"} style={{ width: "90px" }} />}

				</span>
				<span className="detail">
					<span >职称：</span>
					<Combobox data={profession} width={120} clickCallback={setComboboxObj} defaultVal={rProfession} field="rProfession" hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span >层级：</span>
					<Combobox data={topClass} width={80} clickCallback={setComboboxObj} defaultVal={rTopClass} field="rTopClass" hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span >报告时间：</span><Calendar field="reportTime" clickBack={setCalendarObj} selTimeValArr={reportTime} time={true} width={150} />
				</span>

			</div>
			<div className="item-tr">
				{!anonymity ? (<span className="detail">
					<label >手机号：</label><input type="number" required  name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange}  className={reporterNumber ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>) : null}
				<span className="detail">
					<span >事发场所：</span>
					<Combobox data={happenScene} renderClick={true} width={140} hasSlideIcon={false} defaultVal={incidentSceneId} clickCallback={changeHappenceSon} field="incidentSceneId" />
					&nbsp;&nbsp;
					<Combobox data={happenSceneSon}  width={300} hasSlideIcon={false} defaultVal={dadIncidentSceneId} clickCallback={setComboboxObj} field="dadIncidentSceneId" />

				</span>
				<span className="detail">
					<label >上报科室：<span className="underline" style={{ width: "80px" }}>{upOrgName}</span></label>
				</span>
			</div>
			<div className="item-tr">
				<span className="detail">
					<span >科室发生过类似的事件：近2年共计&nbsp;&nbsp;<input type="text" name="similarIncidentOne" defaultValue={similarIncidentOne} onChange={inputChange} className={similarIncidentOne? "inp" : "inp no-fill"} style={{ width: 30 }} />次，本年度共计&nbsp;&nbsp;<input type="text" name="similarIncidentTwo" defaultValue={similarIncidentTwo} onChange={inputChange} className={similarIncidentTwo ? "inp" : "inp no-fill"} style={{ width: 30 }} />次。</span>
				</span>
			</div>


		</>)

	}
}


export default HQHead(ReportHead);