import React from "react";
import { Group, Model, ModelFactory } from "./where";

export interface GroupProps<T extends Model> extends ModelFactory<T> {
    data: Group;
    update(data: Group): void;

}

export class GroupBuilder<T extends Model> extends React.Component<GroupProps<T>> {
    render() {
        let emptyModel = this.props.createEmptyModel();
        return <div>
            {Object.keys(emptyModel).map(key => {
                return <span>{key}<br /></span>
            })}
        </div>
    }
}