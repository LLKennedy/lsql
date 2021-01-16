import React from "react";
import { ClassDefs } from "./classdefs";
import "./FieldBuilder.css";
import { Comparator, CopyField, Field, PropertyType } from "./where";

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
                onChange={this.updateValue.bind(this)}
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
        </div>
    }
    updateValue(e: React.ChangeEvent<HTMLSelectElement>) {
        let newValue = e.target.value;
        let newField = CopyField(this.props.data);
        newField.fieldName = newValue;
        let newType = this.props.propertyList.get(newValue);
        if (newType === undefined) {
            throw new Error("Invalid property selected");
        }
        newField.type = newType;
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

const allComparatorList: readonly Comparator[] = [Comparator.EQUAL, Comparator.FUZZY_EQUAL, Comparator.GREATER_THAN, Comparator.GREATER_THAN_OR_EQUAL, Comparator.IS_NULL, Comparator.LESS_THAN, Comparator.LESS_THAN_OR_EQUAL];

const typeComparatorMap: ReadonlyMap<PropertyType, ReadonlyMap<Comparator, string>> = new Map<PropertyType, Map<Comparator, string>>([
    [
        PropertyType.BOOL,
        new Map<Comparator, string>([
            [
                Comparator.EQUAL,
                "EQUAL TO"
            ]
        ])
    ],
    [
        PropertyType.BYTES,
        new Map<Comparator, string>([
            [
                Comparator.EQUAL,
                "EQUAL TO"
            ]
        ])
    ],
    [
        PropertyType.DOUBLE,
        new Map<Comparator, string>([
            [
                Comparator.EQUAL,
                "EQUAL TO"
            ],
            [
                Comparator.GREATER_THAN,
                "GREATER THAN"
            ],
            [
                Comparator.GREATER_THAN_OR_EQUAL,
                "GREATER THAN OR EQUAL TO"
            ]
        ])
    ],
    [
        PropertyType.INT64,
        new Map<Comparator, string>([
            [
                Comparator.EQUAL,
                "EQUAL TO"
            ]
        ])
    ],
    [
        PropertyType.UINT64,
        new Map<Comparator, string>([
            [
                Comparator.EQUAL,
                "EQUAL TO"
            ]
        ])
    ],
    [
        PropertyType.STRING,
        new Map<Comparator, string>([
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
        ])
    ],
    [
        PropertyType.TIME,
        new Map<Comparator, string>([
            [
                Comparator.EQUAL,
                "EQUAL TO"
            ]
        ])
    ]
]);