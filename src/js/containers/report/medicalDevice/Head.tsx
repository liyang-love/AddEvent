import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import Calendar from "@js/common/calendar/index";
import { Checkbox } from "@js/common/InputBtn";
import HeadHQ from "../common/HeadBase";
import { reasonArr, hurtLevArr } from "../config";




type ReportHeadState = {

}


class ReportHead extends React.PureComponent<ReportSpace.HeadHQ & ReportSpace.HeadWrapProp, ReportHeadState> {

	state: ReportHeadState = {

	}


	render() {



		const { arrConfig: { profession, happenScene, medicalTypeArr, topClass, orgArr, happenSceneSon }, reportDateType, upOrgName, getMethods, changeHappenceSon, changeReportDayType } = this.props;


		const inputChange = getMethods<"inputChange">("inputChange");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		const parmas = getMethods<"getParams">("getParams")();







		const { patientName, age, medicalRecordNumber,
			medicalType, reportTime, birthDate, anamnesis, productName, standard, registerNo, modelNumber,
			reporter, rProfession, dadIncidentSceneId, rTopClass, reporterNumber, incidentSceneId, happenTime, patientOrgId,
			udi, batchNumber, productCode, manufactureDate, effectiveDate, instrumentDate, qxReasonDescribe, hurtPerform,qxAnalyseReason,hurtRank
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
					<label >年龄：<input type="number" name="age" onChange={inputChange} required defaultValue={age} className={!!age ? "inp" : "inp no-fill"} style={{ width: "60px" }} /></label>
				</span>
				<div className="detail">
					<span>出生日期：</span><Calendar width={120} field="birthDate" selTimeValArr={birthDate} clickBack={setCalendarObj} />
				</div>
				<span className="detail">
					<label >病历号/病案号：<input required type="text" name="medicalRecordNumber" defaultValue={medicalRecordNumber} onChange={inputChange} className={medicalRecordNumber ? "inp" : "inp no-fill"} style={{ width: "120px" }} /></label>
				</span>
			</div>
			<div className="item-tr">


				<span className="detail">
					<span >患者所在科室：</span>
					<ComTreebox data={orgArr} textFiled="name" clickCallback={setComboboxObj} defaultSel={patientOrgId + ""} filed="patientOrgId" hasSlideIcon={false} width={120} pannelWidth={300} />
				</span>
				<span className="detail">
					<label >既往病史：<input required type="text" defaultValue={anamnesis} name="anamnesis" className={anamnesis ? "inp" : "inp no-fill"} style={{ width: 400 }} onChange={inputChange} /> </label>
				</span>

			</div>

			<div className="item-tr">

				<span className="detail">
					<span >就医类型：</span>
					<Combobox data={medicalTypeArr} defaultVal={medicalType} width={100} hasSlideIcon={false} field="medicalType" clickCallback={setComboboxObj} />
				</span>
				<span className="detail">
					<span >发生时间：</span><Calendar time={true} width={140} field="happenTime" selTimeValArr={happenTime} clickBack={changeReportDayType} />
				</span>
				<span className="detail">
					<span >日期类型：</span>
					<span className="underline" style={{ width: "90px" }}>{reportDateType}</span>
				</span>

				<span className="detail">
					<span >上报时间：</span><Calendar field="reportTime" clickBack={setCalendarObj} selTimeValArr={reportTime} time={true} width={150} />
				</span>
			</div>







			<div className="item-tr">


				<span className="detail">
					<label >报告人：</label>
					<input type="text" required name="reporter" onChange={inputChange} defaultValue={reporter} className={reporter ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<span >职称：</span>
					<Combobox data={profession} width={120} clickCallback={setComboboxObj} defaultVal={rProfession} field="rProfession" hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span >层级：</span>
					<Combobox data={topClass} require={false} placeholder="非必填" width={80} hasSlideIcon={false} defaultVal={rTopClass} clickCallback={setComboboxObj} field="rTopClass" />
				</span>
				<span className="detail">
					<label >手机号：</label><input type="number" required name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange} className={reporterNumber ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
			</div>
			<div className="item-tr">

				<span className="detail">
					<label >产品名称：</label>
					<input type="text" required name="productName" onChange={inputChange} defaultValue={productName} className={productName ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<label >注册证编号：</label><input type="text" required name="registerNo" defaultValue={registerNo} onChange={inputChange} className={registerNo ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
				<span className="detail">
					<label >型号：</label>
					<input type="text" required name="modelNumber" onChange={inputChange} defaultValue={modelNumber} className={modelNumber ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<label >规格：</label><input type="text" required name="standard" defaultValue={standard} onChange={inputChange} className={standard ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
			</div>
			<div className="item-tr">

				<span className="detail">
					<label >产品批号：</label>
					<input type="text" required name="batchNumber" onChange={inputChange} defaultValue={batchNumber} className={batchNumber ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<label >产品编码：</label><input type="text" required name="productCode" defaultValue={productCode} onChange={inputChange} className={productCode ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
				<span className="detail">
					<label className="require" >UDI：</label>
					<input type="text" placeholder="非必填" name="udi" onChange={inputChange} defaultValue={udi} className="inp" style={{ width: "90px" }} />

				</span>
			</div>
			<div className="item-tr">

				<span className="detail">
					<label >产品批号：</label>
					<input type="text" required name="manufactureDate" onChange={inputChange} defaultValue={manufactureDate} className={manufactureDate ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<label >有效日期：</label>
					<Calendar width={120} field="effectiveDate" selTimeValArr={effectiveDate} clickBack={setCalendarObj} />
				</span>
				<span className="detail">
					<label >器械使用日期：</label>
					<Calendar width={120} field="instrumentDate" selTimeValArr={instrumentDate} clickBack={setCalendarObj} />
				</span>
			</div>
			<div className="item-tr">

				<p>
					<big>备注:</big>(医疗设备引起的不良需要填写：产品名称、注册证编号、型号,医用耗材引起的不良事件以上信息都要填写)
				</p>
				<span className="detail">
					<span >事发场所：</span>
					<Combobox data={happenScene} renderClick={true} width={140} hasSlideIcon={false} defaultVal={incidentSceneId} clickCallback={changeHappenceSon} field="incidentSceneId" />
					&nbsp;&nbsp;
					<Combobox data={happenSceneSon} width={300} hasSlideIcon={false} defaultVal={dadIncidentSceneId} clickCallback={setComboboxObj} field="dadIncidentSceneId" />

				</span>
				<span className="detail">
					<label >上报科室：<span className="underline" style={{ width: "80px" }}>{upOrgName}</span></label>
				</span>
			</div>
			<div className="item-tr">

				<span className="detail">
					<label >事件原因分析：</label>
					<span className="m-radio">
						{
							reasonArr.map(({ tit, value }) => {
								const checked = value == qxAnalyseReason ;
								return <Checkbox tit={tit} isControl={false} type="radio" key={value} value={value} checked={checked} nameFiled="qxAnalyseReason" changeHandle={inputChange} />
							})
						}
					</span>


				</span>

				<span className="detail">
					<label >事件原因分析描述：</label>
					<input type="text" required name="qxReasonDescribe" onChange={inputChange} defaultValue={qxReasonDescribe} className={qxReasonDescribe ? "inp" : "inp no-fill"} style={{ width: 300 }} />

				</span>
			</div>
			<div className="item-tr">
				<span className="detail">
					<label >伤害等级：</label>
					<span className="m-checkbox">
						{
							hurtLevArr.map(({ tit, value  }) => {
								const checked = hurtRank  ==value;
								return <Checkbox key={value} tit={tit} type="radio" isControl={false}  value={value} checked={checked} nameFiled="hurtRank" changeHandle={inputChange} />
							})
						}
					</span>

				</span>


			</div>
			<div className="item-tr">
				<span className="detail">
					<label >伤害表现：</label>
					<input type="text" required name="hurtPerform" onChange={inputChange} defaultValue={hurtPerform} className={hurtPerform ? "inp" : "inp no-fill"} style={{ width: 300 }} />

				</span>
			</div>

		</>)

	}
}


export default HeadHQ(ReportHead) 