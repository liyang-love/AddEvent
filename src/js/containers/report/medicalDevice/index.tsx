import * as React from "react";
import Opinion from "../common/Opinion";
import OrgDefineLevel from "../common/OrgDefineLevel"
import ReportSecond from "../common/ReportSecond";
import ReportHead from "./Head";
import TextWithUpFile from "../common/TextWithUpFile";
import TextInpWithData from "../common/TextInpWithDate";



export default class extends React.PureComponent<ReportSpace.ReportProps>{


    render() {

        const { formType, getMethods, hospitalName, upOrgName ,showPage} = this.props;

        const { passResult,analysisCauses } = getMethods<"getParams">("getParams")();
        const inputChange = getMethods<"inputChange">("inputChange");

        let statusArr = new Array(2).fill("none"); 
        statusArr[showPage] = "block";

        return (<>

            <div className="report-content" style={{display:statusArr[0]}}>
                <table >
                    <tbody>
                        <tr>
                            <td>
                                <ReportHead formType={formType} hospitalName={hospitalName} getMethods={getMethods} upOrgName={upOrgName} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ReportSecond formType={formType} getMethods={getMethods} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextWithUpFile
                                    upFile={getMethods<"upFileHandle">("upFileHandle")}
                                >
                                    <p className="main-tit">器械耗材使用预期治疗疾病或作用：</p>
                                    <div className="main" style={{ height: "120px" }}>
                                        <textarea name="passResult" required defaultValue={passResult} onChange={inputChange} className={passResult ?"txtInp" :"txtInp no-fill"} placeholder="填写内容（以时间为节点）..." maxLength={200}></textarea>
                                    </div>
                                </TextWithUpFile>
                            </td>
                        </tr>
                         <tr>
                            <td >
                               <p className="main-tit">原因分析(器械耗材使用过程描述 事件发生经过)：</p>
                                <div className="main" style={{ height: "120px" }}>
                                    <textarea name="analysisCauses " required defaultValue={analysisCauses } onChange={inputChange} className={analysisCauses  ? "txtInp" : "txtInp no-fill"} placeholder="至少包括器械使用时间、使用目的、使用依据、使用情况、出现的不良事件情况、对受害者影响、采取的治疗措施" maxLength={200}></textarea>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                </table>
            </div>
{/* todo:字段没有 */}
            <div className="report-content" style={{display:statusArr[1]}}>
                <table >
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                 <p className="main-tit">原因分析(器械耗材使用过程描述 事件发生经过)：</p>
                                <div className="main" style={{ height: "120px" }}>
                                    <textarea name="analysisCauses " required defaultValue={analysisCauses } onChange={inputChange} className={analysisCauses  ? "txtInp" : "txtInp no-fill"} placeholder="至少包括器械使用时间、使用目的、使用依据、使用情况、出现的不良事件情况、对受害者影响、采取的治疗措施" maxLength={200}></textarea>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <TextInpWithData
                                    getMethods={getMethods}
                                    tit="初步处置情况"
                                    fieldDate="caDate"
                                    fieldInp="correctiveActions"
                                    fieldSigin="caSignatory"
                                    placeholder="描述不良事件发生后处理情况，包括对医疗器械的处置和受害者、涉及操作员的处置"
                                    height={180}
                                    maxLength={260}
                                    nameSigin="科室管理人"
                                />
                            </td>
                        </tr>
                        
                        <OrgDefineLevel formType={formType} txt="职能部门定级" getMethods={getMethods} />
                        <Opinion txt="设备科" />
                    </tbody>
                </table>
            </div>
        </>)



    }

}