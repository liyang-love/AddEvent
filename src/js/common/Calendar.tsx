import * as React from "react";
import "@css/Calendar.scss";
import {VelocityComponent} from "velocity-react";



type calendarInpProps={

}

type calendarInpState = {


}


class CalendarInp extends React.PureComponent<calendarInpProps,calendarInpState>{

	render(){

			return (
					<div className="m-clalendar-inpBox">
							<span className="calendar-inp-icon"><i className="fa fa-calendar">&nbsp;</i></span>
							<input className="s-inp calendar-inpTxt"  readOnly type="text"/>
					</div>
				)

	}
}

type DayViewProp={
	curTime:CalendarApi["curTime"],
	showTimeObj:calendarViewState["showTimeObj"];
	selTimeObj:calendarViewState["showTimeObj"];
};
type DayViewState={

};


class CalendarDayView extends React.PureComponent<DayViewProp,DayViewState>{

	static DayComponent:React.SFC<{
		dayNum:number;
		disabled:boolean;
		showTimeObj:calendarViewState["showTimeObj"];
		curTime:CalendarApi["curTime"],
		selTimeObj:CalendarApi["curTime"],
	}>=({dayNum,disabled,showTimeObj,selTimeObj,curTime})=>{
		
		const {year,month} = showTimeObj;

		const {year:sel_year,month:sel_mon,day:sel_day} = selTimeObj;

		const is_able = !disabled ? " view-item " :"day-disabled" ;

		const is_Today = (!disabled  && year === curTime.year && month === curTime.month && curTime.day === dayNum) && "calendar-today" || "";

		const is_sel = (!disabled &&  year === sel_year && month === sel_mon && dayNum === sel_day) && "calendar-sel" || "";

		return 	(<li className={is_able + " " + is_Today + " " + is_sel }>
								<span className="day-span">{dayNum}</span>
						</li>)
				
	}	


	getMonDays(year:number,mon:number){
		const day = new Date(year,mon,0);
		return day.getDate();
	}

	
	render(){


				const {showTimeObj,curTime,selTimeObj} = this.props;
				const {year,month} = showTimeObj;
	
				const days = this.getMonDays(year,month);

				const MonFirstDayToWeek = (new Date(year,month-1,1)).getDay(); //看当前这个月的第一天是星期几
		
				const dayArrleg= Math.ceil((days+MonFirstDayToWeek)/7); // 一共包含几个星期再内


				const daysArr = new Array(dayArrleg).fill("1").map((...args)=>{

					const [,index] = args;

					switch(index){ 

						case 0 :{  // 日历的第一行，有可能包含上个月的
						
							const preMonDays = this.getMonDays(year,month-1); //上一个月的

							const preMonDayArr = Array.from({length:MonFirstDayToWeek},(...args)=>args[1]+1).map(val=>{
									
									const day = preMonDays-MonFirstDayToWeek+val; 

									return <CalendarDayView.DayComponent 
														key={day} 
														dayNum={day}
													  disabled={true} 
													  curTime={curTime} 
													  selTimeObj={selTimeObj} 
													  showTimeObj={showTimeObj}
													  /> ;
							});
														

							const firstArr = Array.from({length:7-MonFirstDayToWeek},(...args)=>args[1]+1).map(val=>{
									return <CalendarDayView.DayComponent  
														dayNum={val} 
														key={val}
														disabled={false}
														curTime={curTime} 
													  selTimeObj={selTimeObj} 
													  showTimeObj={showTimeObj} 
													  /> ;
							});

							return (<ul className="data-group">
												{
													preMonDayArr.concat(firstArr)
												}
											</ul>)
						}
							
						case  dayArrleg-1: {//最后一排，可能包含下个月的日期
						
							 const startDayNum = 7*index+1 - MonFirstDayToWeek ;

							 const count = (days+MonFirstDayToWeek) % 7 || 7;

							const lastArr = Array.from({length:count},(...args)=>args[1]+1).map(val=>{
									const day = val + startDayNum; 
									return <CalendarDayView.DayComponent 
														 dayNum={day} 
														 disabled={false} 
													 	 curTime={curTime} 
													   selTimeObj={selTimeObj} 
													   showTimeObj={showTimeObj} 
													   key={day}
														 /> ;
							 });

							 const lastMonDays = Array.from({length:7-count},(...args)=>args[1]+1).map((val)=>{
									return <CalendarDayView.DayComponent  
														dayNum={val} 
														disabled={true} 
														curTime={curTime} 
													  selTimeObj={selTimeObj} 
													  showTimeObj={showTimeObj} 
													  key={val}
													/> ;
							 });
							

							return (<ul className="data-group">
												{
													lastArr.concat(lastMonDays)
												}
											</ul>)
							
						}
						default :{

							 const startDayNum = 7*index+1 - MonFirstDayToWeek ;
						
								const  MonDayArr = Array.from({length:7},(...args)=>args[1]+1).map((val)=>{
																const day = val + startDayNum; 
																return <CalendarDayView.DayComponent  
																					dayNum={day} 
																					key={day}
																					disabled={false} 
																					curTime={curTime} 
																				  selTimeObj={selTimeObj} 
																		 			 showTimeObj={showTimeObj} 

																					/> ;
										});

								return (<ul className="data-group">
												{
													MonDayArr
												}
											</ul>) 

						}
							
					}

				});



			//	this.time && daysArr.push(this.renderTimeBox()) ;	
				return (
						<>
							<ul className="week-group">
										<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
					 		</ul>
					 		{
					 			daysArr
					 		}

						</>
					)

	}
};






