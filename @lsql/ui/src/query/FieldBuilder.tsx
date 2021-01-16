import React from "react";
import { ClassDefs } from "./classdefs";
import "./FieldBuilder.css";
import { BooleanField, BytesField, Comparator, CopyField, Field, NumericField, PropertyType, StringField, TimeField } from "./where";

export interface FieldProps {
    data: Field;
    elementIndex: number[];
    propertyList: ReadonlyMap<string, PropertyType>;
    update(data: Field): void;
}

export class FieldBuilder extends React.Component<FieldProps> {
    render() {
        return <div className={ClassDefs.fieldContainer}>
            <select
                value={this.props.data.fieldName}
                onChange={this.updateFieldName.bind(this)}
                className={ClassDefs.fieldDropdown}
            >
                {(Array.from(this.props.propertyList)).map(([name,], i) => {
                    let subElementIndex = [...this.props.elementIndex, i];
                    let elementString = `lsql-field-propertyselect-${indexString(subElementIndex)}`;
                    return <option key={elementString} value={name}>{name}</option>
                })}
            </select>
            <select
                value={`${this.props.data.negateComparator}`}
                className={ClassDefs.fieldDropdown}
                onChange={e => this.updateNegateComparator(e.target.value === `${true}`)}
            >
                <option key={`lsql-field-negateoperator-${indexString(this.props.elementIndex)}-false`} value={`${false}`}>IS</option>
                <option key={`lsql-field-negateoperator-${indexString(this.props.elementIndex)}-true`} value={`${true}`}>IS NOT</option>
            </select>
            <FieldComparatorSelector
                comparator={this.props.data.comparator}
                propertyType={this.props.data.type}
                elementIndex={this.props.elementIndex}
                update={this.updateComparator.bind(this)}
            />
            <FieldInput
                data={this.props.data}
                update={this.updateValue.bind(this)}
            />
        </div>
    }
    updateFieldName(e: React.ChangeEvent<HTMLSelectElement>) {
        let newValue = e.target.value;
        let newField = CopyField(this.props.data);
        newField.fieldName = newValue;
        let newType = this.props.propertyList.get(newValue);
        if (newType === undefined) {
            throw new Error("Invalid property selected");
        }
        newField.type = newType;
        let typeComparators = typeComparatorMap.get(newType);
        if (typeComparators === undefined) {
            throw new Error("Cannot set default comparator with unknown type");
        }
        let comparatorDetailStrings = Array.from(typeComparators);
        if (comparatorDetailStrings.length < 1) {
            throw new Error("Cannot set default comparator for type with no known comparators");
        }
        typeComparators.keys()
        let [defaultComparator,] = comparatorDetailStrings[0];
        newField.comparator = defaultComparator;
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
        this.props.update(newField);
    }
    updateComparator(comparator: Comparator) {
        let newField = CopyField(this.props.data);
        newField.comparator = comparator;
        this.props.update(newField);
    }
    updateNegateComparator(negateComparator: boolean) {
        let newField = CopyField(this.props.data);
        newField.negateComparator = negateComparator;
        this.props.update(newField);
    }
    updateValue(value: string | number | boolean | ArrayBuffer | Date) {

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

interface ComparatorProps {
    propertyType: PropertyType;
    comparator: Comparator;
    elementIndex: number[];
    update(comparator: Comparator): void;
}

class FieldComparatorSelector extends React.Component<ComparatorProps> {
    render() {
        let comparatorMap = typeComparatorMap.get(this.props.propertyType);
        return <select
            className={ClassDefs.fieldDropdown}
            onChange={e => { this.props.update(parseInt(e.target.value) as Comparator) }}
            value={this.props.comparator}
        >
            {allComparatorList.map((comparator, i) => {
                let comparatorString = comparatorMap?.get(comparator)
                if (comparatorString !== undefined) {
                    return <option key={`lsql-field-comparator-${indexString([...this.props.elementIndex, i])}`} value={comparator}>{comparatorString}</option>
                }
                return null;
            })}
        </select>
    }

}

interface InputProps {
    data: NumericField | StringField | BooleanField | BytesField | TimeField
    update(newValue: string | number | boolean | ArrayBuffer | Date): void;
}

class FieldInput extends React.Component<InputProps> {
    render() {
        return <div></div>
    }
}

const allComparatorList: readonly Comparator[] = [Comparator.EQUAL, Comparator.FUZZY_EQUAL, Comparator.GREATER_THAN, Comparator.GREATER_THAN_OR_EQUAL, Comparator.IS_NULL, Comparator.LESS_THAN, Comparator.LESS_THAN_OR_EQUAL];

const boolComparators: [Comparator, string][] = [
    [
        Comparator.EQUAL,
        "EQUAL TO"
    ],
    [
        Comparator.IS_NULL,
        "NULL"
    ]
];

const dataComparators: [Comparator, string][] = [
    [
        Comparator.EQUAL,
        "EQUAL TO"
    ],
    [
        Comparator.FUZZY_EQUAL,
        "INCLUSIVE OF"
    ],
    [
        Comparator.IS_NULL,
        "NULL"
    ]
];

const numericComparators: [Comparator, string][] = [
    [
        Comparator.EQUAL,
        "=="
    ],
    [
        Comparator.GREATER_THAN,
        ">"
    ],
    [
        Comparator.GREATER_THAN_OR_EQUAL,
        "≥"
    ],
    [
        Comparator.LESS_THAN,
        "<"
    ],
    [
        Comparator.LESS_THAN_OR_EQUAL,
        "≤"
    ],
    [
        Comparator.IS_NULL,
        "NULL"
    ]
];

const typeComparatorMap: ReadonlyMap<PropertyType, ReadonlyMap<Comparator, string>> = new Map<PropertyType, Map<Comparator, string>>([
    [
        PropertyType.BOOL,
        new Map<Comparator, string>(boolComparators)
    ],
    [
        PropertyType.BYTES,
        new Map<Comparator, string>(dataComparators)
    ],
    [
        PropertyType.DOUBLE,
        new Map<Comparator, string>(numericComparators)
    ],
    [
        PropertyType.INT64,
        new Map<Comparator, string>(numericComparators)
    ],
    [
        PropertyType.UINT64,
        new Map<Comparator, string>(numericComparators)
    ],
    [
        PropertyType.STRING,
        new Map<Comparator, string>(dataComparators)
    ],
    [
        PropertyType.TIME,
        new Map<Comparator, string>(numericComparators)
    ]
]);