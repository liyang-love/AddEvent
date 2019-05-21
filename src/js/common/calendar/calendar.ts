 namespace Validation {
    export interface StringValidator {
        name:string;
    }

   

	 export interface commonInterface {
			rotate: 1 | 2 |3 |4 , // 日历类型
			curTime:{
							year:number;
							searson:number;
							month:number;
							day:number;
						};	
			showTimeObj:TypedMap<commonInterface["curTime"]>
	}


export	interface CalendarApi {
		curTime:commonInterface["curTime"];
		changeSelTimeItme(viewIndex:number,showTimeObj:CalendarApi["curTime"]):void;

	}

export interface CalendarViewApi{
	

}

}