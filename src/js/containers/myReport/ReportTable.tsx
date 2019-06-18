import * as React from "react";
import Table from "@js/common/table/Table";
import {Button} from "@js/common/Button";
import {NavLink} from "react-router-dom";

type tableItem = {
	eventNumber: string;
	id: string;
	orgName: string;
	defineName: string;
	categoryName: string;
	allotStatus: string;
	modifyStatus:string;
	happenTime: string;
	reportTime: string;
	reporter: string;
	orgWithdrawStatus: string; 
}



type tableWrapProps={
    data:tableItem[];
}
type tableWrapState={


}



class TableWrap extends React.PureComponent<tableWrapProps ,tableWrapState>{

   
     column =   [
        {
            text: "事件编号",
            field: "eventNumber",
        },
        {
            text: "事件类型",
            field: "categoryName",
        },
        {
            text: "严重程度",
            field: "defineName",
        },
        {
            text: "发生日期",
            field: "happenTime",
        },
        {
            text: "上报日期",
            field: "reportTime",
        },
        {
            text: "上报人",
            field: "reporter",
        },
        {
            text: "处理状态", 
            field: "allotStatus",
            formatter:function(node:any){

                // 主任角色可选筛选值 3：5：；6： 医生角色可选筛选值：1:，2：，4：
                const status = node.status;
                const name = status == 1 || status == 3 ? "m-translate-warn" : (status == 2 || status== 5 ?"m-translate-green":"m-translate-error");
                return <span className={name}>{node.allotStatus}</span>; 

            }
        },
        {
            text: "操作",
            field: "opt",
            width: 180,
            formatter: (node:any)=>{

                const pathObj = {
                    pathname:"/",
                    state:{
                        id:node.id,
                        formType:node.formType
                    }
                }
                return (<div className="g-btn-layout">
                        <NavLink to={pathObj} ><button className="s-btn normal-btn primary" >修改</button></NavLink>
                        &nbsp;
                        <Button type="danger" field={node.id}  handle={this.delItem}>删除</Button>
                        <Button type="green" field={node.id}  handle={this.delItem}>详情</Button>
                        </div>
                        )
            }
        }
    ];

    delItem(e:React.MouseEvent<HTMLButtonElement>){

        const id = e.currentTarget!.name;

        console.log(id);

    }
    render(){
        const {data} = this.props;
        return(
                <Table 
                    column={this.column}
                    data={data}
                    checkbox={true}
                
                />
        )
    }



}



export default TableWrap ;




