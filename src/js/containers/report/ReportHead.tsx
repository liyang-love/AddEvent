import * as React from "react";
import Combobox from "@js/common/Combobox";
import axios from "axios";


type ReportHeadProp = {
  formType:string;// 上报事件的id
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
				categoryLinkOrg:{
						id:string;
						text:string;
						orgId:string;
				}[]
}

interface ReportImplement{
	getAllFormData:(formType:string)=>void; // 获取上报表单的数据;
}


class ReportHead extends React.PureComponent<ReportHeadProp,ReportHeadState> implements ReportImplement{

	state:ReportHeadState={
			profession:[],
			happenScene:[],
			topClass:[],	
			categoryLinkOrg:[],
	}


	getAllFormData(formType:string){
		
		//事发场景职称层级
		const getLevAndEventArr = axios({
																	url:"./AdvEvent/event/sceneCareerClass",
																	params:{formType}
															});
		//类别联动科室
		const getCascadeOrgArr = axios({
																	url:"./AdvEvent/event/categoryLinkOrg",
																	params:{formType}
															});
		Promise.all([getLevAndEventArr,getCascadeOrgArr]).then(arr=>{
				

				const [{data:levAndEventArr},{data:cascadeOrgArr}] = arr ;
				const {profession, happenScene, topClass} = levAndEventArr;
				this.setState({
					profession,
					happenScene,
					topClass,
					categoryLinkOrg:cascadeOrgArr.data,
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

			return (<>
								<div className="item-tr">
								
									<span className="detail">
										 <label >科室：<span className="underline" style={{width: "80px"}}>腔镜科</span></label>
									</span>
									<span className="detail">
										 <label >床号：<input type="text"  className="inp" style={{width:"80px"}} /> </label>
									</span>
									<span className="detail">
										 <label >姓名：<input type="text" id="patient" className="inp" style={{width:"60px"}} /></label>
									</span>
			
									<span className="detail">
										 	<span>性别：</span>
											<select className="select" defaultValue={"1"}>
												<option value="1" >男</option>
												<option value="2">女</option>
											</select>
									</span>
										<span className="detail">
											 <label >年龄：<input type="text"  className="inp" style={{width:"40px"}} /></label>
									</span>
									<span className="detail">
										<label>入院时间：<input  type="text" style={{width:"100px"}} /></label>
									</span>
							</div>	
							<div className="item-tr">
								<span className="detail">
										 <label >病历号：<input type="text"  className="inp" style={{width:"150px"}} /></label>
								</span>
								<span className="detail">
										 <label >主要诊断：<input type="text"  className="inp" style={{width:"450px"}}/></label>
								</span>
							</div>
							<div className="item-tr">
								
									<span className="detail">
											<span>相关风险评估：</span>
											 <label >跌倒：<input type="text"  className="inp" value="无" style={{width:"30px"}} /></label>
											
									</span>
									<span className="detail">
										<label >压疮：<input type="text"  className="inp" value="无" style={{width:"30px"}} /></label>
									
									</span>
									<span className="detail">
										<label >自理能力：<input type="text"  className="inp" value="无" style={{width:"30px"}} /></label>
									</span>
									<span className="detail">
											<label >非计划性拔管：<input type="text"  className="inp" value="无" style={{width:"30px"}} /></label>
											
									</span>
									<span className="detail">
											 <label >其他：<input type="text"  className="inp" style={{width:"175px"}} /></label>
									</span>
							</div>	
							<div className="item-tr">
									 <span className="detail">
									 		<label >当事人：<input type="text"  className="inp"  style={{width:"80px"}} /></label>
									 </span>
									 <span className="detail">
									 		<span>职称：</span>
								 			<Combobox data={profession} width={120} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>层级：</span>
									 		<Combobox data={topClass} width={80} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>发生时间：</span><span  className="detail-time"></span>
									 </span>
							</div>
							<div className="item-tr">
										<span className="detail">
									 		<label >发现人：<input type="text"  className="inp" style={{width:"80px"}} /></label>
									 </span>
									 <span className="detail">
									 	<span>职称：</span>
								 			<Combobox data={profession} width={120} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>层级：</span>
									 		<Combobox data={topClass} width={80} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>发现时间：</span><span className="detail-time"></span>
									 </span>
			
							</div>

							
							<div className="item-tr">
										<span className="detail">
									 		<label >报告人：</label><input type="text"  className="inp" style={{width:"80px"}}/>
									 </span>
									 <span className="detail">
									 	<span>职称：</span>
								 			<Combobox data={profession} width={120} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>层级：</span>
									 		<Combobox data={topClass} width={80} hasSlideIcon={false}/>
									 </span>
									 <span className="detail">
									 		<span>报告时间：</span><span  className="detail-time"></span>
									 </span>
							</div>
							<div className="item-tr">
									 <span className="detail">
									 		<span >事发场景：</span>
								 			<Combobox data={happenScene} width={120} hasSlideIcon={false}/>
									 		&nbsp;&nbsp;<input type="text"  className="inp" style={{width:"180px"}} />
									 </span>	
									 <span className="detail">
									 		<span >日期类型：</span>
								 			<Combobox data={[]} width={120} hasSlideIcon={false}/>
									 </span>
							</div>

							</>)

	}
}


export default ReportHead ;