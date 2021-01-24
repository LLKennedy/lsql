import { Select } from "./select";
import { Group } from "./where";

export interface Paging {
	limit?: number;
	offset?: number;
}

export interface Query {
	id?: string;
	paging?: Paging;
	select?: Select;
	where?: Group;
}