import * as React from "react";



type checkProps = {
	changeHandle: (e:React.ChangeEvent<HTMLInputElement>) => void;
	tit?:string;
	checked:boolean;
	value?:string;
	nameFiled: string;
	hasChecked?:boolean;
	type?:"checkbox"|"radio";
	isControl?:boolean;
}

type checkState = {

}

class Checkbox extends React.PureComponent<checkProps, checkState>{

	static defaultProps={
		type:"checkbox",
		isControl:true,
	}	

	render() {

		const { tit,checked,value, nameFiled, changeHandle,hasChecked,type,isControl } = this.props;

		const obj = !isControl ? {defaultChecked:checked} :{checked:checked};

		return  (<label className={`m-label m-lab-${type}`} >
			<input type={type} className={hasChecked ? "ha-check" :""}   name={nameFiled} {...obj} value={value} onChange={changeHandle!} />
			{tit ? (<span className="lab-tit">{tit}</span>) : null}
		</label>)
	}

}

type CominpProps = {
	multiply: boolean;
	toggleDrop: (e: React.MouseEvent<HTMLElement>) => void;
	value: string;
	drop: boolean;
	hasSlideIcon?: boolean;
	placeholder?: string;
}

type CominpState = {

}

class ComboInp extends React.PureComponent<CominpProps, CominpState>{


	render() {

		const { multiply, toggleDrop, value, drop, hasSlideIcon, placeholder } = this.props;

		return (<div className="m-combo-inp" onClick={toggleDrop}>
			<span className="m-inp-wrap">
				{!multiply ? <input type="text" className="m-inp" readOnly value={value} placeholder={placeholder ? placeholder : "单选"} /> : (<textarea value={value} className="m-inp" readOnly placeholder={placeholder ? placeholder : "多选"} />)
				}
			</span>
			{hasSlideIcon ? (<span className="j-slide" >
				<i className={"fa " + (drop ? "fa-chevron-up" : "fa-chevron-down")}></i>
			</span>) : null}
		</div>)


	}
}



type InpBoxProp = {
	type: string;
	title: string;
	styleType: string;
	value?: string;
	changeHandle: (field: string, value: string) => void;
	field: string;
}

type InpBoxState = {

}

class InpBox extends React.PureComponent<InpBoxProp, InpBoxState>{



	changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {

		const { changeHandle, field } = this.props;
		const value = e.target.value.trim();
		changeHandle(field, value);

	}

	render() {
		const { type, title, styleType, value } = this.props;

		const fillStatus = value ? "" : " no-fill ";

		return (
			<div className="item-inp">
				<span className="m-inp-tit">{title} </span>
				<input type={type} className={"s-inp " + fillStatus + styleType} value={value} onChange={this.changeHandle} />
				
			</div>
		)

	}
}

export {
	Checkbox,
	ComboInp,
	InpBox,
}