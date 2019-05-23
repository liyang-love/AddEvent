import * as React from "react";
import Combobox from "@js/common/Combobox";
import axios from "@js/common/AxiosInstance";

type ReportOrgDefineProp={
		getMethods:ReportSpace.ReportAPI["getMethods"];
}



type ReportOrgDefineState={
	orgDefineLevel:{
						id:string;
						text:string;
						name:string;
						timeLimit:string;
				}[];
}


export default class ReportOrgDefine extends React.PureComponent<ReportOrgDefineProp,ReportOrgDefineState> {

	state={
		orgDefineLevel:[],
	}


	componentDidMount(){
		//类别联动科室
		 axios({
							url:"/event/orgDefineLevel",
			}).then(res=>{

					this.setState({
						orgDefineLevel:res.data.data,
					});
			});


	}

	
	
	render(){

		const {orgDefineLevel} = this.state;
		const {getMethods} = this.props;

		const {orgRank,functionOrgRank} = getMethods<"getParams">("getParams")()

		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

			return(

					<>

							<tr>
								<td>
									<div className="detail">
										<span>科室定级：</span>
										<Combobox field="orgRank" hasSlideIcon={false} data={orgDefineLevel} clickCallback={setComboboxObj} defaultVal={orgRank} />
									</div>
								</td>
							</tr>
							<tr>
									<td>
										<span>职能科室定级：</span>
											<div className="detail">
												<Combobox field="orgRank" hasSlideIcon={false} data={orgDefineLevel} clickCallback={setComboboxObj} defaultVal={functionOrgRank}  />
											</div>
									</td>
							</tr>


					</>


				)
		}

}


