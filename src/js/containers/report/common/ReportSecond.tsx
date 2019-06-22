import * as React from "react";
import Combobox from "@js/common/combobox/index";
import Api from "@api/report";
type ReportSecondProp = {
	formType: string;
	getMethods: ReportSpace.ReportAPI["getMethods"];
}

type node = {
	id: string;
	text: string;
}

type ReportSecondState = {
	categoryLinkOrg: {
		id: string;
		text: string;
		orgId: string;
		orgName: string;
		children: any[]
	}[];
	categoryLinkOrgLev2: ReportSecondState["categoryLinkOrg"];
	org: string;

}


class ReportSecond extends React.PureComponent<ReportSecondProp, ReportSecondState> {

	state = {
		categoryLinkOrg: [],
		categoryLinkOrgLev2: [],
		org: "",
	}


	componentDidMount() {
		//类别联动科室
		const { formType } = this.props;
		Api.categoryLinkOrg(formType).then((res: AxiosInterfaceResponse) => {

			if (res.code == 200) {
				this.setState({
					categoryLinkOrg: res.data.data,
				});
			} else {
				console.log(res.message)
			}



		});


	}

	setCategoryLinkOrgLev2 = (selectArr: Readonly<node[]>, field: string, node: Readonly<any>) => {

		const { getMethods } = this.props;

		if (field === "categoryId") {
			this.setState({
				categoryLinkOrgLev2: node.children,
			});
		} else {
			this.setState({
				org: node.orgName
			});
		}

		getMethods<"setComboboxObj">("setComboboxObj")(selectArr, field);

	}

	render() {

		const { categoryLinkOrg, categoryLinkOrgLev2, org } = this.state;
		const { formType, getMethods } = this.props;
		const { categoryId, dadCategoryId } = getMethods<"getParams">("getParams")();


		return (

			<div className="item">

				<span className="detail">
					<span >类别：</span>
					<Combobox data={categoryLinkOrg} renderClick={true} dirctionUp={formType == "7033"} defaultVal={categoryId} pannelWidth={180} width={140} field="categoryId" hasSlideIcon={false} clickCallback={this.setCategoryLinkOrgLev2} />
					&nbsp;&nbsp;
								 			<Combobox data={categoryLinkOrgLev2} dirctionUp={formType == "7033"} renderClick={true} defaultVal={dadCategoryId} width={240} hasSlideIcon={false} field="dadCategoryId" clickCallback={this.setCategoryLinkOrgLev2} />
				</span>
				<span className="detail">
					<span >分配科室：</span><span className="underline" style={{ width: "180px" }} >{org}</span>
				</span>

			</div>


		)
	}

}


export default ReportSecond