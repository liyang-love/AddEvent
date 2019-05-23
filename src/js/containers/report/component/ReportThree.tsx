import * as React from "react";
import Calendar from "@js/common/calendar/index";


//简要事件的经过及结果
type ReportResultProp={
	hospitalName:ReportSpace.hospitalName; // 医院名称
	getMethods:ReportSpace.ReportAPI["getMethods"];
}

type ReportResultState={
	
}


class ReportResult extends React.PureComponent<ReportResultProp,ReportResultState> {

	render(){
			const {hospitalName,getMethods} = this.props;

			const inputChange = getMethods<"inputChange">("inputChange");
			const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
			const {passResult,pass,result,psDate} = getMethods<"getParams">("getParams")();


			return(
						<>


							{hospitalName !== "中医院" ? (<>
																						<p className="main-tit">简要事件的经过及结果：</p>
																						<div className="main" style={{height: "220px" }}>
																								<textarea defaultValue={passResult} name="passResult " className="txtInp" placeholder="填写内容（以时间为节点）..." maxLength={400} onChange={inputChange}></textarea>
																						</div>
																					</>) : 
							(<>
								<p className="main-tit">事件的经过：</p>
								<div className="main" style={{height: "100px" }}>
										<textarea name="pass" defaultValue={pass} className="txtInp" placeholder="填写内容（以时间为节点）..." maxLength={200}></textarea>
								</div>
								<p className="main-tit">事件的结果：</p>
								<div className="main" style={{height: "120px" }}>
										<textarea name="result" defaultValue={result} className="txtInp" placeholder="填写内容（以时间为节点）..." maxLength={200}></textarea>
								</div>
								</>)
						}

							<div className="footer">
								<div className="detail">	
											<label >报告人：<input type="text"  className="inp" style={{width:"120px"}}/></label>
								</div>
								<div className="detail">	
										<span>日期：</span><Calendar field="psDate" selTimeValArr={psDate} width={140} clickBack={setCalendarObj} />
								</div>
							</div>
						</>

				)

	}
}


//处理措施
type ReportMeasureProp={
	getMethods:ReportSpace.ReportAPI["getMethods"];
}

type ReportMeasureState={
	
}


class ReportMeasure extends React.PureComponent<ReportMeasureProp,ReportMeasureState>{


	render(){

			const {getMethods} = this.props;

			const inputChange = getMethods<"inputChange">("inputChange");
				const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
			const {treatmentMeasures,tmSignatory,tmDate} = getMethods<"getParams">("getParams")();

			return(
						<>
							<p className="main-tit">处理措施：</p>
							<div className="main" style={{height: "220px"}}>
									<textarea name="treatmentMeasures"  className="txtInp" defaultValue={treatmentMeasures}  placeholder="填写内容..." maxLength={400} onChange={inputChange} ></textarea>
								</div>
							<div className="footer">
								<div className="detail">	
											<label >护士长：<input type="text" name="tmSignatory" defaultValue={tmSignatory} className="inp" onChange={inputChange} style={{width:"120px"}} /></label>
								</div>
								<div className="detail">	
										<span>日期：</span><Calendar  width={140} clickBack={setCalendarObj}  selTimeValArr={tmDate} field="tmDate" />
								</div>
							</div>
						</>

				)

	}
}


export {ReportResult,ReportMeasure}