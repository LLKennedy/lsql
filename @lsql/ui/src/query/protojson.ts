import { Ordering, UIGroup, Comparator, GroupOperator } from './where';
import * as uuid from 'uuid';

export interface Paging {
    limit?: number;
    offset?: number;
}

export interface Group {
    elements?: Element[];
    operator?: GroupOperator;
    negateOperator?: boolean;
}

export interface StringValue {
    stringValue?: string;
}

export interface Int64Value {
    int64Value?: number;
}

export interface Uint64Value {
    uint64Value?: number;
}

export interface DoubleValue {
    doubleValue?: number;
}

export interface BoolValue {
    boolValue?: boolean;
}

export interface BytesValue {
    bytesValue?: string;
}

export interface TimeValue {
    /**ISO string */
    timeValue?: string;
}

export interface BaseField {
    fieldName?: string;
    negateComparator?: boolean;
    comparator?: Comparator;
    ordering?: Partial<Ordering>
}

export type Field = BaseField & (StringValue | Int64Value | Uint64Value | DoubleValue | BoolValue | BytesValue | TimeValue)

export interface GroupElement {
    group: Group;
}

export interface FieldElement {
    field: Field;
}

export type Element = GroupElement | FieldElement;

export interface Query {
    id?: string;
    paging?: Paging;
    where?: Group;
}

/** Format expected by protojson */
export function ToProto(group: UIGroup, paging?: Paging): Query {
    let q: Query = {
        id: uuid.v4()
    }
    if (paging !== undefined) {
        q.paging = paging;
    }
    return q;
}