type calendarViewProps={
		rotate:calendarProps["rotate"],
		selTimeObj:CalendarApi["curTime"],
		curTime:CalendarApi["curTime"],
}

type calendarViewState = {
		showTimeObj:	CalendarApi["curTime"]
}


interface CalendarViewApi{
	

}

class CalendarView extends React.PureComponent<calendarViewProps,calendarViewState> implements CalendarViewApi {

	state:calendarViewState={
		showTimeObj:JSON.parse(JSON.stringify(this.props.selTimeObj))
	}	


	render(){
		const {curTime,selTimeObj,rotate} = this.props;
		const {showTimeObj} = this.state;

			return (
					<div className="g-calendar-view">
							<div className="m-viewOpt">
								<div className="m-timeSel">
									{
											rotate === calendarType.day ? (<div>
												<i className="fa fa-calendar"/>&nbsp;
												<span>{showTimeObj.year}年 / </span>
												<span>{showTimeObj.month}月</span>
												</div>) : rotate !== calendarType.year ?  <div><i className="fa fa-calendar"/>&nbsp;<span>{showTimeObj.year}年</span></div> :null 
									}
								</div>
								<div className="m-moveBtns">
									<span ><i className="fa fa-backward" /></span>
									<span ><i className="fa fa-forward" /></span>
								</div>
							</div>
							<div className="m-calendar-view">
								<CalendarDayView
									curTime={curTime} 
								  selTimeObj={selTimeObj} 
								  showTimeObj={showTimeObj} 

								 />
							</div>
					</div>
				)
		}

}


enum calendarType  {
		year = 1 ,
		searson = 2,
		month = 3 ,
		day = 4 ,
};


type calendarProps={
		rotate: 1 | 2 |3 |4 , // 日历类型
		style?:1 | 2,
		time?:boolean, //可选择时间
		hasInp?:boolean,
		ableSwitchType?:boolean;	//能切换日历类型
		selTimeVal?:string;//最终显示的时间字符串
}

type calendarState = {
		expand:boolean;
		selTimeArr:CalendarApi["curTime"][];
}

interface CalendarApi {
	curTime:{
						year:number;
						searson:number;
						month:number;
						day:number;
					};
}


class Calendar extends  React.PureComponent<calendarProps,calendarState> implements CalendarApi {

	static defaultProps={
					rotate:calendarType.day,
					style:1,
					time:false,
					hasInp:true,	
					ableSwitchType:false,
					selTimeVal:"",
	}

  curTime = this.getCurTime();

	state:calendarState={
		expand:true,
		selTimeArr:this.timeValToTimeObj()
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

		const {rotate,style,selTimeVal} = this.props;

		const defaultTimeArr = selTimeVal!.split("至");
		const curTimeArr = Array.from({length:style!},()=>Object.assign({},this.curTime)) ;
		const has_defaultTime = !!selTimeVal ;

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
				return !has_defaultTime ? val : setTime(defaultTimeArr[index])!
		});


		return selTimeArr ;

	
	}
	render(){

			const {hasInp,style,rotate} = this.props;

			const {expand,selTimeArr} = this.state;

			return (
					<div className="g-calendar">
						{hasInp ? <CalendarInp /> : null }
						<VelocityComponent
							animation={expand?"slideDown":"slideUp"}
						>
							<div className="g-calendar-box">
									<CalendarView
								rotate = {rotate}
								selTimeObj= {selTimeArr[0]}
								curTime={this.curTime}
							/>
							{style == 2 ? <CalendarView 
																rotate={rotate}
																selTimeObj= {selTimeArr[1]}
																curTime={this.curTime}

														/> : null }
							</div>
						
						</VelocityComponent>
					</div>

				)

	}


}

export default Calendar ;