// import * as React from "react";
// import Opinion  from "./common/Opinion";
// import OrgDefineLevel from "./common/OrgDefineLevel"
// import ReportSecond from "./common/ReportSecond";
// import TextInpWithData from "./common/TextInpWithDate";

// type ModalProps = {
//     formType:keyof typeof config.center;
//     getMethods:ReportSpace.ReportAPI["getMethods"];
//     head:React.ReactNode;
// }

// export default class extends React.PureComponent<ModalProps>{

   

    
//     render(){

//         const {formType,getMethods,head} = this.props;
//         const data = config.center[formType];
//         const {opinionTit,defineLevTit,improveSignName} = data;
              
//         return (<>
                  
//                     <div className="report-content" >
//                         <table >
//                             <tbody>
//                                 <tr>
//                                     <td>
//                                            {head}
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td>
//                                             <ReportSecond formType={formType} getMethods={getMethods}/>
//                                     </td>
//                                 </tr>
                                
//                             </tbody>
//                         </table>
//                     </div>
							
//                     <div className="report-content" >
//                         <table >
//                             <tbody>
//                                 {improveSignName ? (<tr>
//                                     <td>
//                                         <TextInpWithData 
//                                             getMethods={getMethods}
//                                             tit="改进措施"
//                                             fieldDate="caDate"
//                                             fieldInp="correctiveActions"
//                                             fieldSigin="caSignatory"
//                                             height={180}
//                                             maxLength={260}
//                                             nameSigin={improveSignName}
//                                         />
//                                     </td>
//                                 </tr>):null}
//                                 <OrgDefineLevel  formType={formType} txt={defineLevTit!} getMethods={getMethods}/>
//                                 <Opinion  txt={opinionTit} />
//                             </tbody>
//                         </table>
//                     </div>
//                 </>)



//     }

// }

var a = 1
export default a ;