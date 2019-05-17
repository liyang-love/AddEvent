import * as React from "react";
import ReportHead from "./ReportHead";
import ReportSecond from "./ReportSecond";
import {ReportResult,ReportMeasure} from "./ReportThree";


type ReportUpProp={
 	formType:string; // 上报事件的id 
}
type ReportUpState={
			
}


class ReportUp extends React.PureComponent<ReportUpProp,ReportUpState>{

	


	render(){

		const {formType} = this.props;

		return (
							<table >
								<tbody>
									<tr>
										<td>
												<ReportHead formType={formType}/>
										</td>
									</tr>
									<tr>
										<td>
												<ReportSecond/>
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

			)
	}
}

export default ReportUp ;

