
import * as React from "react";
import * as Immutable from "immutable" ;
import "@css/combobox.scss";
import {VelocityComponent} from "velocity-react";
import {ComboInp} from "@js/common/InputBtn";

type itemObj = {
	[key:string]:any;
}


type ItemComboProp = {
		id:string;
		text:string;
		icon:string;
		active:boolean;
		clickFn:(id:string,text:String,active:boolean)=>void;
		

}

type DropProp={
	data:itemObj[];
	maxHeight:number;
	idField:string;
	textField:string;
	clickHande:ItemComboProp["clickFn"];
	icon:string;
	slected:state["slected"];
	pannelWidth?:number;	
	showTextField?:string;
}

type DropState={

}


class DropCom extends React.PureComponent<DropProp,DropState>{

		static ItemCombo:React.SFC<ItemComboProp> = ({id,text,clickFn,active,icon})=>{

						return (<li onClick={()=>{clickFn(id,text,active)}}   className={"m-combo-item " + (active ? "active" : "")}>
										{ icon ? <span className={icon}></span>:""}
										 <span>{text}</span>
									 </li>)
					}

		render(){

			const {data,maxHeight,idField,textField,clickHande,icon,slected,pannelWidth} = this.props;


			return (<ul style={{maxHeight,width:(pannelWidth ? pannelWidth : "100%")}} className="m-drop" >
									{
										data.map(val=>{
													const id = val[idField!];
													const text = val[textField!];
													const active = slected.findIndex(val=>val!.id===id) > -1;
													return <DropCom.ItemCombo active={active} id={id} icon={icon!} text={text} clickFn={clickHande} key={id}/>
										})
									}
							</ul>)
		}


}

type node ={
	id:string;
	text:string;
}


type props = {
			idField?:string;
			textField?:string;
			icon?:string;
			clickCallback?:(slecte:Readonly<node[]>,field:string,node?:Readonly<itemObj>,)=>void;
			field?:string;
			multiply?:boolean;
			defaultVal?:string;
			width?:number;
			maxHeight?:number;
			data:itemObj[];
			hasSlideIcon?:boolean;
			formatter?:(node:Readonly<any>)=>JSX.Element;
			pannelWidth?:number;
			showTextField?:string;

}

type state = {
	drop:boolean;
	slected:Immutable.List<node>;

}

export default class Combobox  extends React.PureComponent<props,state>{

	 static defaultProps = {
	 				idField:"id",
					textField:"text",
					icon:"",
					multiply:false,
					defaultVal:"",
					width:240,
					maxHeight:300,
					hasSlideIcon:true,
	 }


	  constructor(props:props){

	  	super(props);

	  	const {defaultVal,data,idField,textField} = props;
	  
	  	const defaultNode =!!defaultVal ? defaultVal.split(",").map(val=>{
	  		const node = data.find(node=>(node[idField!]===val))!
	  		return {
	  			id:val,
	  			text:node[textField!]
	  		}


	  	}):[];
	  	
	  	this.state ={
		  	drop:false,
		  	slected: Immutable.List(defaultNode),
		  }
	  }

	  toggleDrop = ()=>{


	  	this.setState(preState=>{

	  		return {
	  			drop:!preState.drop
	  		}
	  	})

	  }

	  getValue(){

			const {slected} = this.state;

	  	const arr = slected.map(node=>{
	  	 			return node!.text;
	  	 });


	  	 return arr.join(",");

	  }

	  singleClickItem=(id:string,text:string,active:boolean):void=>{

	  		const {clickCallback,field} = this.props;
	  	  !active ? this.setState(pre=>{

	  	  	const node = this.props.data.find(val=>val.id==id) ;
	  	  	const slected = pre.slected.clear().push({id,text});


	  	  	clickCallback && clickCallback(slected.toJS(),field!,node!);

	  	  	return {
	  	  					slected,
	  							drop:!pre.drop,
	  						}
	  		
	  		}):null;

	  }

	  multiplyClickItem=(id:string,text:string,active:boolean):void=>{

	  		const {slected} = this.state;

	  		if(active){
						const index = slected.findIndex(val=>val!.id===id);
						this.setState({
			  			slected:slected.remove(index),
			  		});
	  		}else{
	  				this.setState({
			  				slected:slected.push({id,text}),
			  		});
	  		}
	  }

		render(){

				const {drop,slected} = this.state;

				const {data,idField,textField,icon,multiply,width,maxHeight,hasSlideIcon,pannelWidth,showTextField} = this.props;

				const clickFn = multiply ? this.multiplyClickItem : this.singleClickItem;

				const value = this.getValue();

			

				return (<div className={"combobox "+(drop ? "active ":"")+ (!value?"no-fill":"")} style={{width}} >
									
									<ComboInp multiply={multiply!} toggleDrop={this.toggleDrop} value={value} drop={drop} hasSlideIcon={hasSlideIcon}/>
									<VelocityComponent duration={300} animation={drop?"slideDown":"slideUp"}>
											<DropCom icon={icon!} maxHeight={maxHeight!} pannelWidth={pannelWidth} data={data} idField={idField!} textField={textField!} clickHande={clickFn} showTextField={showTextField} slected={slected}/>
									</VelocityComponent >
								</div>);

		}




}