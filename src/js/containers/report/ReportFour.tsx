import * as React from "react";


type ReportSeasonProp = {

}

type ReportSeasonState = {

}

class ReportSeason extends React.PureComponent<ReportSeasonProp,ReportSeasonState>{


	render(){

		return (<>
							<p className="main-tit">原因分析：</p>
							<div className="main" style={{height: "190px"}}>
									<textarea  className="txtInp" placeholder="填写内容..." maxLength={340}></textarea>
								</div>
							<div className="footer">
								<div className="detail">	
											<label >护士长：<input type="text"  className="inp" style={{width:"120px"}} /></label>
								</div>
								<div className="detail">	
										<span>日期：</span><div  className="data">	</div>
								</div>
							</div>
							</>
						)

	}
}



type ReportImproveMeasureProp = {

}

type ReportImproveMeasureState = {



}

class ReportImproveMeasure extends React.PureComponent<ReportImproveMeasureProp,ReportImproveMeasureState>{


	render(){

		return (<>
							<p className="main-tit">改进措施：</p>
							<div className="main" style={{height: "160px"}}>
									<textarea name=""  className="txtInp" placeholder="填写内容..." maxLength={280}></textarea>
								</div>
							<div className="footer">
								<div className="detail">	
											<label >护士长：<input type="text"  className="inp" style={{width:"120px"}} /></label>
								</div>
								<div className="detail">	
										<span>日期：</span><div  className="data">	</div>
								</div>
							</div>
							</>)

	}
}


export {ReportSeason,ReportImproveMeasure};