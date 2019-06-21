
import * as React from "react";
import Opinion from "../common/Opinion";
import OrgDefineLevel from "../common/OrgDefineLevel"
import ReportSecond from "../common/ReportSecond";
import ReportHead from "./Head";
import TextWithUpFile from "../common/TextWithUpFile";
import TextInpWithData from "../common/TextInpWithDate";
import Combobox from "@js/common/combobox/index";
import {influenceArray} from "../config";


export default class extends React.PureComponent<ReportSpace.ReportProps>{


    render() {

        const { formType, getMethods, hospitalName, upOrgName ,showPage} = this.props;

        const {pass,result,relateHandle,analyseImpove,diseaseEffect} = getMethods<"getParams">("getParams")();
        const inputChange = getMethods<"inputChange">("inputChange");
		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

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
                                     <p className="main-tit-2">1、事件经过：</p>
                                    <div className="main" style={{ height: "120px" }}>
                                        <textarea name="pass" required defaultValue={pass} onChange={inputChange} className={pass ?"txtInp" :"txtInp no-fill"} placeholder="" maxLength={200}></textarea>
                                    </div>
                                    <p className="main-tit-2">2、事件相关处理：</p>
                                    <div className="main" style={{ height: "120px" }}>
                                        <textarea name="relateHandle" required defaultValue={relateHandle} onChange={inputChange} className={relateHandle?"txtInp" :"txtInp no-fill"} placeholder="" maxLength={200}></textarea>
                                    </div>
                                    <p className="main-tit-2">3、处理结果：</p>
                                    <div className="main" style={{ height: "120px" }}>
                                        <textarea name="result" required defaultValue={result} onChange={inputChange} className={result?"txtInp" :"txtInp no-fill"} placeholder="" maxLength={200}></textarea>
                                    </div>
                                </TextWithUpFile>
                            </td>
                        </tr>
                         <tr>
                            <td >
                                <div>
                                    <div style={{display: "inline-flex", alignItems: "center"}}>
                                         <span className="main-tit">对原患者的影响：</span>
                                         <Combobox 
                                            data={influenceArray}
                                            field="diseaseEffect"
                                            width={300}
                                            dirctionUp={true}
                                            defaultVal={diseaseEffect}
                                            clickCallback={setComboboxObj}
       
                                            
                                         />
                                    </div>
                                    <p className="main-tit">分析与改进：</p>
                                    <div className="main" style={{ height: "120px" }}>
                                        <textarea name="analyseImpove" required defaultValue={analyseImpove} onChange={inputChange} className={analyseImpove?"txtInp" :"txtInp no-fill"} maxLength={200}></textarea>
                                    </div>
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
                                    tit="不良事件的结果"
                                    fieldDate="berDate"
                                    fieldInp="badEventResult"
                                    fieldSigin="berSignatory"
                                    height={180}
                                    maxLength={260}
                                    nameSigin="科室管理人"
                                />
                            </td>
                        </tr>
                        
                        <OrgDefineLevel formType={formType} txt="职能科室定级" getMethods={getMethods} />
                        <Opinion txt="药学部" />
                    </tbody>
                </table>
            </div>
        </>)



    }

}