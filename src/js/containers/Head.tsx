import * as React from "react";



class Head extends React.Component{



	

	render(){

		
		return (<div className="g-head">

							<span className="m-theme">医疗安全（不良）事件上报管理</span>
							<div className="g-sys_set">
								<div>
										<p>消息</p>
								</div>
								<div>
									<p>切换角色</p>
								</div>
								<div className="g-user-opt" >
									<div style={{padding:"20px 10px",}}>
										<span className="fa fa-user">&nbsp;&nbsp;</span>
										<span>demo</span>
									</div>
									<ul className="m-sysOpt">
											<li>
												<span className="fa fa-power-off ">&nbsp;&nbsp;</span>
												<span>推出系统</span>
											</li>
									</ul>
								</div>
							</div>
						</div>
						); 


	}



};

export default Head ;