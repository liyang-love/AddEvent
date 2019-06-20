import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import Api from "@api/report";
import Calendar from "@js/common/calendar/index";
import {Checkbox} from "@js/common/InputBtn";


const reasonArr = [
	{tit:"产品原因",value:"1",checked:false},
	{tit:"操作原因",value:"2",checked:false},
	{tit:"患者自身原因",value:"3",checked:false},
	{tit:"无法确定",value:"4",checked:false},
]

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
	topClass: {//职称
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
		topClass:[],
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

			const { profession, happenScene ,topClass} = arr[0].data;
			const [medicalTypeArr, , dataType] = arr[1].data;
			const orgArr = arr[2].data;

			const {getMethods} = this.props;
			const parmas = getMethods<"getParams">("getParams")();
			
			let timeStr = parmas.reportTime.split(" ")[0];

			const daystring = this.changeDateType(timeStr);

			this.setState({
				profession,
				happenScene,
				topClass,
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



		const { profession, happenScene, medicalTypeArr, orgArr, happenSceneSon, reportDateType ,topClass} = this.state;
		const { getMethods, upOrgName } = this.props;

		const inputChange = getMethods<"inputChange">("inputChange");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		const parmas = getMethods<"getParams">("getParams")();







		const { patientName, age, medicalRecordNumber,
			 medicalType,reportTime,birthDate,anamnesis,productName,standard,registerNo,modelNumber,
			reporter, rProfession,  dadIncidentSceneId,rTopClass, reporterNumber, incidentSceneId, happenTime, patientOrgId, 
			udi,batchNumber,productCode,manufactureDate,effectiveDate,instrumentDate,qxReasonDescribe,hurtPerform
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
				<div className="detail">
					<span>出生日期：</span><Calendar width={120} field="birthDate" selTimeValArr={birthDate}  clickBack={setCalendarObj} />
				</div>
				<span className="detail">
					<label >病历号/病案号：<input required type="text" name="medicalRecordNumber" defaultValue={medicalRecordNumber} onChange={inputChange} className={medicalRecordNumber ? "inp" :"inp no-fill"} style={{ width: "120px" }} /></label>
				</span>
			</div>
			<div className="item-tr">
				
				
				<span className="detail">
					<span >患者所在科室：</span>
					<ComTreebox data={orgArr} textFiled="name" defaultSel={patientOrgId + ""} filed="patientOrgId" hasSlideIcon={false} width={130} pannelWidth={300} />
				</span>
				<span className="detail">
                {/* todo:是否为下拉框 */}
					<label >既往病史：<input  required type="text" defaultValue={anamnesis} name="anamnesis" className={anamnesis ? "inp" : "inp no-fill"} style={{ width: "80px" }} onChange={inputChange} /> </label>
				</span>
				
			</div>
			
			<div className="item-tr">

				<span className="detail">
					<span >就医类型：</span>
					<Combobox data={medicalTypeArr} defaultVal={medicalType} width={100} hasSlideIcon={false} field="medicalType" clickCallback={setComboboxObj} />
				</span>
				<span className="detail">
					<span >发生时间：</span><Calendar time={true} width={140} field="happenTime" selTimeValArr={happenTime} clickBack={setCalendarObj} />
				</span>
				<span className="detail">
					<span >日期类型：</span>
					<span className="underline" style={{ width: "90px" }}>{reportDateType}</span>
				</span>	
			
				<span className="detail">
					<span >上报时间：</span><Calendar field="reportTime" clickBack={this.changeReportDayType} selTimeValArr={reportTime} time={true} width={150} />
				</span>
			</div>

			

			
			


			<div className="item-tr">
				

				<span className="detail">
					<label >报告人：</label>
					<input type="text" required name="reporter"  onChange={inputChange} defaultValue={reporter} className={reporter ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<span >职称：</span>
					<Combobox data={profession} width={120} clickCallback={setComboboxObj} defaultVal={rProfession} field="rProfession" hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span >层级：</span>
					<Combobox data={topClass} placeholder="非必填" width={80} hasSlideIcon={false} defaultVal={rTopClass} clickCallback={setComboboxObj} field="rTopClass" />
				</span>
				<span className="detail">
					<label >手机号：</label><input type="text" required  name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange}  className={reporterNumber ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
			</div>
			<div className="item-tr">
				
				<span className="detail">
					<label >产品名称：</label>
					<input type="text" required name="productName"  onChange={inputChange} defaultValue={productName} className={productName ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<label >注册证编号：</label><input type="text" required  name="registerNo" defaultValue={registerNo} onChange={inputChange}  className={registerNo ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
				<span className="detail">
					<label >型号：</label>
					<input type="text" required name="modelNumber"  onChange={inputChange} defaultValue={modelNumber} className={modelNumber ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<label >规格：</label><input type="text" required  name="standard" defaultValue={standard} onChange={inputChange}  className={standard ? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
			</div>
			<div className="item-tr">
				
				<span className="detail">
					<label >产品批号：</label>
					<input type="text" required name="batchNumber"  onChange={inputChange} defaultValue={batchNumber} className={ batchNumber? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
				<span className="detail">
					<label >产品编码：</label><input type="text" required  name="productCode" defaultValue={productCode} onChange={inputChange}  className={ productCode? "inp" : "inp no-fill"} style={{ width: "100px" }} />
				</span>
				<span className="detail">
					<label >UDI：</label>
					<input type="text" required name="udi"  onChange={inputChange} defaultValue={udi} className={udi ? "inp" : "inp no-fill"} style={{ width: "90px" }} />

				</span>
			</div>
			<div className="item-tr">
				
				<span className="detail">
					<label >产品批号：</label>
					<input type="text" required name="manufactureDate"  onChange={inputChange} defaultValue={manufactureDate} className={ manufactureDate? "inp" : "inp no-fill"} style={{ width: "90px" }} />

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
					<Combobox data={happenScene} width={140} hasSlideIcon={false} defaultVal={incidentSceneId} clickCallback={this.changeHappenceSon} field="incidentSceneId" />
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
						reasonArr.map(({tit,value,checked})=>{

							return <Checkbox tit={tit} type="radio" key={value} value={value} checked={checked} nameFiled="qxAnalyseReason" changeHandle={inputChange} />
						})
					}
					</span>
				
					
				</span>
				
				<span className="detail">
					<label >事件原因分析描述：</label>
					<input type="text" required name="qxReasonDescribe"  onChange={inputChange} defaultValue={qxReasonDescribe} className={ qxReasonDescribe? "inp" : "inp no-fill"} style={{ width: 300 }} />

				</span>
			</div>
			<div className="item-tr">
			{/* todo:可控组件的checked没改变 */}
				<span className="detail">
					<label >伤害等级：</label>
					<span className="m-checkbox">
						{
						reasonArr.map(({tit,value,checked})=>{

							return <Checkbox key={value} tit={tit} value={value} checked={checked} nameFiled="hurtRank" changeHandle={inputChange} />
						})
					}
					</span>
					
				</span>
				
				<span className="detail">
					<label >伤害表现：</label>
					hurtPerform
					<input type="text" required name="hurtPerform"  onChange={inputChange} defaultValue={hurtPerform} className={ hurtPerform? "inp" : "inp no-fill"} style={{ width: 300 }} />

				</span>
			</div>

		</>)

	}
}


export default ReportHead