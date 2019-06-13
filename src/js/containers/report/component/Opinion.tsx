import * as React from "react";
import config from "../config";

type opinionProps={
    formType:string;
    hospitalName:"center"|"three";
}


export default class Opinion extends React.PureComponent<opinionProps>{



    render(){
        const {formType,hospitalName} = this.props;

        const data = (config as any)[hospitalName][formType];

        return (

            <>
                <tr>
                    <td >
                        <p className="main-tit">跟踪意见：</p>
							<div className="main" style={{height: "120px"}}>
								
								</div>
							<div className="footer">
								<span className="detail">	
											<label >{data.opinionTit}：</label>
											<span className="underline" style={{width: "80px"}}></span>
								</span>
								<span className="detail" >	
										<span>日期：</span><span className="underline" style={{width: "80px"}}></span>
								</span>
							</div>
                    </td>
                </tr>
                <tr>
                    <td >
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