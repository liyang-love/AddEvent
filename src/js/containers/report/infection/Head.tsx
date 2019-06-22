import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import Calendar from "@js/common/calendar/index";
import { Checkbox } from "@js/common/InputBtn"
import HeadBase from "../common/HeadBase";



type ReportHeadState = {

}



const checkBoxGroup = [{ tit: "是", value: "1" }, { tit: "否", value: "0" }];


class ReportHead extends React.PureComponent<ReportSpace.HeadHQ & ReportSpace.HeadWrapProp, ReportHeadState> {


	state: ReportHeadState = {

	}

	getCheckBoxGroup({ data, theme, checkedVal, filed, handle, txt }: {
		theme: string;
		data: { tit: string; value: string; }[];
		checkedVal: string[];
		filed: string;
		txt: string[];
		handle: (e: React.ChangeEvent<HTMLInputElement>) => void;

	}) {

		

		return (<div className="item-tr article-item" style={{ lineHeight: "26px" }}>
			<p>{theme}</p>
			{
				txt.map((val, index) => {
					return (<div key={index}>
						<span className="checktit">{val}</span>
						{
							data.map(({ tit, value }) => {
								const checked = value == checkedVal[index];
								return <Checkbox tit={tit} isControl={false} type="radio" key={value} value={value} checked={checked} nameFiled={filed +"@" +index} changeHandle={handle} />

							})
						}
					</div>

					)
				})
			}




		</div>)
	}

	
	render() {


		const { skin, SharpWeapon, mucosal, flushingTime, flushingTimeTxt,
			HBV, fiveCase, HBV_DNA, HBV_RNA, treponema, hiVAntibody, otherIll
		} = this.props.uniqueFile!;

		const { arrConfig: { profession, happenScene, medicalTypeArr, orgArr, happenSceneSon }, reportDateType, upOrgName, getMethods, changeHappenceSon, changeReportDayType } = this.props;
		const inputChange = getMethods<"inputChange">("inputChange");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");
		const parmas = getMethods<"getParams">("getParams")();
		const checkBoxChange =getMethods<"checkboxGroupChange">("checkboxGroupChange"); 
		const inputChangeUniqueFile =getMethods<"inputChangeUniqueFile">("inputChangeUniqueFile"); 

		const { patientName, medicalRecordNumber, primaryDiagnosis,
			medicalType, pollutantSource, degreeRisk, kindEquipment,
			currentPeople, cpProfession,
			reporter, rProfession, dadIncidentSceneId, reporterNumber, incidentSceneId, happenTime, reportTime, patientOrgId,
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
					<label >病历号/病案号：<input required type="text" name="medicalRecordNumber" defaultValue={medicalRecordNumber} onChange={inputChange} className={medicalRecordNumber ? "inp" : "inp no-fill"} style={{ width: "120px" }} /></label>
				</span>


			</div>
			<div className="item-tr">
				<span className="detail">
					<label >主要诊断：<input type="text" name="primaryDiagnosis" defaultValue={primaryDiagnosis} onChange={inputChange} required className={primaryDiagnosis ? "inp" : "inp no-fill"} style={{ width: "450px" }} /></label>
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
					<label  >被暴露人：<input type="text" name="currentPeople" defaultValue={currentPeople} onChange={inputChange} className={currentPeople ? "inp" : "inp no-fill"} style={{ width: "80px" }} /></label>
				</span>
				<span className="detail">
					<span >职称：</span>

					<Combobox data={profession} width={120} hasSlideIcon={false} defaultVal={cpProfession} clickCallback={setComboboxObj} field="cpProfession" />
				</span>
				<span className="detail">
					<span >发生时间：</span><Calendar time={true} width={140} field="happenTime" selTimeValArr={happenTime} clickBack={changeReportDayType} />
				</span>

			</div>

			<div className="item-tr">


				<span className="detail">
					<label >报告人：
				<input type="text" required name="reporter"  onChange={inputChange} defaultValue={reporter} className={reporter ? "inp" : "inp no-fill"} style={{ width: "90px" }} /></label>

				</span>
				<span className="detail">
					<span >职称：</span>
					<Combobox data={profession} width={120} clickCallback={setComboboxObj} defaultVal={rProfession} field="rProfession" hasSlideIcon={false} />
				</span>

				<span className="detail">
					<span >报告时间：</span><Calendar field="reportTime" clickBack={setCalendarObj} selTimeValArr={reportTime} time={true} width={150} />
				</span>
				<span className="detail">
					<label >手机号：<input type="number" required name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange} className={reporterNumber ? "inp" : "inp no-fill"} style={{ width: "100px" }} /></label>
				</span>
			</div>
			<div className="item-tr">

				<span className="detail">
					<label >何种器械：<input type="text" required name="kindEquipment" defaultValue={kindEquipment} onChange={inputChange} className={kindEquipment ? "inp" : "inp no-fill"} style={{ width: "100px" }} /></label>
				</span>
				<span className="detail">
					<label >程度和危险度：<input type="text" required name="degreeRisk" defaultValue={degreeRisk} onChange={inputChange} className={degreeRisk ? "inp" : "inp no-fill"} style={{ width: "100px" }} /></label>
				</span>
				<span className="detail">
					<label >污染物来源：<input type="text" required name="pollutantSource" defaultValue={pollutantSource} onChange={inputChange} className={pollutantSource ? "inp" : "inp no-fill"} style={{ width: "100px" }} /></label>
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

				this.getCheckBoxGroup({ data: checkBoxGroup, theme: "皮肤暴露", txt: ["1、皂液清洗", "2、消毒剂擦拭接触部位消毒"], checkedVal: skin, filed: "skin", handle: checkBoxChange })
			}
			{

				this.getCheckBoxGroup({ data: checkBoxGroup, theme: "利器伤", checkedVal: SharpWeapon, txt: ["1、挤出损伤处血液", "2、流动水冲洗", "3、局部使用的消毒剂", "4、局部包扎"], filed: "SharpWeapon", handle: checkBoxChange })
			}
			{

				this.getCheckBoxGroup({ data: checkBoxGroup, theme: "黏膜暴露 ", checkedVal: mucosal, txt: ["1、生理盐水冲洗", "2、清水冲洗", "3、使用其他处理液"], filed: "mucosal", handle: checkBoxChange })
			}

