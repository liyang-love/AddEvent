import * as React from "react";
import Combobox from "@js/common/combobox/index";
import Api from "@api/report";
import config from "../config";

type ReportOrgDefineProp = {
	getMethods: ReportSpace.ReportAPI["getMethods"];
    formType:string;
    hospitalName:"center"|"three";
}



type ReportOrgDefineState = {
	orgDefineLevel: {
		id: string;
		text: string;
		name: string;
		timeLimit: string;
	}[];
	causeDamageDegree:ReportOrgDefineState["orgDefineLevel"]
}


export default class ReportOrgDefine extends React.PureComponent<ReportOrgDefineProp, ReportOrgDefineState> {

	state = {
		orgDefineLevel: [],
		causeDamageDegree:[]
	}


	componentDidMount() {
		//类别联动科室
		const orgDel =Api.orgDefineLevel();

		const damage =Api.causeDamageDegree(); 

		Promise.all([orgDel,damage]).then(arr=>{

			const [org,damage] =arr;

			this.setState({
				causeDamageDegree:damage.data,
				orgDefineLevel:org.data,
			});

		});


	}



	render() {

		const { orgDefineLevel ,causeDamageDegree} = this.state;
		const { getMethods ,formType,hospitalName} = this.props;
        
        const data = (config as any)[hospitalName][formType];
		const { orgRank, damageDegree } = getMethods<"getParams">("getParams")()

		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		return (

			<>

				<tr>
					<td>
						<div className="detail">
							<span>造成损害程度：</span>
							<Combobox field="orgRank"  hasSlideIcon={false} data={causeDamageDegree} clickCallback={setComboboxObj} defaultVal={damageDegree} width={600}  />
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div className="detail">
							<span>科室定级：</span>
							<Combobox field="orgRank" inpShowField="name" hasSlideIcon={false} data={orgDefineLevel} clickCallback={setComboboxObj} defaultVal={orgRank} width={80} pannelWidth={380} />
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<span>{data.defineLevTit}：</span>
						<span className="underline" style={{ width: "80px" }}></span>
					</td>
				</tr>


			</>


		)
	}

}


