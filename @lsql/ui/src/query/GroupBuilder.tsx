import React from "react";
import { Group, ModelFactory } from "./where";

export interface GroupProps<T> extends ModelFactory<T> {
    data: Group<T>;
    update(data: Group<T>): void;

}

export class GroupBuilder<T> extends React.Component<GroupProps<T>> {
    render() {
        let emptyModel = this.props.createEmptyModel();
        return <div>
            {Object.keys(emptyModel).map(key => {
                return <span>{key}<br /></span>
            })}
        </div>
    }
}