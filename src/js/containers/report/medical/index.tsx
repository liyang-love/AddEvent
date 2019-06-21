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

        const { passResult} = getMethods<"getParams">("getParams")();
        const inputChange = getMethods<"inputChange">("inputChange");

        let statusArr = new Array(2).fill("none"); 
        statusArr[showPage] = "block";

        return (<>

            <div className="report-content" style={{display:statusArr[0]}}>
                <table >
                    <tbody>
                        <tr>
                            <td>
                                <ReportHead  hospitalName={hospitalName} getMethods={getMethods} upOrgName={upOrgName} />
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
                                    <p className="main-tit">事件详细说明：</p>
                                    <div className="main" style={{ height: "120px" }}>
                                        <textarea name="passResult" required defaultValue={passResult} onChange={inputChange} className={passResult ?"txtInp" :"txtInp no-fill"} placeholder="填写内容（以时间为节点）..." maxLength={200}></textarea>
                                    </div>
                                </TextWithUpFile>
                            </td>
                        </tr>
                         <tr>
                            <td >
                                <TextInpWithData
                                    getMethods={getMethods}
                                    tit="处理措施"
                                    fieldDate="tmDate"
                                    fieldInp="treatmentMeasures"
                                    fieldSigin="tmSignatory"
                                    height={180}
                                    maxLength={260}
                                    nameSigin="科室管理人员"
                                />
                            </td>
                        </tr>
                        </tbody>
                </table>
            </div>

            <div className="report-content" style={{display:statusArr[1]}}>
                <table >
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <TextInpWithData
                                    getMethods={getMethods}
                                    tit="主要原因分析"
                                    fieldDate="acDate"
                                    fieldInp="analysisCauses"
                                    fieldSigin="acSignatory"
                                    height={180}
                                    maxLength={260}
                                    nameSigin="科室管理人"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <TextInpWithData
                                    getMethods={getMethods}
                                    tit="改进措施"
                                    fieldDate="caDate"
                                    fieldInp="correctiveActions"
                                    fieldSigin="caSignatory"
                                    height={180}
                                    maxLength={260}
                                    nameSigin="科室管理人"
                                />
                            </td>
                        </tr>
                        
                        <OrgDefineLevel formType={formType} txt="职能部门定级" getMethods={getMethods} />
                        <Opinion txt="医务科" />
                    </tbody>
                </table>
            </div>
        </>)



    }

}