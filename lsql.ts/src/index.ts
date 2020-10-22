import {Paging, Query} from 'lsql.js/query_pb';

let x = new Query();
let p = new Paging();
p.setLimit(100);
x.setPaging(p)
console.log(x.getPaging()?.getLimit());