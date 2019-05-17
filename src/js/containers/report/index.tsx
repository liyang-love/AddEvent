import * as React from "react";
import "@css/report.scss" ;
import {RouteComponentProps} from "react-router-dom";



import ReportUp  from "./ReportUp";
import ReportDown  from "./ReportDown";


type ReportProp={

}


type ReportState={
		curPage:number;
}


class Report extends React.PureComponent< RouteComponentProps<ReportProp>,ReportState>  {

	state:ReportState={
		curPage:1,
	
	}

	changePage=()=>{
		this.setState(pre=>{
			return {
				curPage: (3 - pre.curPage),
			}
		})
	}

	
	render(){

		const {curPage} = this.state;

		const {location:{state:{id}}} = this.props;


		const is_first = curPage == 1;

		return (
				<div className="report-article">
						{!is_first ?<span className="pre-btn" onClick={this.changePage}><i className="fa fa-angle-double-left fa-2x"></i><br/>第一页</span>:null}
						<div className="report-container">
							<div className="report-content" style={{display:( is_first? "block" : "none")}}>
									<ReportUp formType={id} />
							</div>
							<div className="report-content" style={{display:( is_first? "none" : "block")}}>
										<ReportDown />
							</div>
						
						</div>
						{is_first ?<span className="next-btn" onClick={this.changePage}><i className="fa fa-angle-double-right  fa-2x"></i><br/>第二页</span>:null}
						
				</div>
			)
	}
}




export default Report;