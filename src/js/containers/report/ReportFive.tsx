import * as React from "react";


type ReportOpinionProp = {

}

type ReportOpinionState = {

}

class ReportOpinion extends React.PureComponent<ReportOpinionProp,ReportOpinionState>{


	render(){

		return (<>
							<p className="main-tit">跟踪意见：</p>
							<div className="main" style={{height: "120px"}}>
									<textarea  className="txtInp" placeholder="填写内容..." maxLength={200}></textarea>
								</div>
							<div className="footer">
								<span className="detail">	
											<label >职能科室：<input type="text"  className="inp" style={{width:"120px"}} /></label>
								</span>
								<span className="detail">	
										<span>日期：</span><span>	</span>
								</span>
							</div>
							</>
						)

	}
}



type ReportOrangeOpinionProp = {

}

type ReportOrangeOpinionState = {



}

class ReportOrangeOpinion extends React.PureComponent<ReportOrangeOpinionProp,ReportOrangeOpinionState>{


	render(){

		return (<>
							<p className="main-tit">医疗质量与安全管理委员会意见：：</p>
							<div className="main" style={{height: "120px"}}>
									<textarea  className="txtInp" placeholder="填写内容..." maxLength={200}></textarea>
								</div>
							<div className="footer">
								<span className="detail">	
											<label >质控科：<input type="text"  className="inp" style={{width:"120px"}} /></label>
								</span>
								<span className="detail">	
										<span>日期：</span><span>	</span>
								</span>
							</div>
							</>)

	}
}


export {ReportOpinion,ReportOrangeOpinion};