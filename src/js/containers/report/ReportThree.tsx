import * as React from "react";


type ReportResultProp={

}

type ReportResultState={
	
}


class ReportResult extends React.PureComponent<ReportResultProp,ReportResultState>{


	render(){

			return(
						<>
							<p className="main-tit">简要事件的经过及结果：</p>
							<div className="main" style={{height: "220px" }}>
									<textarea  className="txtInp" placeholder="填写内容（以时间为节点）..." maxLength={400}></textarea>
								</div>
							<div className="footer">
								<div className="detail">	
											<label >当事人：<input type="text"  className="inp" style={{width:"120px"}}/></label>
								</div>
								<div className="detail">	
										<span>日期：</span><span  className="data">	</span>
								</div>
							</div>
						</>

				)

	}
}



type ReportMeasureProp={

}

type ReportMeasureState={
	
}


class ReportMeasure extends React.PureComponent<ReportMeasureProp,ReportMeasureState>{


	render(){

			return(
						<>
							<p className="main-tit">处理措施：</p>
							<div className="main" style={{height: "220px"}}>
									<textarea name=""  className="txtInp" placeholder="填写内容..." maxLength={400}></textarea>
								</div>
							<div className="footer">
								<div className="detail">	
											<label >护士长：<input type="text" className="inp" style={{width:"120px"}} /></label>
								</div>
								<div className="detail">	
										<span>日期：</span><span  className="data">	</span>
								</div>
							</div>
						</>

				)

	}
}


export {ReportResult,ReportMeasure}