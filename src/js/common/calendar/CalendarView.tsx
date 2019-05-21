import * as React from "react";
import CalendarDayView from "./CalendarDayView";

enum calendarType  {
				year = 1 ,
				searson = 2,
				month = 3 ,
				day = 4 ,
		}

type commonInterface = Validation.commonInterface ;
type CalendarApi = Validation.CalendarApi ;
type CalendarViewApi = Validation.CalendarViewApi;


type calendarViewProps={
		rotate:commonInterface["rotate"];
		selTimeObj:commonInterface["showTimeObj"];
		curTime:commonInterface["curTime"];
		changeSelTimeItme:CalendarApi["changeSelTimeItme"];
		viewIndex:0 | 1;
}

type calendarViewState = {
		showTimeObj:	calendarViewProps["selTimeObj"];
}






export default class CalendarView extends React.PureComponent<calendarViewProps,calendarViewState> implements CalendarViewApi {

	state:calendarViewState={
		showTimeObj:this.props.selTimeObj,
	}	

	updateYears(movePre:"next"|"back"){

		console.log(movePre);

		/*const yearRange = movePre === "back" ? this.lastYear-10 : this.lastYear + 1; 

		const str = this.renderYear(yearRange).join("");
		this.calendarItems.eq(0).html(str);*/
	}

	clickSelHandle=(e:React.MouseEvent<HTMLSpanElement>)=>{

			const dataset =  e.currentTarget.dataset;
			const type = dataset.sign as "day" | "year" | "month" | "searson";
			const num = ~~(dataset.num!);
			const {viewIndex,changeSelTimeItme} = this.props;

			const flag = {[type]:num};
			
			this.setState(pre=>{
				return {
					showTimeObj:pre.showTimeObj.set(type,num)
				}
			});

			const _showTimeobj = Object.assign({},this.state.showTimeObj.toJS(),flag)

			changeSelTimeItme(viewIndex,_showTimeobj);


	}

	updateDaysView(movePre:"next"|"back"){

		const {showTimeObj}= this.state;

		const year= showTimeObj.get("year"),
					month=showTimeObj.get("month");
		
		let updata_mon = 1, updata_year = 1;

		switch(movePre){
			case "back":
				updata_mon = month -1 == 0 ? 12 : month-1;
				updata_year = month -1 == 0 ? year - 1  : year;
				break;
			case "next":
				updata_mon = month + 1 == 13 ?  1 : month +1;
				updata_year = month + 1 == 13 ? year +1   : year ;
				break;
		}

		this.setState({
			showTimeObj:showTimeObj.withMutations(map=>map.set("year",updata_year).set("month",updata_mon).set("searson",Math.ceil(month / 3))),
		});
	}

	controlBtnHandle=(e:React.MouseEvent<HTMLSpanElement>)=>{

		const type = (e.currentTarget.dataset.sign) as any;
		const {rotate} = this.props;

  	rotate=== calendarType.day ? 	this.updateDaysView(type) : this.updateYears(type) ;

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
												<span>{showTimeObj.get("year")}年 / </span>
												<span>{showTimeObj.get("month")}月</span>
												</div>) : rotate !== calendarType.year ?  <div><i className="fa fa-calendar"/>&nbsp;<span>{showTimeObj.get("year")}年</span></div> :null 
									}
								</div>
								<div className="m-moveBtns">
									<button className="s-btn" onClick={this.controlBtnHandle} data-sign="back"><i className="fa fa-backward" /></button>
									<button  className="s-btn" onClick={this.controlBtnHandle} data-sign="next"><i className="fa fa-forward" /></button>
								</div>
							</div>
							<div className="m-calendar-view">
								<CalendarDayView
									curTime={curTime} 
								  selTimeObj={selTimeObj} 
								  showTimeObj={showTimeObj} 
								  clickSelHandle={this.clickSelHandle}
								 />
							</div>
					</div>
				)
		}

}

