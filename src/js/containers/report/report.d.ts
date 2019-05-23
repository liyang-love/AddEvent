 declare namespace  ReportSpace{


	export interface getMethods {
			(mthodName:"inputChange" | "setCalendarObj" | "setComboboxObj"):any;
	}


	export  class Common {
			inputChange(e:React.ChangeEvent<HTMLInputElement>):void;
	}



}