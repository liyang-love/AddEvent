import * as React from "react";


//简要事件的经过及结果
type fileProps = {
    upFile:ReportSpace.ReportAPI["upFileHandle"]

}

type fileState = {
	fileName: string;
}



export default class extends React.PureComponent<fileProps,fileState>{

    state = {
		fileName: ""
	}

	upFile = (e: React.ChangeEvent<HTMLInputElement>) => {

		const file = e.currentTarget.files!;
		let nameArr = Array.from(file).map(val => val.name);

		this.setState({
			fileName: nameArr.join(" ，")
		});

		this.props.upFile(file);

	}
	render() {
		const { fileName } = this.state;
        const {children} = this.props;

		return (
			<>

                {children}
				<p className="input-file-m">
					<span >附加材料：</span>
					<span >{fileName}</span>
					<input type="file" multiple onChange={this.upFile} />
				</p>
			</>

		)

	}
}