import * as React from "react";
import {ReportSeason,ReportImproveMeasure} from "./ReportFour";
import {ReportOpinion,ReportOrangeOpinion} from "./ReportFive";


type ReportDownProp={

}
type ReportDownState={
	
}


export default class ReportDown extends React.PureComponent<ReportDownProp,ReportDownState>{



	render(){

		return (
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
			)
	}
}


