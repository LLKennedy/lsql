import React from "react";
import { ClassDefs } from "./classdefs";
import "./FieldBuilder.css";
import { Comparator, CopyField, Field, FieldPropertyDescriptor, PropertyType } from "./where";

export interface FieldProps {
    data: Field;
    elementIndex: number[];
    propertyList: readonly FieldPropertyDescriptor[];
    update(data: Field): void;
}

export class FieldBuilder extends React.Component<FieldProps> {
    render() {
        return <div className={ClassDefs.fieldContainer}>
            <select value={this.props.data.fieldName} onChange={this.updateValue.bind(this)}>
                {this.props.propertyList.map((key, i) => {
                    let subElementIndex = [...this.props.elementIndex, i];
                    let elementString = `lsql-field-propertyselect-${indexString(subElementIndex)}`;
                    return <option key={elementString} value={key.name}>{key.name}</option>
                })}
            </select>
        </div>
    }
    updateValue(e: React.ChangeEvent<HTMLSelectElement>) {
        let newValue = e.target.value;
        let newField = CopyField(this.props.data);
        newField.fieldName = newValue;
        // for (let i = 0; i < props.)
        switch (newField.type) {
            case PropertyType.BOOL:
                newField.value = false;
                break;
            case PropertyType.BYTES:
                newField.value = new ArrayBuffer(0);
                break;
            case PropertyType.DOUBLE:
            case PropertyType.UINT64:
            case PropertyType.INT64:
                newField.value = 0;
                break;
            case PropertyType.STRING:
                newField.value = "";
                break;
            case PropertyType.TIME:
                newField.value = new Date();
                break;
        }
    }
}

function indexString(elementIndex: number[]): string {
    let str = "";
    for (let i = 0; i < elementIndex?.length; i++) {
        if (i !== 0) {
            str += "-";
        }
        str += `${elementIndex[i]}`;
    }
    return str;
}

function FieldComparatorSelector(comparator: Comparator, update: (comparator: Comparator) => void) {
    return <div>GREATER THAN</div>
}