			<div className="item-tr article-item">

				<div >
					<div className="detail" >
						<span >4、冲洗时间：</span><Calendar field="flushingTime" clickBack={setCalendarObj} selTimeValArr={flushingTime} width={100} />
					</div>
				</div>

				<div >
					<div className="detail" style={{ margin: "8px 0", alignItems: "self-start" }}>
						<span className="require">备注：</span>
						<textarea name="flushingTimeTxt" required defaultValue={flushingTimeTxt} onChange={inputChangeUniqueFile} className={ "txtInp" } placeholder="非必填" maxLength={200}></textarea>
					</div>
				</div>

			</div>
			<div className="item-tr article-item">
				<p >源患者检测结果</p>
				<div >
					
					<span className="detail">
						<label  >HBV：<input type="text" name="HBV" defaultValue={HBV} onChange={inputChangeUniqueFile} className={HBV ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
					</span>
				</div>
				<div >
					<span className="detail">
						<label  >乙肝五项情况：<input type="text" name="fiveCase" defaultValue={fiveCase} onChange={inputChangeUniqueFile} className={fiveCase ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
					</span>
				</div>

				<div >
					<span className="detail">
						<label  >HBV-DNA(copies/ml)：<input type="text" name="HBV_DNA" defaultValue={HBV_DNA} onChange={inputChangeUniqueFile} className={HBV_DNA ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
					</span>
				</div>

				<div >
					<span className="detail">
						<label  >HCV-RNA(copies/ml)：<input type="text" name="HBV_RNA" defaultValue={HBV_RNA} onChange={inputChangeUniqueFile} className={HBV_RNA ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
					</span>
				</div>



				<div >
					<span className="detail">
						<label  >梅毒螺旋体抗体：<input type="text" name="treponema" defaultValue={treponema} onChange={inputChangeUniqueFile} className={treponema ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
					</span>
				</div>
				<div >
					<span className="detail">
						<label  >HIV抗体 ：<input type="text" name="hiVAntibody" defaultValue={hiVAntibody} onChange={inputChangeUniqueFile} className={hiVAntibody ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
					</span>
				</div>
				<div >
					<span className="detail">
						<label  >其他传染病 ：<input type="text" name="otherIll" defaultValue={otherIll} onChange={inputChangeUniqueFile} className={otherIll ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
					</span>
				</div>


			</div>





		</>)

	}
}

const Head1 = HeadBase(ReportHead);


type ReportHead2Props = {
	uniqueFile: ReportSpace.infectionUniqueFile;
	getMethods: ReportSpace.ReportAPI["getMethods"];
}

class Head2 extends React.PureComponent<ReportHead2Props>{


	render() {

		const { getMethods,uniqueFile} = this.props;

		const { vaccine, vaccineReaction, vaccineTime, createAntibody, antibodyTiter, antibodyLastTime, training, trainingPlace, HBVTxt,
			fiveCase1, HBV_DNA1, HBV_RNA1, treponema1, hiVAntibody1, HCV
		} =uniqueFile!

		const inputChange = getMethods<"inputChangeUniqueFile">("inputChangeUniqueFile");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");


		return (
			<>

				<div className="item-tr article-item">
					<p >接触者免疫水平评估</p>
					<div >
						<span>疫苗：</span>
						<span className="checktit">是否接种过乙型肝炎疫苗</span>
						<Checkbox tit="是" isControl={false} type="radio" value="1" checked={vaccine == "1"} nameFiled="vaccine" changeHandle={inputChange} />

						<Checkbox tit="否" isControl={false} type="radio" value="0" checked={vaccine == "0"} nameFiled="vaccine" changeHandle={inputChange} />

					</div>
					<div >
						<span className="detail">
							<label  >接种疫苗后的反应：<input type="text" name="vaccineReaction" defaultValue={vaccineReaction} onChange={inputChange} className={vaccineReaction ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
						</span>
					</div>

					<div >
						<span className="detail">
							<span  >接种时间：</span>
							<Calendar field="vaccineTime" clickBack={setCalendarObj} selTimeValArr={vaccineTime} width={150} />
						</span>
					</div>
					<div >
						<span>抗体：</span>
						<span className="checktit">是否产生抗体</span>
						<Checkbox tit="是" isControl={false} type="radio" value="1" checked={createAntibody == "1"} nameFiled="createAntibody" changeHandle={inputChange} />

						<Checkbox tit="否" isControl={false} type="radio" value="0" checked={createAntibody == "0"} nameFiled="createAntibody" changeHandle={inputChange} />

					</div>
					<div >
						<span className="detail">
							<label  >抗体滴度(mIU/ml)：<input type="text" name="antibodyTiter" defaultValue={antibodyTiter} onChange={inputChange} className={antibodyTiter ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
						</span>
					</div>
					<div >
						<span className="detail">
							<span  >最后一次复查抗体时间：</span>
							<Calendar field="antibodyLastTime" clickBack={setCalendarObj} selTimeValArr={antibodyLastTime} width={150} />
						</span>
					</div>
					<div >
						<span>培训：</span>
						<span className="checktit">是否接受职业暴露培训</span>
						<Checkbox tit="是" isControl={false} type="radio" value="1" checked={training == "1"} nameFiled="training" changeHandle={inputChange} />

						<Checkbox tit="否" isControl={false} type="radio" value="0" checked={training == "0"} nameFiled="training" changeHandle={inputChange} />

					</div>

					<div >
						<span className="detail">
							<label  >培训地点 ：<input type="text" name="trainingPlace" defaultValue={trainingPlace} onChange={inputChange} className={trainingPlace ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
						</span>
					</div>
					<div >
						<div className="detail" style={{ margin: "8px 0", alignItems: "self-start" }}>
							<span >接触HBV后的预防措施：</span>
							<textarea name="HBVTxt" style={{width:540}} required defaultValue={HBVTxt} onChange={inputChange} className={HBVTxt ? "txtInp" :"txtInp no-fill"} placeholder="" maxLength={200}></textarea>
						</div>
					</div>
					<div >
						<span className="detail">
							<label  >乙肝五项情况：<input type="text" name="fiveCase1" defaultValue={fiveCase1} onChange={inputChange} className={fiveCase1 ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
						</span>
					</div>

					<div >
						<span className="detail">
							<label  >HBV-DNA(copies/ml)：<input type="text" name="HBV_DNA1" defaultValue={HBV_DNA1} onChange={inputChange} className={HBV_DNA1 ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
						</span>
					</div>

					<div >
						<span className="detail">
							<label  >HCV-RNA(copies/ml)：<input type="text" name="HBV_RNA1" defaultValue={HBV_RNA1} onChange={inputChange} className={HBV_RNA1 ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
						</span>
					</div>



					<div >
						<span className="detail">
							<label  >梅毒螺旋体抗体：<input type="text" name="treponema1" defaultValue={treponema1} onChange={inputChange} className={treponema1 ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
						</span>
					</div>
					<div >
						<span className="detail">
							<label  >HIV抗体 ：<input type="text" name="hiVAntibody1" defaultValue={hiVAntibody1} onChange={inputChange} className={hiVAntibody1 ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
						</span>
					</div>
					<div >
						<span className="detail">
							<label  >抗-HCV ：<input type="text" name="HCV" defaultValue={HCV} onChange={inputChange} className={HCV ? "inp" : "inp no-fill"} style={{ width: 500 }} /></label>
						</span>
					</div>
				</div>
			</>)


	}

}

export {
	Head1,
	Head2
};