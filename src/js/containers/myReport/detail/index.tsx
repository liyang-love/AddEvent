import * as React from "react";
import {Notification} from "@js/common/toast/index";
import {Button,Icon} from "@js/common/Button";
import HeadTextBase from "./HeadTextBase";
import NurseText from "./textModel/NurseText";

type detailProps={

}

type detailState={

}

class ReportDetail extends React.PureComponent<detailProps,detailState>{

    
    notificationRef: React.RefObject<Notification> = React.createRef();

    daoHandle=()=>{



    }

    render(){

        const text = "详情"
        return (
            <div className="g-layout">

				<Notification ref={this.notificationRef}/>

				<div className="g-layout-head">
					<span ><b style={{ fontSize: 18 }}>{text}</b></span>
					<span className="m-optBtn">	
					
						<Button handle={this.daoHandle} field="2">
							<Icon styleType="fa-save"/>
							导出
						</Button>
					</span>
				</div>
				<div className="g-layout-article" >
                        
				</div>
			</div>
        )
    }
}



export default ReportDetail;