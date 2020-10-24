import { DataSourceClient, DataSourcePromiseClient } from 'lsql.js/service_grpc_web_pb'
import { Query as protoQuery, WhereField } from 'lsql.js/query_pb';
import { Metadata, Error} from 'grpc-web';
import { Result as protoResult } from 'lsql.js/result_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';

// Generated code will match this interface
export interface Model<T> {
    fieldType(fieldPath: string): WhereField.ValueCase;
    parseStruct(raw: Struct): T; 
}

// Query<T> is absolutely no different to Query, and only exists so you can't accidentally plug the wrong model's output into a search Execute
export class Query<T extends Model<T>> extends protoQuery { 
}

export class Result<T extends Model<T>> extends protoResult {
    public getResults(parser: T): T[] {
        let output: T[] = [];
        let data = this.getDataList();
        for (let i = 0; i < data.length; i++) {
            output.push(parser.parseStruct(data[i]));
        }
        return output;
    }
}

export class Client<T extends Model<T>> extends DataSourceClient {
    public Execute(request: Query<T>, metadata: Metadata | undefined, callback: (err: Error, response: Result<T>) => void) {
        this.execute(request, metadata, (err: Error, response: protoResult) => {
            callback(err, response as Result<T>); // TODO: check if this is safe, probably not
        });
    }
}

export class PromiseClient<T extends Model<T>> extends DataSourcePromiseClient {
    public Execute(request: Query<T>, metadata?: Metadata | undefined): Promise<Result<T>> {
        let p = this.execute(request, metadata);
        return p as Promise<Result<T>>; // TODO: check if this is safe, probably not
    }
}