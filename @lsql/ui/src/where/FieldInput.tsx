import { PropertyType, UIFieldValue } from "@lsql/core";
import React from "react";
import { base64 } from "rfc4648";
import { ClassDefs } from "./classdefs";
import { indexString } from "./indices";

interface InputProps {
	data: UIFieldValue
	elementIndex: number[];
	update(newValue: UIFieldValue): void;
}

// InputState is necessary to cleanly handle temporary invalid states
interface InputState {
	raw: string;
	valid: boolean;
	ref: React.RefObject<HTMLInputElement>;
}

export class FieldInput extends React.Component<InputProps, InputState> {
	constructor(props: InputProps) {
		super(props);
		let ref = React.createRef<HTMLInputElement>();
		this.state = {
			raw: this.valueToString(),
			valid: true,
			ref: ref
		};
	}
	render() {
		let pattern: string | undefined = undefined;
		let title: string | undefined = undefined;
		switch (this.props.data.type) {
			case PropertyType.BOOL:
				return <select
					value={`${this.props.data.value}`}
					className={ClassDefs.fieldText}
					onChange={e => this.props.update({ type: PropertyType.BOOL, value: e.target.value === `${true}` })}
				>
					<option key={`lsql-field-value-${indexString(this.props.elementIndex)}-true`} value={`${true}`}>TRUE</option>
					<option key={`lsql-field-value-${indexString(this.props.elementIndex)}-false`} value={`${false}`}>FALSE</option>
				</select>;
			case PropertyType.BYTES:
				pattern = "[a-zA-Z0-9/+=]*";
				title = "Base 64 (standard encoding)";
				break;
			case PropertyType.DOUBLE:
				pattern = "-{0,1}[0-9]*(\\.[0-9]*){0,1}-{0,1}";
				title = "Number (negatives and decimals allowed)";
				break;
			case PropertyType.INT64:
				pattern = "-{0,1}[0-9]+-{0,1}";
				title = "Integer (negatives allowed)";
				break;
			case PropertyType.UINT64:
				pattern = "[0-9]+";
				title = "Positive Integer";
				break;
			case PropertyType.STRING:
				pattern = ".*";
				title = "String";
				break;
		}
		let input = <input
			ref={this.state.ref}
			className={ClassDefs.fieldText + (this.state.valid ? "" : ` ${ClassDefs.fieldTextInvalid}`)}
			value={this.state.valid ? this.valueToString() : this.state.raw}
			type={this.props.data.type === PropertyType.TIME ? "datetime-local" : "text"}
			pattern={pattern}
			title={title}
			onChange={e => this.setState({
				raw: e.target.value
			})}
		/>;
		return input;
	}
	componentDidUpdate(prevProps: InputProps, prevState: InputState) {
		// When props update, reset internal state
		if (this.props.data.value !== prevProps.data.value) {
			this.setState({
				raw: this.valueToString(),
				valid: true
			});
		}
		// When internal state updates, try to parse and bubble an update
		if (this.state.raw !== prevState.raw) {
			this.updateInputValue(this.state.raw);
		}
	}
	valueToString(): string {
		switch (this.props.data.type) {
			case PropertyType.BOOL:
				return "";
			case PropertyType.BYTES:
				return base64.stringify(this.props.data.value);
			case PropertyType.TIME:
				let minutesOffset = this.props.data.value.getTimezoneOffset();
				let newTime = new Date(this.props.data.value.getTime() - (minutesOffset * 60 * 1000));
				let isoString = newTime.toISOString();
				return isoString.replace("Z", "");
			case PropertyType.STRING:
				return this.props.data.value;
			case PropertyType.DOUBLE:
			case PropertyType.INT64:
			case PropertyType.UINT64:
			default:
				return this.props.data.value.toString();
		}
	}
	updateInputValue(newValRaw: string) {
		if (!this.state.ref.current?.checkValidity()) {
			this.state.ref.current?.reportValidity();
			this.setState({
				valid: false,
			});
			return;
		}
		try {
			let newData: UIFieldValue = { ...this.props.data };
			let newValid = false;
			let polarity = 1;
			if (newValRaw.length > 1 && newValRaw[newValRaw.length - 1] === "-") {
				newValRaw = newValRaw.slice(0, newValRaw.length - 1);
				polarity = -1;
			}
			switch (newData.type) {
				case PropertyType.BYTES:
					newData.value = base64.parse(newValRaw, {
						loose: true
					});
					newValid = true;
					break;
				case PropertyType.DOUBLE:
					if (newValRaw === "" || newValRaw === "-" || newValRaw === ".") {
						newData.value = 0;
						break;
					}
					let newFloat = parseFloat(newValRaw);
					if (!isNaN(newFloat)) {
						newData.value = newFloat * polarity;
						newValid = true;
					}
					break;
				case PropertyType.INT64:
				case PropertyType.UINT64:
					if (newValRaw === "" || newValRaw === "-" || newValRaw === ".") {
						newData.value = 0;
						break;
					}
					let newInt = parseInt(newValRaw);
					if (!isNaN(newInt)) {
						newData.value = newInt * polarity;
						newValid = true;
					}
					break;
				case PropertyType.STRING:
					newData.value = newValRaw;
					newValid = true;
					break;
				case PropertyType.TIME:
					let isoDate = new Date(newValRaw + "Z");
					let offsetMinutes = new Date().getTimezoneOffset();
					let localTime = new Date(isoDate.getTime() + (offsetMinutes * 60 * 1000))
					newData.value = localTime;
					newValid = true;
					break;
			}
			if (newValid) {
				this.props.update(newData);
			}
			this.setState({
				valid: newValid
			})
		} catch (err) {
			console.warn(`Invalid input state: ${err}`);
			this.setState({
				valid: false,
			})
		}
	}
}