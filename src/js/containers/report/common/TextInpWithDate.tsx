import * as React from "react";
import  Calendar from "@js/common/calendar/index"

type fieldKey = keyof ReportSpace.params;

type textProps={
    getMethods:ReportSpace.ReportAPI["getMethods"];
    tit:string;
    nameSigin:string;
    placeholder:string;
    maxLength:number;
    fieldInp:fieldKey;
    fieldDate:fieldKey;
    fieldSigin:fieldKey;
    height:number;
}



export default class extends React.PureComponent<textProps>{

    static defaultProps={
        placeholder:"填写内容"
    }

   
    render() {

		const { getMethods,tit,placeholder,maxLength,nameSigin,fieldDate,fieldInp,height,fieldSigin} = this.props;
		const inputChange = getMethods<"inputChange">("inputChange");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");

		const paramObj = getMethods<"getParams">("getParams")();
		
		const  nameSiginVal = paramObj[fieldSigin],
			   txtVal = paramObj[fieldInp], 
			   dateVal  = paramObj[fieldDate];



		return (<>
			<p className="main-tit">{tit}：</p>
			<div className="main" style={{ height}}>
				<textarea name={fieldInp} required defaultValue={txtVal} onChange={inputChange} className={txtVal ? "txtInp" : "txtInp no-fill"} placeholder={placeholder} maxLength={maxLength}></textarea>
			</div>
			<div className="footer">
				<div className="detail">
					<label >{nameSigin}：<input required defaultValue={nameSiginVal} name={fieldSigin} type="text" className={nameSiginVal?"inp":"inp no-fill"} onChange={inputChange} style={{ width: "120px" }} /></label>
				</div>
				<div className="detail">
					<span>日期：</span><Calendar width={120} field={fieldDate} clickBack={setCalendarObj} selTimeValArr={dateVal} />
				</div>
			</div>
		</>)

	}


}