import * as React from "react";
import Combobox from "@js/common/combobox/index";
import Api from "@api/report";



// 造成病人损害程度 与  事件界定级别 的对应关系




type ReportOrgDefineProp = {
	getMethods: ReportSpace.ReportAPI["getMethods"];
	formType:string;
	txt:string;
}



type ReportOrgDefineState = {
	orgDefineLevel: {
		id: string;
		text: string;
		name: string;
		timeLimit: string;
	}[];
	causeDamageDegree:ReportOrgDefineState["orgDefineLevel"];
	hasOrgCombobox:string;
}


export default class ReportOrgDefine extends React.PureComponent<ReportOrgDefineProp, ReportOrgDefineState> {

	state:ReportOrgDefineState = {
		orgDefineLevel: [],
		causeDamageDegree:[],
		hasOrgCombobox:"",
	
	}


	componentDidMount() {
		//类别联动科室
		const orgDel =Api.orgDefineLevel();

		const damage =Api.causeDamageDegree(); 

		Promise.all([orgDel,damage]).then(arr=>{

			const [org,damage] =arr;

			this.setState({
				causeDamageDegree:damage.data.data,
				orgDefineLevel:org.data,
			});

		});


	}

	damageDegreeToOrgLev=(selectArr:Readonly<any[]>,field:string)=>{


		const relationObj = {
			"1":"4",
			"2":"3",
			"3":"3",
			"4":"3",
			"5":"2",
			"6":"2",
			"7":"2",
			"8":"2",
			"9":"1",
		};

		const {getMethods} = this.props;
		const {orgDefineLevel} = this.state;
		
		 getMethods<"setComboboxObj">("setComboboxObj")(selectArr,field);

		const damageId = selectArr[0].id;
		let hasOrgCombobox = "";
		if(damageId!=10){

			const obj = orgDefineLevel.find(val => val.id == relationObj[damageId as "1"])!;
			hasOrgCombobox = obj.name;
			getMethods<"setComboboxObj">("setComboboxObj")([{id:obj.id}], "orgRank");
		};
		 
	 
		this.setState({
			hasOrgCombobox
		});



	}

	render() {

		const { orgDefineLevel ,causeDamageDegree,hasOrgCombobox} = this.state;
		const { getMethods ,txt} = this.props;
        
		const { orgRank, damageDegree } = getMethods<"getParams">("getParams")()

		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		return (

			<>

				<tr>
					<td>
						<div className="detail">
							<span>造成损害程度：</span>
						</div>
					</td>
					<td>
						<div className="detail">
							<Combobox field="orgRank"  hasSlideIcon={false} data={causeDamageDegree} clickCallback={this.damageDegreeToOrgLev} defaultVal={damageDegree} width={580}  />
						</div>
						
					</td>
				</tr>
				<tr>
					<td >
						<div className="detail">
							<span>科室定级：</span>
						</div>
					</td>
					<td>
						<div className="detail">
						{ !hasOrgCombobox ?	<Combobox field="orgRank" inpShowField="name" hasSlideIcon={false} data={orgDefineLevel} clickCallback={setComboboxObj} defaultVal={orgRank} width={80} pannelWidth={380} />:
						<input type="text" readOnly className="s-inp" value={hasOrgCombobox}/>
						}
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<span>{txt}：</span>
					</td>
					<td>
						<span className="underline" style={{ width: "80px" }}></span>
					</td>
				</tr>


			</>


		)
	}

}


