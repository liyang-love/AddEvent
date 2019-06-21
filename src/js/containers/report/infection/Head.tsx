import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import Calendar from "@js/common/calendar/index";
import {Checkbox} from "@js/common/InputBtn"
import HeadBase from "../common/HeadBase";



type ReportHeadState = {

}



const checkBoxGroup = [{tit:"是",value:"1"},{tit:"否",value:"0"}];


class ReportHead extends React.PureComponent<ReportSpace.HeadHQ & ReportSpace.HeadWrapProp   , ReportHeadState> {
	state: ReportHeadState = {
     

	}

	getCheckBoxGroup({data,theme,checkedVal,filed,handle,txt}:{
		theme:string;
		data:{tit:string;value:string;}[];
		checkedVal:string;
		filed:string;
		txt:string[];
		handle:(e:React.ChangeEvent<HTMLInputElement>)=>void;
		
	}){


		return 	(<div className="item-tr" style={{lineHeight:"26px",margin:"4px"}}>
				<p style={{margin:"4px 0"}}>{theme}</p>	
				{
				txt.map(val => {
					return (<p>
						<span style={{width:260,display:"inline-block"}}>{val}</span>
						{
							data.map(({ tit, value }) => {
								const checked = value == checkedVal;
								return <Checkbox tit={tit} isControl={false} type="radio" key={value} value={value} checked={checked} nameFiled={filed} changeHandle={handle} />

							})
						}
						</p>

						)
					})
				}
			
				

				
			</div>)
	}

	checkBoxChange=(e:React.ChangeEvent<HTMLInputElement>)=>{



		console.log(e)
	}
	render() {



	const {arrConfig:{ profession, happenScene, medicalTypeArr, orgArr, happenSceneSon},reportDateType,upOrgName,getMethods,changeHappenceSon,changeReportDayType} = this.props;
	

		const inputChange = getMethods<"inputChange">("inputChange");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		const parmas = getMethods<"getParams">("getParams")();







		const { patientName, medicalRecordNumber,primaryDiagnosis,
			 medicalType, pollutantSource,degreeRisk,kindEquipment,
			 currentPeople, cpProfession, 
			reporter, rProfession,  dadIncidentSceneId, reporterNumber, incidentSceneId, happenTime, reportTime, patientOrgId, 
		} = parmas;






		return (<>
			<div className="item-tr">
				<span className="detail">
					<label>患者姓名：<input type="text" required name="patientName" defaultValue={patientName} className={!!patientName ? "inp" : "inp no-fill"} style={{ width: "80px" }} onChange={inputChange} /></label>
				</span>
                <span className="detail">
					<span >患者所在科室：</span>
					<ComTreebox data={orgArr} textFiled="name" defaultSel={patientOrgId + ""} filed="patientOrgId" hasSlideIcon={false} width={130} pannelWidth={300} />
				</span>	
                <span className="detail">
					<label >病历号/病案号：<input required type="text" name="medicalRecordNumber" defaultValue={medicalRecordNumber} onChange={inputChange} className={medicalRecordNumber ? "inp" :"inp no-fill"} style={{ width: "120px" }} /></label>
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
				
			</div>

			<div className="item-tr">
				<span className="detail">
					<label  >被暴露人：<input type="text"  name="currentPeople" defaultValue={currentPeople} onChange={inputChange}  className={currentPeople?"inp":"inp no-fill"} style={{ width: "80px" }} /></label>
				</span>
				<span className="detail">
					<span >职称：</span>

					<Combobox data={profession} width={120}  hasSlideIcon={false} defaultVal={cpProfession} clickCallback={setComboboxObj} field="cpProfession" />
				</span>
				<span className="detail">
					<span >发生时间：</span><Calendar time={true} width={140} field="happenTime" selTimeValArr={happenTime} clickBack={changeReportDayType} />
				</span>
				
			</div>
		
			<div className="item-tr">
				

				<span className="detail">
					<label >报告人：</label>
				<input type="text" required name="reporter" placeholder="可匿名非必填" onChange={inputChange} defaultValue={reporter} className={reporter ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<span >职称：</span>
					<Combobox data={profession} width={120} clickCallback={setComboboxObj} defaultVal={rProfession} field="rProfession" hasSlideIcon={false} />
				</span>
				
				<span className="detail">
					<span >报告时间：</span><Calendar field="reportTime" clickBack={setCalendarObj} selTimeValArr={reportTime} time={true} width={150} />
				</span>
				<span className="detail">
					<label >手机号：</label><input type="number" required  name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange}  className={reporterNumber ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
			</div>
            <div className="item-tr">
				
				<span className="detail">
					<label >何种器械：</label><input type="text" required  name="kindEquipment" defaultValue={kindEquipment} onChange={inputChange}  className={kindEquipment ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
                <span className="detail">
					<label >程度和危险度：</label><input type="text" required  name="degreeRisk" defaultValue={degreeRisk} onChange={inputChange}  className={degreeRisk ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
                <span className="detail">
					<label >污染物来源：</label><input type="text" required  name="pollutantSource" defaultValue={pollutantSource} onChange={inputChange}  className={pollutantSource ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
			</div>
			<div className="item-tr">
				
				<span className="detail">
					<span >事发场所：</span>
					<Combobox renderClick={true} data={happenScene} width={140} hasSlideIcon={false} defaultVal={incidentSceneId} clickCallback={changeHappenceSon} field="incidentSceneId" />
					&nbsp;&nbsp;
					<Combobox data={happenSceneSon} width={300} hasSlideIcon={false} defaultVal={dadIncidentSceneId} clickCallback={setComboboxObj} field="dadIncidentSceneId" />

				</span>
				<span className="detail">
					<label >上报科室：<span className="underline" style={{ width: "80px" }}>{upOrgName}</span></label>
				</span>
			</div>
			{

				this.getCheckBoxGroup({data:checkBoxGroup,theme:"皮肤暴露",txt:["1、皂液清洗","2、消毒剂擦拭接触部位消毒"],checkedVal:"0",filed:"",handle:this.checkBoxChange})
			}
			{

				this.getCheckBoxGroup({data:checkBoxGroup,theme:"利器伤",checkedVal:"0",txt:["1、挤出损伤处血液","2、流动水冲洗","3、局部使用的消毒剂","4、局部包扎"],filed:"",handle:this.checkBoxChange})
			}
			{

				this.getCheckBoxGroup({data:checkBoxGroup,theme:"黏膜暴露 ",checkedVal:"0",txt:["1、生理盐水冲洗","2、清水冲洗","3、使用其他处理液"],filed:"",handle:this.checkBoxChange})
			}

			<div className="item-tr">
				<span className="detail">
					<span >4、冲洗时间：</span><Calendar field="reportTime" clickBack={setCalendarObj} selTimeValArr={reportTime}  width={150} />
				</span>
				
			</div>



		</>)

	}
}


export default HeadBase(ReportHead);