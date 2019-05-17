import * as React from "react";
import MenuNav from "@js/common/NavMenu";
import ErrorBoundary from "@js/common/ErrorBoundary";
import * as Immutable from "immutable";
import * as Velocity from "velocity-react";
import axios from "axios";
import {connect,MapStateToProps} from "react-redux";


type slideMenu={
	expand:boolean;
	isFetch:boolean;
	data:Immutable.List<MenuItem>
};

declare global{
	type MenuItem = TypedMap<{
		 id: string;
   	 appId: string;
     name: string;
     url: string;
     sysParam: string;
     parId:number;
     children:Immutable.List<MenuItem>
	}>;
}

	
type SlideMenuProp={

}
type SlideMenuState ={


}

class SlideMenu extends React.PureComponent< SlideMenuProp & reduxProp,SlideMenuState>{

	state:slideMenu = {
		expand:true,
		isFetch:false,
		data:Immutable.List([]),
	}
  

	getMenu(){

		this.setState({
				isFetch:true,
		});

		const {roleId}  = this.props;

		axios({
			url:"AdvEvent/main/getLeftMenu",
			 params:{roleId},
		}).then(res=>{
			console.log(res);
			const data = res.data;
			if(data && data.data.length){

				this.setState({
							data:Immutable.fromJS(data.data),
							isFetch:false,
					});
			}else{
				alert("获取不到菜单");
			}
		})
		
	}

	componentDidMount(){
			this.getMenu();
	}
	expandHandle=()=>{

		this.setState((prevState:slideMenu)=>{
			return {
				expand:!prevState.expand,
			}
		})
	}

	

	render(){

		const {expand,data} = this.state;

		return (
			<Velocity.VelocityComponent duration={300} animation={{width:this.state.expand ? 250 : 50}}>
					<div className={"g-slideMenu "+ (!expand ? "expand" : "")}>
											<div className="g-logo">
													<span className="m-logo"></span>
													<span className="j-slideBar" onClick={this.expandHandle}>
														 <i className="fa fa-bars fa-2x"></i>
													</span>	
											</div>
											<ErrorBoundary>
												<MenuNav  data={data} expand={expand} textField="name" iconField="sysParam"/> 
											</ErrorBoundary>
					</div>
			</Velocity.VelocityComponent> );
	}



}

type reduxProp ={
	roleId:string;
} 

const mapStateToProp:MapStateToProps<reduxProp,SlideMenuProp,appStore>=({app})=>{


	return {

		roleId:(app.get("userInfo").roleId)![0],

	}
}


export default connect(mapStateToProp)(SlideMenu) ;