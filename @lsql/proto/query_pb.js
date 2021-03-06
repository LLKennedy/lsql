// source: query.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var where_pb = require('./where_pb.js');
goog.object.extend(proto, where_pb);
var select_pb = require('./select_pb.js');
goog.object.extend(proto, select_pb);
goog.exportSymbol('proto.DomainJoins', null, global);
goog.exportSymbol('proto.Paging', null, global);
goog.exportSymbol('proto.Query', null, global);
goog.exportSymbol('proto.Query.DomainSpaceCase', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Query = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.Query.oneofGroups_);
};
goog.inherits(proto.Query, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Query.displayName = 'proto.Query';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Paging = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Paging, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Paging.displayName = 'proto.Paging';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.DomainJoins = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.DomainJoins, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.DomainJoins.displayName = 'proto.DomainJoins';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.Query.oneofGroups_ = [[101]];

/**
 * @enum {number}
 */
proto.Query.DomainSpaceCase = {
  DOMAIN_SPACE_NOT_SET: 0,
  DOMAIN: 101
};

/**
 * @return {proto.Query.DomainSpaceCase}
 */
proto.Query.prototype.getDomainSpaceCase = function() {
  return /** @type {proto.Query.DomainSpaceCase} */(jspb.Message.computeOneofCase(this, proto.Query.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Query.prototype.toObject = function(opt_includeInstance) {
  return proto.Query.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Query} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Query.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    select: (f = msg.getSelect()) && select_pb.Select.toObject(includeInstance, f),
    domain: jspb.Message.getFieldWithDefault(msg, 101, ""),
    paging: (f = msg.getPaging()) && proto.Paging.toObject(includeInstance, f),
    where: (f = msg.getWhere()) && where_pb.Group.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Query}
 */
proto.Query.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Query;
  return proto.Query.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Query} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Query}
 */
proto.Query.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new select_pb.Select;
      reader.readMessage(value,select_pb.Select.deserializeBinaryFromReader);
      msg.setSelect(value);
      break;
    case 101:
      var value = /** @type {string} */ (reader.readString());
      msg.setDomain(value);
      break;
    case 3:
      var value = new proto.Paging;
      reader.readMessage(value,proto.Paging.deserializeBinaryFromReader);
      msg.setPaging(value);
      break;
    case 4:
      var value = new where_pb.Group;
      reader.readMessage(value,where_pb.Group.deserializeBinaryFromReader);
      msg.setWhere(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Query.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Query.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Query} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Query.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSelect();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      select_pb.Select.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 101));
  if (f != null) {
    writer.writeString(
      101,
      f
    );
  }
  f = message.getPaging();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.Paging.serializeBinaryToWriter
    );
  }
  f = message.getWhere();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      where_pb.Group.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.Query.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.Query} returns this
 */
proto.Query.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Select select = 2;
 * @return {?proto.Select}
 */
proto.Query.prototype.getSelect = function() {
  return /** @type{?proto.Select} */ (
    jspb.Message.getWrapperField(this, select_pb.Select, 2));
};


/**
 * @param {?proto.Select|undefined} value
 * @return {!proto.Query} returns this
*/
proto.Query.prototype.setSelect = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Query} returns this
 */
proto.Query.prototype.clearSelect = function() {
  return this.setSelect(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Query.prototype.hasSelect = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string domain = 101;
 * @return {string}
 */
proto.Query.prototype.getDomain = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 101, ""));
};


/**
 * @param {string} value
 * @return {!proto.Query} returns this
 */
proto.Query.prototype.setDomain = function(value) {
  return jspb.Message.setOneofField(this, 101, proto.Query.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Query} returns this
 */
proto.Query.prototype.clearDomain = function() {
  return jspb.Message.setOneofField(this, 101, proto.Query.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Query.prototype.hasDomain = function() {
  return jspb.Message.getField(this, 101) != null;
};


/**
 * optional Paging paging = 3;
 * @return {?proto.Paging}
 */
proto.Query.prototype.getPaging = function() {
  return /** @type{?proto.Paging} */ (
    jspb.Message.getWrapperField(this, proto.Paging, 3));
};


/**
 * @param {?proto.Paging|undefined} value
 * @return {!proto.Query} returns this
*/
proto.Query.prototype.setPaging = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Query} returns this
 */
proto.Query.prototype.clearPaging = function() {
  return this.setPaging(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Query.prototype.hasPaging = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Group where = 4;
 * @return {?proto.Group}
 */
proto.Query.prototype.getWhere = function() {
  return /** @type{?proto.Group} */ (
    jspb.Message.getWrapperField(this, where_pb.Group, 4));
};


/**
 * @param {?proto.Group|undefined} value
 * @return {!proto.Query} returns this
*/
proto.Query.prototype.setWhere = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Query} returns this
 */
proto.Query.prototype.clearWhere = function() {
  return this.setWhere(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Query.prototype.hasWhere = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Paging.prototype.toObject = function(opt_includeInstance) {
  return proto.Paging.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Paging} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Paging.toObject = function(includeInstance, msg) {
  var f, obj = {
    limit: jspb.Message.getFieldWithDefault(msg, 1, 0),
    offset: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Paging}
 */
proto.Paging.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Paging;
  return proto.Paging.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Paging} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Paging}
 */
proto.Paging.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setLimit(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setOffset(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Paging.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Paging.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Paging} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Paging.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLimit();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getOffset();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
};


/**
 * optional uint64 limit = 1;
 * @return {number}
 */
proto.Paging.prototype.getLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.Paging} returns this
 */
proto.Paging.prototype.setLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 offset = 2;
 * @return {number}
 */
proto.Paging.prototype.getOffset = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.Paging} returns this
 */
proto.Paging.prototype.setOffset = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.DomainJoins.prototype.toObject = function(opt_includeInstance) {
  return proto.DomainJoins.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.DomainJoins} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DomainJoins.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.DomainJoins}
 */
proto.DomainJoins.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.DomainJoins;
  return proto.DomainJoins.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.DomainJoins} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.DomainJoins}
 */
proto.DomainJoins.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.DomainJoins.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.DomainJoins.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.DomainJoins} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.DomainJoins.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


goog.object.extend(exports, proto);
