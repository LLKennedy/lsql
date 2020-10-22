/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var query_pb = require('./query_pb.js')

var result_pb = require('./result_pb.js')
const proto = require('./service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.DataSourceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.DataSourcePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Query,
 *   !proto.Result>}
 */
const methodDescriptor_DataSource_Execute = new grpc.web.MethodDescriptor(
  '/DataSource/Execute',
  grpc.web.MethodType.UNARY,
  query_pb.Query,
  result_pb.Result,
  /**
   * @param {!proto.Query} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  result_pb.Result.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Query,
 *   !proto.Result>}
 */
const methodInfo_DataSource_Execute = new grpc.web.AbstractClientBase.MethodInfo(
  result_pb.Result,
  /**
   * @param {!proto.Query} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  result_pb.Result.deserializeBinary
);


/**
 * @param {!proto.Query} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Result)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Result>|undefined}
 *     The XHR Node Readable Stream
 */
proto.DataSourceClient.prototype.execute =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/DataSource/Execute',
      request,
      metadata || {},
      methodDescriptor_DataSource_Execute,
      callback);
};


/**
 * @param {!proto.Query} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Result>}
 *     Promise that resolves to the response
 */
proto.DataSourcePromiseClient.prototype.execute =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/DataSource/Execute',
      request,
      metadata || {},
      methodDescriptor_DataSource_Execute);
};


module.exports = proto;

