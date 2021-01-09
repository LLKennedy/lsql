import * as grpcWeb from 'grpc-web';

import * as query_pb from './query_pb';
import * as result_pb from './result_pb';


export class DataSourceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  execute(
    request: query_pb.Query,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: result_pb.Result) => void
  ): grpcWeb.ClientReadableStream<result_pb.Result>;

}

export class DataSourcePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  execute(
    request: query_pb.Query,
    metadata?: grpcWeb.Metadata
  ): Promise<result_pb.Result>;

}

