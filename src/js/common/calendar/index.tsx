import * as React from "react";
import "@css/Calendar.scss";
import {VelocityComponent} from "velocity-react";
import * as  Immutable from "immutable";
import CalendarView from "./CalendarView";


type commonInterface = Validation.commonInterface ;
type CalendarApi = Validation.CalendarApi ;

enum calendarType  {
				year = 1 ,
				searson = 2,
				month = 3 ,
				day = 4 ,
}


type calendarInpProps={
	selTimeVal:string;
	dropHandle():void;
}

type calendarInpState = {


}



class CalendarInp extends React.PureComponent<calendarInpProps,calendarInpState>{

	render(){
			const {selTimeVal,dropHandle} = this.props;

			return (
					<div className="m-clalendar-inpBox" onClick={dropHandle}>
							<span className="calendar-inp-icon"><i className="fa fa-calendar">&nbsp;</i></span>
							<input className="s-inp calendar-inpTxt" value={selTimeVal}  readOnly type="text"/>
					</div>
				)

	}
}




type calendarProps={
		rotate: commonInterface["rotate"], // 日历类型
		style?:1 | 2,
		time?:boolean, //可选择时间
		hasInp?:boolean,
		ableSwitchType?:boolean;	//能切换日历类型
		selTimeValArr?:string[];//最终显示的时间字符串
}

type calendarState = {
		expand:boolean;
		selTimeArr:Immutable.List<TypedMap<CalendarApi["curTime"]>>;
}


class Calendar extends  React.PureComponent<calendarProps,calendarState> implements CalendarApi {

	static defaultProps={
					rotate:calendarType.day,
					style:2,
					time:false,
					hasInp:true,	
					ableSwitchType:false,
					selTimeValArr:[],
	}

  curTime = this.getCurTime();

	state:calendarState={
		expand:false,
		selTimeArr:Immutable.fromJS(this.timeValToTimeObj()) 
	}

	
	changeSelTimeItme=(viewIndex:number,showTimeObj:CalendarApi["curTime"])=>{
				const {year,month,day,searson} = showTimeObj;
				const {rotate} = this.props;
				this.setState(pre=>{

							let selTimeArr = pre.selTimeArr;

							switch (rotate) {
												case calendarType.day:

																
														selTimeArr = selTimeArr.update(viewIndex,map=>{
																	return map.withMutations(node=>node.set("year",year).set("month",month).set("day",day).set("searson",Math.ceil(month / 3)))
														});	


													break;
												case calendarType.searson:{

															selTimeArr = selTimeArr.update(viewIndex,map=>{
																	return map.withMutations(node=>node.set("year",year).set("month",searson * 3 -2).set("day",day).set("searson",searson))
														 });	


													break;
												}
												case calendarType.year:{
															selTimeArr = selTimeArr.update(viewIndex,map=>{
																	return map.withMutations(node=>node.set("year",year))
														});	
													break;
												}
												case calendarType.month:{

															selTimeArr = selTimeArr.update(viewIndex,map=>{
																	return map.withMutations(node=>node.set("year",year).set("month",month).set("searson",Math.ceil(month / 3)))
														 });	
													break;
												}
												default:
														selTimeArr = selTimeArr ;
													break;
											}




					return {
						selTimeArr,
					}
				});

	}	

	getCurTime(){
		const time = new Date();
		const year = time.getFullYear();
		const month = time.getMonth()+1;
		const day = time.getDate();
		const searson = Math.ceil(month / 3);

		return {year,searson,month,day}

	}

	timeValToTimeObj(){

		const {rotate,style,selTimeValArr} = this.props;

		const defaultTimeArr = selTimeValArr;
		const curTimeArr = Array.from({length:style!},()=>Object.assign({},this.curTime)) ;
		const has_defaultTime = !!selTimeValArr![0] ;

		const setTime = (item:string)=>{

			
					const arr = item.split("-");
					const year = ~~arr[0];

					switch (rotate) {
							case calendarType.day:{
									const month = ~~arr[1];
									return {
										year,
										month,
										searson:Math.ceil(month / 3),
										day:~~arr[2]
									}
							}
							case calendarType.month:{
									const month = ~~arr[1];
									return {
										year,
										month,
										searson:Math.ceil(month / 3),
										day:1
									}
								
							}
							case calendarType.searson:{
								const searson = ~~(arr[1].substr(1));
									return {
										year,
										month:searson*3-2,
										searson,
										day:1
									}
								
							}
							case calendarType.year:{
									return {
										year,
										month:1,
										searson:1,
										day:1
									}
							}
						}
		}


		const selTimeArr = curTimeArr.map((val,index)=>{
				return !has_defaultTime ? val : setTime(defaultTimeArr![index])!
		});


		return selTimeArr ;

	
	}

	getSelTimeVal(){

		const {selTimeArr} = this.state;
		const {rotate} = this.props;

		const getStr = (val:commonInterface["showTimeObj"],rotate:number)=>{

							const year = val.get("year"),
														month = (val.get("month")+"").padStart(2,"0"),
														day = (val.get("day")+"").padStart(2,"0"),
														searson = val.get("searson");

											switch (rotate) {
												case calendarType.day:
													return year + "-" + month + "-" + day; 
												case calendarType.searson:
													return year + "-S" + searson; 
												case calendarType.year:
													return year+""; 
												case calendarType.month:
													return  year + "-" + month ;
											}
		}

		const strArr = selTimeArr.map(val=>{
			return getStr(val,rotate)!;
		});

		return strArr.join(" 至 ");
	}

	dropHandle=()=>{

			this.setState(pre=>({expand:!pre.expand}));

	}
	render(){

			const {hasInp,rotate} = this.props;
			const {expand,selTimeArr} = this.state;
rotate

selTimeArr

			return (
					<div className="g-calendar">
						{hasInp ? <CalendarInp 
													selTimeVal={this.getSelTimeVal()}
													dropHandle={this.dropHandle}
												 /> : null }
						<VelocityComponent
							animation={expand?"slideDown":"slideUp"}
						>
							<div className="g-calendar-box">
									<CalendarView
																		rotate = {rotate}
																		selTimeObj= {selTimeArr.get(0)!}
																		curTime={this.curTime}
																		changeSelTimeItme = {this.changeSelTimeItme}
																		viewIndex={0}
																	/>
															{selTimeArr.size == 2 ? <CalendarView 
																								rotate={rotate}
																								selTimeObj= {selTimeArr.get(1)!}
																								curTime={this.curTime}
																								changeSelTimeItme = {this.changeSelTimeItme}	
																								viewIndex={1}
																						/> : null }
							</div>
						
						</VelocityComponent>
					</div>

				)

	}

}

export default Calendar;
