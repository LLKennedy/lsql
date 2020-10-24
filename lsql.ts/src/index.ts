import { Struct } from "google-protobuf/google/protobuf/struct_pb";
import { WhereField } from "lsql.js/query_pb";
import { Model, PromiseClient, Query } from "./search";

class MyModel implements Model<MyModel> {
    myProp: boolean = false;
    public fieldType(fieldPath: string): WhereField.ValueCase {
        return MyModel.fieldType(fieldPath);
    }
    public parseStruct(raw: Struct): MyModel {
        return MyModel.parseStruct(raw);
    }
    private static fieldType(fieldPath: string): WhereField.ValueCase {
        switch (fieldPath) {
            case "myProp":
                return WhereField.ValueCase.BOOL_VALUE;
            default:
                return WhereField.ValueCase.VALUE_NOT_SET;
        }
    }
    private static parseStruct(raw: Struct): MyModel {
        const out = new MyModel();
        let val = raw.getFieldsMap().get("myProp");
        out.myProp = val?.getBoolValue() || out.myProp;
        return out;
    } 
}

let client = new PromiseClient<MyModel>("localhost:8778");
let qry = client.Execute(new Query());
qry.then(results => {
    let out = results.getResults(new MyModel());
})