
import * as React from "react";
import * as Immutable from "immutable" ;
import "@css/combobox.scss";
import {VelocityComponent} from "velocity-react";
import {ComboInp} from "@js/common/InputBtn";
import DropCom from "./Drop";

type props = {
			idField?:string;
			textField?:string;
			icon?:string;
			clickCallback?:(slecte:Readonly<ComboboxSpace.comboboxAPI["slectedItem"][]>,field:string,node?:Readonly<any>,)=>void;
			field:string;
			multiply?:boolean;
			defaultVal?:string;
			width?:number;
			maxHeight?:number;
			data:any[];
			hasSlideIcon?:boolean;
			formatter?:(node:Readonly<any>)=>JSX.Element;
			pannelWidth?:number;
			inpShowField?:string;
}


type state = {
	drop:boolean;
	slected:Immutable.List<ComboboxSpace.comboboxAPI["slectedItem"]>;
	data:Immutable.List<TypedMap<ComboboxSpace.comboboxAPI["itemNode"]>>
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
	  		const node = data.find(node=>(node[idField!]==val))!
	  		return  {
	  			id:val,
	  			text:node[textField!]
	  		}  ;
	  	}):[];


	  	
	  	this.state ={
		  	drop:false,
		  	slected: Immutable.List(defaultNode),
		  	data:Immutable.fromJS(this.addField(data,)),
		  }
	  }

	  addField(data:any[]):any[]{

	  	const {defaultVal,idField,multiply} = this.props;
			let slecteArr = defaultVal!.split(",");

					!multiply && slecteArr.pop();

			return  JSON.parse(JSON.stringify(data),function(...args){

									const [,val] = args
				  				if(Object.prototype.toString.call(val)=== "[object Object]"){
				  						val.active = slecteArr.includes(val[idField!]+"");
				  				}
				  				return val;
				  	});
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

	  getPropFieldVal=(field:ComboboxSpace.field)=>{
	  		return this.props[field]!;
	  }

	 

	  clickFn=(e:React.MouseEvent<HTMLLIElement>)=>{

	  		const index = +e.currentTarget.dataset.index!;

	  		const {multiply,textField,idField,clickCallback,field,inpShowField}= this.props;
	  		const {data,slected}= this.state;

	  		const flagText = inpShowField || textField ;

  			const node = data.get(index)!;
				const id = node.get(idField as any);
				const text = node.get(flagText as any);
				
				const slecteIndex = slected.findIndex(val=>val.id == id);
				const is_has = slecteIndex > -1 ;

	  		if(multiply){

	  				this.setState({
	  					data:data.set(index,node.set("active",!is_has)),
  						slected: !is_has ? slected.push({id,text}) : slected.remove(slecteIndex),
	  				});

	  		}else{

	  			if(is_has){
	  				return ;
	  			};

	  			const preSlected = slected.get(0);

	  			

	  			let  $data= data.set(index,node.set("active",!is_has));

	  			if(preSlected){
							const preIndex = data.findIndex(val=>val.get("id" as any) == preSlected.id);
							$data = $data.update(preIndex,node=>node.set("active",false));
	  			}

	  			

	  			clickCallback && clickCallback([{id,text}],field!,node.toJS());

	  			this.setState({
	  					data:$data,
  						slected:slected.clear().push({id,text}),
	  			})

	  		};
	  }
	

		render(){

				const {drop,data} = this.state;

				const {multiply,width,maxHeight,hasSlideIcon,pannelWidth} = this.props;


				const value = this.getValue();

			

				return (<div className={"combobox "+(drop ? "active ":"")+ (!value?"no-fill":"")} style={{width}} >
									
									<ComboInp multiply={multiply!} toggleDrop={this.toggleDrop} value={value} drop={drop} hasSlideIcon={hasSlideIcon}/>
									<VelocityComponent duration={300} animation={drop?"slideDown":"slideUp"}>
											<ul style={{maxHeight,width:(pannelWidth ?pannelWidth:"100%")}} className="m-drop" >
												
													<DropCom   data={data} getPropFieldVal={this.getPropFieldVal}  clickHande={this.clickFn} />

											</ul>
									</VelocityComponent >
								</div>);

		}




}