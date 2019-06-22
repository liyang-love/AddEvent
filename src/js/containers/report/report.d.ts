declare namespace ReportSpace {

	export type infectionUniqueFile = {
		skin: string[];//皮肤暴露
		SharpWeapon: string[];//利器利器伤
		mucosal: string[];//黏膜暴露
		flushingTime: string;//冲洗时间
		flushingTimeTxt: string;//备注
		HBV: string;//HBV
		fiveCase: string;//乙肝五项情况 
		HBV_DNA: string;
		HBV_RNA: string;
		treponema: string;//梅毒螺旋体抗体 
		hiVAntibody: string;//HIV抗体 
		otherIll: string;//其他传染病 
		vaccine: string;//是否接种过乙型肝炎疫苗
		vaccineReaction: string;//疫苗反应
		vaccineTime: string;//接种时间 
		createAntibody: string;//是否产生抗体
		antibodyTiter: string;//抗体滴度(mIU/ml)
		antibodyLastTime: string;//最后一次复查抗体时间
		training: string;//是否接受职业暴露培训
		trainingPlace: string;//培训地点 
		HBVTxt: string;//接触HBV后的预防措施
		fiveCase1: string;
		HBV_DNA1: string;
		HBV_RNA1: string;
		treponema1: string;
		hiVAntibody1: string;
		HCV: string;//抗-HCV
	}

	export interface ReportProps {
		formType: string;
		showPage: number;
		getMethods: ReportAPI["getMethods"];
		upOrgName: string;
		hospitalName: hospitalName;
		infection?: infectionUniqueFile
	}
	type item = {
		id: string | number;
		text: string;
	}
	export interface HeadWrapProp {
		getMethods: ReportAPI["getMethods"];
		upOrgName: string;
		hospitalName: hospitalName;
		uniqueFile?: infectionUniqueFile
	}
	export interface HeadHQ {
		arrConfig: { profession: item[], medicalTypeArr: item[], topClass: item[], orgArr: any, happenScene: any, happenSceneSon: any };
		anonymity: boolean;
		reportDateType: string;
		changeReportDayType(selTimeArr: Readonly<any[]>, field: string): void;
		changeAnonymity(): void;
		changeHappenceSon(slecteArr: Readonly<any[]>, filed: string, node: any): void;
	}

	export type methodName = "inputChange" | "setCalendarObj" | "setComboboxObj" | "getParams" | "upFileHandle" | "changeDateType" | "inputChangeUniqueFile" | "checkboxGroupChange";
	export type hospitalName = "三院" | "中医院";
	export interface params {
		id?: string;//事件id
		upOrgId: string; //科室
		patientOrgId: string;//患者所在科室
		bedNumber: string;//床号
		patientName: string;//姓名
		sex: string;
		age: string;
		admissionTime: string; //入院时间
		medicalRecordNumber: string;// 病历号
		primaryDiagnosis: string;//主要诊断
		rsaFall: string;//跌倒(相关风险评估)
		rsaPressureSore: string;//压疮(相关风险评估)
		rsaCareAbility: string;//自理能力(相关风险评估)
		rsaNonPlanned: string;//非计划拔管(相关风险评估)
		rsaOther: string;//其他(相关风险评估)
		currentPeople: string;//当事人
		cpProfession: string;//职称(当事人)
		cpTopClass: string;//层级(当事人)
		happenTime: string;//发生时间(当事人)
		discoverer: string;//发现人
		dProfession: string;//职称(发现人)
		dTopClass: string;//层级(发现人)
		discoveryTime: string;//发现时间(发现人)
		reporter: string;//报告人
		rProfession: string;//报告人(职称)
		rTopClass: string;//层级(报告人)
		reportTime: string;//报告时间
		incidentSceneId: string;//事发场景
		dadIncidentSceneId: string;//事发场景父级id
		dateType: string;//日期类型
		reporterNumber: string;//上报科室人手机号
		medicalType: string;//医疗类型 
		//incidentTime: string;//事发时段
		workYear: string;//工作年资
		orgWorkYear: string;//该科室工作年资
		beforeAccident: string;//事发前病人状态
		patientNumber: string;//病人手机号
		weight: string;//体重
		liveDoorNumber: string;//住院号/门诊号
		birthDate: string;//出生日期
		anamnesis: string;//既往病史
		productName: string;//产品名称
		registerNo: string;//注册证编号
		modelNumber: string;//型号
		standard: string;//规格
		batchNumber: string;//产品批号
		udi: string;//UDI
		manufactureDate: string;//生产日期
		effectiveDate: string;//有效日期
		productCode: string;//产品编码
		instrumentDate: string;//器械使用日期
		qxReasonDescribe: string;//事件原因分析描述
		qxAnalyseReason: string;//事件原因分析
		hurtRank: string;//伤害等级
		hurtPerform: string;//伤害表现
		kindEquipment: string;//何种器材
		degreeRisk: string;//程度和危险度;
		pollutantSource: string;//污染物来源
		relateHandle: string;//事件相关处理
		categoryId: string;//事件类别
		dadCategoryId: string; //事件类别父id
		job: string;//涉事人职务  
		cpOrgId: string;//涉事人所在科室

		passResult: string;//简要事情的经过及结果
		pass: string;//事件经过
		result: string;//处理结果
		psSignatory: string;//当事人(简要事件的经过及结果)
		psDate: string;//日期(简要事件的经过及结果)
		treatmentMeasures: string;//处理措施
		tmSignatory: string;//签字人(处理措施)
		tmDate: string;//日期(处理措施)
		analysisCauses: string;//原因分析
		acSignatory: string;//签字人(原因分析)
		acDate: string;//日期(原因分析)
		correctiveActions: string;//改进措施
		caSignatory: string;//签字人(改进措施)
		caDate: string;//日期(改进措施)
		diseaseEffect: string;//对原患者疾病的影响
		analyseImpove: string;//分析与改进
		orgRank: string;//科室定级

		functionOrgRank: string;//职能科室定级
		property: string;//不良事件性质界定：风险注册、系统错误、个人错误
		propertyContent: string;//界定说明
		frequency: string;//不良事件频率界定
		frequencyContent: string;//界定说明
		allotStatus: string;//分配的状态
		badEventResult: string;//不良事件的结果
		berSignatory: string;//不良事件的结果签字人名字
		berDate: string;//不良事件的结果日期

		man: string;//人(主要原因分析)
		machine: string;//机(主要原因分析)
		object: string;//物(主要原因分析)
		law: string;//法(主要原因分析)
		ring: string;//环(主要原因分析
		deleteSaveCommit: "-1" | "0" | "1" | "2";// 删除或保存或提交:-1 删除 0保存,1提交  2 事件关闭 
		formType: string;//表单类型
		damageDegree: string;//造成病人的损害程度
		admissionNumber: string,//住院号
		similarIncidentOne: string;//发生过类似的事件
		similarIncidentTwo: string;//发生过类似的事件2
		modifyStatus: string;//修改状态
		uniqueFile: string;// 院感独有的文件 ，用Json格式的字符串

		// viewReminder :string;//查看提醒
		// limitTime :string;//时间限制 多少天必须完成

	}


	export interface ReportAPI {
		getMethods<k extends methodName>(mthodName: methodName): ReportAPI[k];
		inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void;
		inputChangeUniqueFile(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void;
		checkboxGroupChange(e: React.ChangeEvent<HTMLInputElement>): void;
		setCalendarObj(setTimeArr: Readonly<any[]>, field: string): void;
		setComboboxObj(selArr: Readonly<any[]>, field: string): void;
		changeDateType(id: string): void;
		getParams(): params;
		upFileHandle(file: FileList): void;
	}



}