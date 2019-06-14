import * as React from "react";

type opinionProps={
    txt:string
}


export default class Opinion extends React.PureComponent<opinionProps>{



    render(){

        const {txt} = this.props;

        return (

            <>
                <tr>
                    <td colSpan={2}>
                        <p className="main-tit">跟踪意见：</p>
							<div className="main" style={{height: "120px"}}>
								
								</div>
							<div className="footer">
								<span className="detail">	
											<label >{txt}：</label>
											<span className="underline" style={{width: "80px"}}></span>
								</span>
								<span className="detail" >	
										<span>日期：</span><span className="underline" style={{width: "80px"}}></span>
								</span>
							</div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <p className="main-tit">医疗质量与安全管理委员会意见：</p>
							<div className="main" style={{height: "120px"}}>
									
                            </div>
							<div className="footer">
								<span className="detail">	
                                    <label >质控科：</label>
                                    <span className="underline" style={{width: "80px"}}></span>
								</span>
								<span className="detail" >	
                                    <span>日期：</span><span className="underline" style={{width: "80px"}}></span>
								</span>
							</div>
                    </td>
                </tr>
            </>
        )
    }
}