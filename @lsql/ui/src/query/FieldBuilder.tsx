import React from "react";
import "./FieldBuilder.css";
import { Comparator, Field, Model, ModelFactory } from "./where";

export interface FieldProps<T extends Model> extends ModelFactory<T> {
    data: Field;
    update(data: Field): void;

}

export class FieldBuilder<T extends Model> extends React.Component<FieldProps<T>> {
    render() {
        let emptyModel = this.props.createEmptyModel();
        return <div>
            {Object.keys(emptyModel).map(key => {

                return <span>{key}<br /></span>
            })}
        </div>
    }
}

function FieldComparatorSelector(comparator: Comparator, update: (comparator: Comparator) => void) {
    return <div>GREATER THAN</div>
}