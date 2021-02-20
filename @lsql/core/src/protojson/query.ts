import { Select } from "./select";
import { Group } from "./where";

export interface Paging extends Object {
	limit?: number;
	offset?: number;
}

export interface Query extends Object {
	id?: string;
	paging?: Paging;
	select?: Select;
	where?: Group;
	domain?: string;
}