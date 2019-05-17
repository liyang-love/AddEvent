import * as React from "react";
import Combobox from "@js/common/Combobox";

type ReportSecondProp={

}

type ReportSecondState={
	
}


class ReportSecond extends React.PureComponent<ReportSecondProp,ReportSecondState>{


	render(){

			return(

					<div className="item">
									
										
								 <span className="detail">
								 		<span>类别：</span>
								 			<Combobox data={[]} width={140} hasSlideIcon={false}/>
								 			&nbsp;&nbsp;
								 			<Combobox data={[]} width={240} hasSlideIcon={false}/>
								 </span>
								 <span className="detail">
								 			<span>分配科室：</span><span className="underline" style={{width:"180px" }} ></span>
								 </span>
							
						</div>


				)

	}
}


export default ReportSecond