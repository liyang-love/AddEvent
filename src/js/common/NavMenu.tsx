import * as React from "react";
import {Link} from "react-router-dom";
import "@css/menu.scss";
import * as Immutable from "immutable";
import * as Velocity from "velocity-react";



type props = {
		data:Immutable.List<MenuItem>;
		expand:boolean;
		textField?:string;
		childrenField?:string;
		pathField?:string;
		iconField?:string;
		idField?:string;
};


type ItemProps ={
	obj:Immutable.Map<string,any>;
	textField:string;
	
	pathField:string;
	iconField:string;
	idField:string;
	slectItem:(id:string,type?:string)=>void;
	activeName:string;
	expand:boolean;
	sub?:Immutable.List<ItemProps["obj"]>;
	childSlected?:string;
	parId?:string;
};

class ParMenu extends React.PureComponent<ItemProps>{

	state={
		drop:true,
	}

	toggle=()=>{
		this.setState((prevState:{drop:boolean})=>({drop:!prevState.drop}))
	}

	

	render(){

	
			
			const {obj,idField,textField,iconField,pathField,slectItem,activeName,sub,childSlected} = this.props;

			const path = obj.get(pathField);
			const text = obj.get(textField);
			const icon = obj.get(iconField);
			const id = obj.get(idField);

			const hObj = this.props.expand ? {display: "block"} : {};

			return (
					<li className="li-par">
							<div  className={"menu-item menu-par " + activeName} onClick={()=>slectItem(id)}>
									<span className="par-icon">
										<i className={icon}></i>
									</span>	
									<span className="j-nav" >
										<Link to={path}>{text}</Link>
									</span>
									<span className="j-slide_menu" onClick={this.toggle}>
										<i className={"fa fa-chevron-"+(this.state.drop ? "down":"up")}></i>
									</span>
							</div>	
							<Velocity.VelocityComponent animation={this.state.drop ? "slideDown": "slideUp"} duration={300}>
									<ul className="child-ul " style={hObj}>
											{
													sub!.map((node:Immutable.Map<string,any>)=>{
																	  const nodeId = node.get("id");
																		const activeName = nodeId === childSlected ? "active":"";
																	return <SubMenu 
																						obj={node} 
																						activeName={activeName}   
																						key={nodeId} 
																						slectItem={slectItem} 
																						parId={id}
																						idField={idField}
																						textField={textField}
																						iconField={iconField}
																						pathField={pathField}
																						/>
													})

											}
									</ul>
							</Velocity.VelocityComponent>
						
					</li>
				)

	}

}



const SubMenu:React.SFC< (Pick<ItemProps,Exclude<keyof ItemProps,"expand">>)> = ({obj,idField,textField,pathField,slectItem,parId,activeName})=>{

		  const path = obj.get(pathField);
			const text = obj.get(textField);
		  const id = obj.get(idField);
			return (
					<li className="li-child">
							<div  className={"menu-item menu-child "+activeName} >
									<span className="j-nav" onClick={()=>slectItem(id,parId)}>
										<Link to={path}>{text}</Link>
									</span>
							</div>	
					</li>
				)
};


type state={
	parSlected:string,
	childSlected:string,
	test?:boolean;
}

class NavMenu extends React.PureComponent<props,state>{
	
	static defaultProps = {
					textField:"text",
					childrenField:"children",
					pathField:"url",
					iconField:"icon",
					idField:"id"
				};

	state={
		parSlected:"",
		childSlected:"",
	}

	slectItem=(id:string,type?:string)=>{
			if(!type){ //  父节点

				this.setState({
					parSlected:id,
					childSlected:"",
				});
				 
			
			}else{ 

				this.setState({
					parSlected:type,
					childSlected:id,
				});
				 

			}
	}


	render(){
		const {data,textField,childrenField,idField,iconField,expand,pathField} = this.props;


		const {parSlected,childSlected} = this.state;
		

		return <ul className="g-menu">
						
							{

								data.map(item=>{
															const val = item!;
															const child = val.get(childrenField as "children");
															const id = val.get("id");
															const activeName = id === parSlected ? "active" : "";

															if(child && child.size){
																	return <ParMenu 
																						expand={expand} 
																						activeName={activeName} 
																						childSlected={childSlected} 
																						sub={child}  
																						obj={val}  
																						key={id} 
																						slectItem={this.slectItem} 
																						idField={idField!}
																						textField={textField!}
																						pathField={pathField!}
																						iconField={iconField!}
																					/> 
															}else{
																	return <SubMenu 
																						obj={val} 
																						key={id} 
																						activeName={activeName}  
																						slectItem={this.slectItem} 
																						parId={""} 
																						idField={idField!}
																						textField={textField!}
																						pathField={pathField!}
																						iconField={iconField!}
																						/>
																				}
													})
							
							}
		</ul>
	}
}


export default NavMenu ;