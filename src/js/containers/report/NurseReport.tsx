import * as  React from "react";
import ReportHead from "./component/ReportHead";
import ReportSecond from "./component/ReportSecond";
import {ReportResult,ReportMeasure} from "./component/ReportThree";
import {ReportSeason,ReportImproveMeasure} from "./component/ReportFour";
import {ReportOpinion,ReportOrangeOpinion} from "./component/ReportFive";



type NurseReportProps={
		formType:string;
		showPage:number;
		getMethods:ReportSpace.getMethods;
		upOrgName:string;
}

type NurseReportState={


}

export default class NurseReport extends React.PureComponent<NurseReportProps,NurseReportState>{



	render(){

		const {showPage,formType,getMethods,upOrgName} = this.props;

		let statusArr = new Array(2).fill("none"); 
				statusArr[showPage] = "block";



		return (<>
								
									<div className="report-content" style={{display:statusArr[0]}}>
											<table >
												<tbody>
													<tr>
														<td>
																<ReportHead formType={formType} getMethods={getMethods} upOrgName={upOrgName} />
														</td>
													</tr>
													<tr>
														<td>
																<ReportSecond formType={formType} getMethods={getMethods}/>
														</td>
													</tr>
													<tr>
														<td>
																<ReportResult/>
														</td>
													</tr>
													<tr>
														<td>
																<ReportMeasure/>
														</td>
													</tr>
													</tbody>
											</table>
									</div>
									<div className="report-content" style={{display:statusArr[1]}}>
											<table >
												<tbody>
													<tr>
														<td colSpan={2}>
																<ReportSeason/>
														</td>
													</tr>
													<tr>
														<td colSpan={2}>
																<ReportImproveMeasure/>
														</td>
													</tr>
													<tr>
														<td style={{width: "120px"}}>
															科室定级：
														</td>
														<td>
															<select className="select" defaultValue={"1"}>
																<option value="1" >Ⅰ</option>
																<option value="2">Ⅱ</option>
																<option value="3" >Ⅲ</option>
																<option value="4">Ⅳ</option>
															</select>
														</td>
													</tr>
													<tr>
														<td style={{width: "120px"}}>
																职能科室定级：
															</td>
															<td>
																<select className="select" defaultValue={"1"} >
																	<option value="1" >Ⅰ</option>
																	<option value="2">Ⅱ</option>
																	<option value="3" >Ⅲ</option>
																	<option value="4">Ⅳ</option>
																</select>
															</td>
													</tr>
													<tr>
															<td colSpan={2}>
																	<ReportOpinion/>
															</td>
														</tr>
														<tr>
															<td colSpan={2}>
																	<ReportOrangeOpinion/>
																	
															</td>
														</tr>
													</tbody>
												</table>
									</div>

						</>)

	}

}