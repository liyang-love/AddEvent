import * as React from "react";
import {connect,MapStateToProps} from "react-redux";
import Api from "@api/myReport";
import TableWrap from "./ReportTable";



type MyReportProps={
	
}
type MyReportState={
	data: any[] | null;

}


class MyReport extends React.PureComponent<MyReportProps & reduxProps,MyReportState>{

	state:MyReportState={
		data:null
	}
	componentDidMount(){

		const {orgId} = this.props;
		Api.upOrgShowBar(orgId).then((res:AxiosInterfaceResponse)=>{
			this.setState({
				data:res.data
			})
		})
	}

    render(){
		const {data} = this.state;
        return(<div className="g-layout g-padding">
				<div className="g-layout-article">
					{data ? <TableWrap data={data} /> : null}
				</div>
				
			</div>
		)
    }



}

type reduxProps={
    orgId:string;
}

const mapStateToProps:MapStateToProps<reduxProps,MyReportProps,appStore>=({app})=>{

    const index = app.get("roleIndex");
    const orgId = app.get("orgId")[index]
    return {
        orgId,

    }

}

export default connect(mapStateToProps)(MyReport)





