import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import Api from "@api/report";
import Calendar from "@js/common/calendar/index";


type ReportHeadProp = {
	formType: string;// 上报事件的id
	getMethods: ReportSpace.ReportAPI["getMethods"];
	upOrgName: string;
	hospitalName: ReportSpace.hospitalName;

}

type ReportHeadState = {
	profession: {//职称
		id: string;
		text: string;
    }[];
	happenScene: {//事发场所
		id: string;
		text: string;
		parId: string;
		children: ReportHeadState["happenScene"];
	}[];
	medicalTypeArr: any[]; //医疗类型
	dataTypeArr: any[];//日期类型
	anonymity: boolean;
	orgArr: {
		id: string;
		name: string;
	}[],
	happenSceneSon: ReportHeadState["happenScene"],
	reportDateType: string;
}


interface ReportImplement {

	getAllFormData: (formType: string) => void; // 获取上报表单的数据;

}



class ReportHead extends React.PureComponent<ReportHeadProp, ReportHeadState> implements ReportImplement {

	state: ReportHeadState = {
        profession: [],
		happenScene: [],
		medicalTypeArr: [],
		dataTypeArr: [],
		anonymity: false,
		orgArr: [],
		happenSceneSon: [],
		reportDateType: "",

	}



	getAllFormData(formType: string) {

		//事发场景职称层级
		const getSceneCareerClass =Api.sceneCareerClass(formType);
		//日期类型事发时段医疗类别
		const getMedicalIncidentDate =Api.medicalIncidentDate();
		//科室
		const listOrgTree =Api.listOrgTree();

		Promise.all([getSceneCareerClass, getMedicalIncidentDate, listOrgTree]).then(arr => {


			if(arr.some((val:AxiosInterfaceResponse)=>val.code!==200)){

				return ;
			}

			const { profession, happenScene } = arr[0].data;
			const [medicalTypeArr, , dataType] = arr[1].data;
			const orgArr = arr[2].data;

			const {getMethods} = this.props;
			const parmas = getMethods<"getParams">("getParams")();
			
			let timeStr = parmas.reportTime.split(" ")[0];

			const daystring = this.changeDateType(timeStr);

			this.setState({
				profession,
				happenScene,
				medicalTypeArr: medicalTypeArr.children,
				dataTypeArr: dataType.children,
				orgArr,
				reportDateType:daystring
			});

			const node = dataType.children.find((val:any) => val.text == daystring);

			parmas.dateType = node.id;


			




		}).catch(error => {
			console.log(error);
			alert("获取表单数据出错");
		});
	}

	componentDidMount() {

		const { formType } = this.props;
		this.getAllFormData(formType);

	}
	changeAnonymity = () => {


		this.setState(pre => ({
			anonymity: !pre.anonymity
		}))
	}

	changeHappenceSon = (slecteArr: Readonly<any[]>, filed: string, node: any) => {


		this.setState({
			happenSceneSon: node.children,
		})
		this.props.getMethods<"setComboboxObj">("setComboboxObj")(slecteArr, filed);


	}

	changeDateType(timeStr: string) {


		const arr = [{ "51": "五一" }, { "101": "国庆" }, { "11": "元旦" }];
		const data = new Date(timeStr.split(" ")[0]);
		const _data = data.getMonth() + 1 + "" + data.getDate() as "51";
		const node = arr.find(val => Object.keys(val)[0] == _data);


		if (node) {
			return node[_data]!;
		} else {
			const day = data.getDay();
			return day == 0 ? "周日" : day == 6 ? "周六" : "工作日"
		}




	}

	changeReportDayType = (selTimeArr: Readonly<any[]>, field: string) => {



		this.props.getMethods<"setCalendarObj">("setCalendarObj")(selTimeArr, field);

		const { dataTypeArr } = this.state;

		if(!dataTypeArr.length){

			return ;

		}


		const dayString = this.changeDateType(selTimeArr[0].split(" ")[0]);
		this.setState({
			reportDateType: dayString
		});


		const node = dataTypeArr.find(val => val.text == dayString!)
		this.props.getMethods<"getParams">("getParams")().dateType = node.id







	}
	render() {



		const { profession, happenScene, medicalTypeArr, orgArr, happenSceneSon, reportDateType } = this.state;
		const { getMethods, upOrgName } = this.props;

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

			
{/* todo:字段不确定 */}
			<div className="item-tr">
				<span className="detail">
					<label  >被暴露人：<input type="text"  name="currentPeople" defaultValue={currentPeople} onChange={inputChange}  className={currentPeople?"inp":"inp no-fill"} style={{ width: "80px" }} /></label>
				</span>
				<span className="detail">
					<span >职称：</span>

					<Combobox data={profession} width={120} placeholder="非必填" hasSlideIcon={false} defaultVal={cpProfession} clickCallback={setComboboxObj} field="cpProfession" />
				</span>
				<span className="detail">
					<span >发生时间：</span><Calendar time={true} width={140} field="happenTime" selTimeValArr={happenTime} clickBack={setCalendarObj} />
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
					<span >报告时间：</span><Calendar field="reportTime" clickBack={this.changeReportDayType} selTimeValArr={reportTime} time={true} width={150} />
				</span>
				<span className="detail">
					<label >手机号：</label><input type="text" required  name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange}  className={reporterNumber ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
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
					<Combobox data={happenScene} width={140} hasSlideIcon={false} defaultVal={incidentSceneId} clickCallback={this.changeHappenceSon} field="incidentSceneId" />
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


export default ReportHead;