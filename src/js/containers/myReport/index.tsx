import * as React from "react";
import {Route} from "react-router-dom";
import TableView from "./tableview/TableView";
import ReportDetail from "./detail/index";

class IndexRouter extends React.PureComponent{




	render(){



		return (
			<>
				<Route path="/my_report"  exact  component={TableView}/>
				<Route path="/my_report/report_detail"  component={ReportDetail} />
			</>
			



			


		)
	}



}




export default IndexRouter ;





