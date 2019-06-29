import * as React from "react";
 



 class  Modal extends React.PureComponent<ReportSpace.HeadHQText>{


    static FileItemCom:React.SFC<{tit:string;width:number;val:string;}> = ({tit,width,val})=>{


        return (<span className="detail">
					<span>{tit}：</span><span className="underline" style={{width }} >${val}</span>
				</span>) 
    }


    render(){

        const {parmas,hospitalName,upOrgName,getDateType} = this.props;

		const { bedNumber, patientName, age, admissionTime, medicalRecordNumber,
			primaryDiagnosis, medicalType, rsaFall, rsaPressureSore, rsaCareAbility,
			rsaNonPlanned, rsaOther, currentPeople, cpProfession, cpTopClass, dProfession, discoverer, dTopClass,
			reporter, rProfession, rTopClass, dadIncidentSceneId, reporterNumber, incidentSceneId, happenTime, discoveryTime, reportTime, patientOrgId, similarIncidentOne, similarIncidentTwo,orgWorkYear,workYear,sex
		} = parmas;


		return (<>
			<p className="item-tr">
				<Modal.FileItemCom tit="患者姓名："  val={patientName} width={80}/>
				<Modal.FileItemCom tit="性别："  val={sex} width={40}/>
				<Modal.FileItemCom tit="年龄："  val={age} width={60}/>
				<Modal.FileItemCom tit="入院时间："  val={admissionTime} width={100}/>
			</p>
			<p className="item-tr">
				<Modal.FileItemCom tit="病历号/病案号："  val={medicalRecordNumber} width={120}/>
				<Modal.FileItemCom tit="床号："  val={bedNumber} width={80}/>
				<Modal.FileItemCom tit="患者所在科室："  val={patientOrgId} width={300}/>
			</p>
			<p className="item-tr">
				<Modal.FileItemCom tit="主要诊断："  val={primaryDiagnosis} width={450}/>
			</p>
			<p className="item-tr">

				<Modal.FileItemCom tit="就医类型："  val={medicalType} width={100}/>
				<Modal.FileItemCom tit="日期类型："  val={getDateType(happenTime)} width={90}/>
				<Modal.FileItemCom tit="发生时间："  val={happenTime} width={140}/>
			</p>

			{hospitalName !== "中医院" ? (<p className="item-tr">
                <span>相关风险评估：</span>
				<Modal.FileItemCom tit="跌倒："  val={rsaFall} width={30}/>
				<Modal.FileItemCom tit="压疮："  val={rsaPressureSore} width={30}/>
				<Modal.FileItemCom tit="自理能力："  val={rsaCareAbility} width={30}/>
				<Modal.FileItemCom tit="非计划性拔管："  val={rsaNonPlanned} width={30}/>
				<Modal.FileItemCom tit="其他："  val={rsaOther} width={30}/>
			</p>) : null}


			<p className="item-tr">

				<Modal.FileItemCom tit="当事人："  val={currentPeople} width={80}/>
				<Modal.FileItemCom tit="职称："  val={cpProfession} width={120}/>
				<Modal.FileItemCom tit="层级："  val={cpTopClass} width={80}/>
				<Modal.FileItemCom tit="工作年资："  val={workYear} width={40}/>
				<Modal.FileItemCom tit="该科室工作年资："  val={orgWorkYear} width={40}/>
			</p>
			<p className="item-tr">
				<Modal.FileItemCom tit="发现人："  val={discoverer} width={80}/>
				<Modal.FileItemCom tit="职称："  val={dProfession} width={120}/>
				<Modal.FileItemCom tit="层级："  val={dTopClass} width={80}/>
				<Modal.FileItemCom tit="发现时间："  val={discoveryTime} width={200}/>
			</p>
			<p className="item-tr">
				<Modal.FileItemCom tit="报告人："  val={reporter} width={90}/>
				<Modal.FileItemCom tit="职称："  val={rProfession} width={120}/>
				<Modal.FileItemCom tit="层级："  val={rTopClass} width={80}/>
				<Modal.FileItemCom tit="报告时间："  val={reportTime} width={150}/>
			</p>
			<p className="item-tr">
				<Modal.FileItemCom tit="手机号："  val={reporterNumber} width={100}/>
				<Modal.FileItemCom tit="事发场所："  val={incidentSceneId} width={140}/>
				<Modal.FileItemCom tit=""  val={dadIncidentSceneId} width={300}/>
				<Modal.FileItemCom tit="上报科室："  val={upOrgName} width={80}/>
			</p>
			<p className="item-tr">
				<Modal.FileItemCom tit="科室发生过类似的事件：近2年共计"  val={similarIncidentOne} width={30}/>
				<Modal.FileItemCom tit="次，本年度共计"  val={similarIncidentTwo} width={30}/>次。
			</p>


		</>)
    }



} 


export default Modal ; 