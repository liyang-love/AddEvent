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

        const { pass, result ,machine,man,object,ring,law} = getMethods<"getParams">("getParams")();
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
                                    <p className="main-tit">事件经过及处理结果描述：</p>
                                    <p className="main-tit-2">事件的经过：</p>
                                    <div className="main" style={{ height: "120px" }}>
                                        <textarea name="pass" required defaultValue={pass} onChange={inputChange} className={pass ?"txtInp" :"txtInp no-fill"} placeholder="填写内容（以时间为节点）..." maxLength={200}></textarea>
                                    </div>
                                    <p className="main-tit-2">事件的结果：</p>
                                    <div className="main" style={{ height: "120px" }}>
                                        <textarea name="result" required defaultValue={result} onChange={inputChange} className={result?"txtInp" :"txtInp no-fill"} placeholder="填写内容（以时间为节点）..." maxLength={200}></textarea>
                                    </div>
                                </TextWithUpFile>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <p className="main-tit">主要原因分析：</p>
                                <div className="reportSeason-txtItem">
                                    <span>人：</span>
                                    <textarea
                                       className={man?"txtInp" :"txtInp no-fill"}
                                        placeholder="填写内容..."
                                        maxLength={100}
                                        onChange={inputChange}
                                        defaultValue={man}
                                        name="man"
                                        required
                                    />
                                </div>
                                <div className="reportSeason-txtItem">
                                    <span>机：</span>
                                    <textarea
                                       className={machine?"txtInp" :"txtInp no-fill"}
                                        placeholder="填写内容..."
                                        maxLength={100}
                                        onChange={inputChange}
                                        defaultValue={machine}
                                        name="machine"
                                        required
                                    />
                                </div>
                                <div className="reportSeason-txtItem">
                                    <span>物：</span>
                                    <textarea
                                        placeholder="填写内容..."
                                        className={object?"txtInp" :"txtInp no-fill"}
                                        maxLength={100}
                                        onChange={inputChange}
                                        defaultValue={object}
                                        name="object"
                                        required
                                    />
                                </div>
                                <div className="reportSeason-txtItem">
                                    <span>法：</span>
                                    <textarea
                                        placeholder="填写内容..."
                                        className={law?"txtInp" :"txtInp no-fill"}
                                        maxLength={100}
                                        onChange={inputChange}
                                        defaultValue={law}
                                        name="law"
                                        required
                                    />
                                </div>
                                <div className="reportSeason-txtItem">
                                    <span>环：</span>
                                    <textarea
                                        placeholder="填写内容..."
                                        className={ring?"txtInp" :"txtInp no-fill"}
                                        maxLength={100}
                                        onChange={inputChange}
                                        defaultValue={ring}
                                        name="ring"
                                        required
                                    />
                                </div>
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
                                    tit="改进措施"
                                    fieldDate="caDate"
                                    fieldInp="correctiveActions"
                                    fieldSigin="caSignatory"
                                    height={180}
                                    maxLength={260}
                                    nameSigin="护士长"
                                />
                            </td>
                        </tr>
                        <OrgDefineLevel formType={formType} txt="护理安全管理小组定级" getMethods={getMethods} />
                        <Opinion txt="护理部" />
                    </tbody>
                </table>
            </div>
        </>)



    }

}