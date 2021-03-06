// source: where.proto
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

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
var select_pb = require('./select_pb.js');
goog.object.extend(proto, select_pb);
goog.exportSymbol('proto.Comparator', null, global);
goog.exportSymbol('proto.Field', null, global);
goog.exportSymbol('proto.Field.ValueCase', null, global);
goog.exportSymbol('proto.Group', null, global);
goog.exportSymbol('proto.GroupElement', null, global);
goog.exportSymbol('proto.GroupElement.ElementCase', null, global);
goog.exportSymbol('proto.GroupOperator', null, global);
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
proto.Group = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Group.repeatedFields_, null);
};
goog.inherits(proto.Group, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Group.displayName = 'proto.Group';
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
proto.GroupElement = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.GroupElement.oneofGroups_);
};
goog.inherits(proto.GroupElement, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GroupElement.displayName = 'proto.GroupElement';
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
proto.Field = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.Field.oneofGroups_);
};
goog.inherits(proto.Field, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Field.displayName = 'proto.Field';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Group.repeatedFields_ = [1];



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
proto.Group.prototype.toObject = function(opt_includeInstance) {
  return proto.Group.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Group} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Group.toObject = function(includeInstance, msg) {
  var f, obj = {
    elementsList: jspb.Message.toObjectList(msg.getElementsList(),
    proto.GroupElement.toObject, includeInstance),
    negateOperator: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    operator: jspb.Message.getFieldWithDefault(msg, 3, 0)
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
 * @return {!proto.Group}
 */
proto.Group.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Group;
  return proto.Group.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Group} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Group}
 */
proto.Group.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.GroupElement;
      reader.readMessage(value,proto.GroupElement.deserializeBinaryFromReader);
      msg.addElements(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setNegateOperator(value);
      break;
    case 3:
      var value = /** @type {!proto.GroupOperator} */ (reader.readEnum());
      msg.setOperator(value);
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
proto.Group.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Group.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Group} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Group.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getElementsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.GroupElement.serializeBinaryToWriter
    );
  }
  f = message.getNegateOperator();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getOperator();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
};


/**
 * repeated GroupElement elements = 1;
 * @return {!Array<!proto.GroupElement>}
 */
proto.Group.prototype.getElementsList = function() {
  return /** @type{!Array<!proto.GroupElement>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.GroupElement, 1));
};


/**
 * @param {!Array<!proto.GroupElement>} value
 * @return {!proto.Group} returns this
*/
proto.Group.prototype.setElementsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.GroupElement=} opt_value
 * @param {number=} opt_index
 * @return {!proto.GroupElement}
 */
proto.Group.prototype.addElements = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.GroupElement, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Group} returns this
 */
proto.Group.prototype.clearElementsList = function() {
  return this.setElementsList([]);
};


/**
 * optional bool negate_operator = 2;
 * @return {boolean}
 */
proto.Group.prototype.getNegateOperator = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Group} returns this
 */
proto.Group.prototype.setNegateOperator = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional GroupOperator operator = 3;
 * @return {!proto.GroupOperator}
 */
proto.Group.prototype.getOperator = function() {
  return /** @type {!proto.GroupOperator} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.GroupOperator} value
 * @return {!proto.Group} returns this
 */
proto.Group.prototype.setOperator = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.GroupElement.oneofGroups_ = [[101,102]];

/**
 * @enum {number}
 */
proto.GroupElement.ElementCase = {
  ELEMENT_NOT_SET: 0,
  FIELD: 101,
  GROUP: 102
};

/**
 * @return {proto.GroupElement.ElementCase}
 */
proto.GroupElement.prototype.getElementCase = function() {
  return /** @type {proto.GroupElement.ElementCase} */(jspb.Message.computeOneofCase(this, proto.GroupElement.oneofGroups_[0]));
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
proto.GroupElement.prototype.toObject = function(opt_includeInstance) {
  return proto.GroupElement.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GroupElement} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GroupElement.toObject = function(includeInstance, msg) {
  var f, obj = {
    field: (f = msg.getField()) && proto.Field.toObject(includeInstance, f),
    group: (f = msg.getGroup()) && proto.Group.toObject(includeInstance, f)
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
 * @return {!proto.GroupElement}
 */
proto.GroupElement.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GroupElement;
  return proto.GroupElement.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GroupElement} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GroupElement}
 */
proto.GroupElement.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 101:
      var value = new proto.Field;
      reader.readMessage(value,proto.Field.deserializeBinaryFromReader);
      msg.setField(value);
      break;
    case 102:
      var value = new proto.Group;
      reader.readMessage(value,proto.Group.deserializeBinaryFromReader);
      msg.setGroup(value);
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
proto.GroupElement.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GroupElement.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GroupElement} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GroupElement.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getField();
  if (f != null) {
    writer.writeMessage(
      101,
      f,
      proto.Field.serializeBinaryToWriter
    );
  }
  f = message.getGroup();
  if (f != null) {
    writer.writeMessage(
      102,
      f,
      proto.Group.serializeBinaryToWriter
    );
  }
};


/**
 * optional Field field = 101;
 * @return {?proto.Field}
 */
proto.GroupElement.prototype.getField = function() {
  return /** @type{?proto.Field} */ (
    jspb.Message.getWrapperField(this, proto.Field, 101));
};


/**
 * @param {?proto.Field|undefined} value
 * @return {!proto.GroupElement} returns this
*/
proto.GroupElement.prototype.setField = function(value) {
  return jspb.Message.setOneofWrapperField(this, 101, proto.GroupElement.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GroupElement} returns this
 */
proto.GroupElement.prototype.clearField = function() {
  return this.setField(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GroupElement.prototype.hasField = function() {
  return jspb.Message.getField(this, 101) != null;
};


/**
 * optional Group group = 102;
 * @return {?proto.Group}
 */
proto.GroupElement.prototype.getGroup = function() {
  return /** @type{?proto.Group} */ (
    jspb.Message.getWrapperField(this, proto.Group, 102));
};


/**
 * @param {?proto.Group|undefined} value
 * @return {!proto.GroupElement} returns this
*/
proto.GroupElement.prototype.setGroup = function(value) {
  return jspb.Message.setOneofWrapperField(this, 102, proto.GroupElement.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GroupElement} returns this
 */
proto.GroupElement.prototype.clearGroup = function() {
  return this.setGroup(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GroupElement.prototype.hasGroup = function() {
  return jspb.Message.getField(this, 102) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.Field.oneofGroups_ = [[101,102,103,104,105,106,107]];

/**
 * @enum {number}
 */
proto.Field.ValueCase = {
  VALUE_NOT_SET: 0,
  STRING_VALUE: 101,
  INT64_VALUE: 102,
  UINT64_VALUE: 103,
  DOUBLE_VALUE: 104,
  BOOL_VALUE: 105,
  BYTES_VALUE: 106,
  TIME_VALUE: 107
};

/**
 * @return {proto.Field.ValueCase}
 */
proto.Field.prototype.getValueCase = function() {
  return /** @type {proto.Field.ValueCase} */(jspb.Message.computeOneofCase(this, proto.Field.oneofGroups_[0]));
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
proto.Field.prototype.toObject = function(opt_includeInstance) {
  return proto.Field.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Field} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Field.toObject = function(includeInstance, msg) {
  var f, obj = {
    column: (f = msg.getColumn()) && select_pb.ColumnID.toObject(includeInstance, f),
    negateComparator: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    comparator: jspb.Message.getFieldWithDefault(msg, 3, 0),
    stringValue: jspb.Message.getFieldWithDefault(msg, 101, ""),
    int64Value: jspb.Message.getFieldWithDefault(msg, 102, 0),
    uint64Value: jspb.Message.getFieldWithDefault(msg, 103, 0),
    doubleValue: jspb.Message.getFloatingPointFieldWithDefault(msg, 104, 0.0),
    boolValue: jspb.Message.getBooleanFieldWithDefault(msg, 105, false),
    bytesValue: msg.getBytesValue_asB64(),
    timeValue: (f = msg.getTimeValue()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
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
 * @return {!proto.Field}
 */
proto.Field.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Field;
  return proto.Field.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Field} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Field}
 */
proto.Field.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new select_pb.ColumnID;
      reader.readMessage(value,select_pb.ColumnID.deserializeBinaryFromReader);
      msg.setColumn(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setNegateComparator(value);
      break;
    case 3:
      var value = /** @type {!proto.Comparator} */ (reader.readEnum());
      msg.setComparator(value);
      break;
    case 101:
      var value = /** @type {string} */ (reader.readString());
      msg.setStringValue(value);
      break;
    case 102:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setInt64Value(value);
      break;
    case 103:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setUint64Value(value);
      break;
    case 104:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDoubleValue(value);
      break;
    case 105:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBoolValue(value);
      break;
    case 106:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBytesValue(value);
      break;
    case 107:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setTimeValue(value);
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
proto.Field.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Field.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Field} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Field.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getColumn();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      select_pb.ColumnID.serializeBinaryToWriter
    );
  }
  f = message.getNegateComparator();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getComparator();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 101));
  if (f != null) {
    writer.writeString(
      101,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 102));
  if (f != null) {
    writer.writeInt64(
      102,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 103));
  if (f != null) {
    writer.writeUint64(
      103,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 104));
  if (f != null) {
    writer.writeDouble(
      104,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 105));
  if (f != null) {
    writer.writeBool(
      105,
      f
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 106));
  if (f != null) {
    writer.writeBytes(
      106,
      f
    );
  }
  f = message.getTimeValue();
  if (f != null) {
    writer.writeMessage(
      107,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional ColumnID column = 1;
 * @return {?proto.ColumnID}
 */
proto.Field.prototype.getColumn = function() {
  return /** @type{?proto.ColumnID} */ (
    jspb.Message.getWrapperField(this, select_pb.ColumnID, 1));
};


/**
 * @param {?proto.ColumnID|undefined} value
 * @return {!proto.Field} returns this
*/
proto.Field.prototype.setColumn = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.clearColumn = function() {
  return this.setColumn(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Field.prototype.hasColumn = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bool negate_comparator = 2;
 * @return {boolean}
 */
proto.Field.prototype.getNegateComparator = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.setNegateComparator = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional Comparator comparator = 3;
 * @return {!proto.Comparator}
 */
proto.Field.prototype.getComparator = function() {
  return /** @type {!proto.Comparator} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {!proto.Comparator} value
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.setComparator = function(value) {
  return jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional string string_value = 101;
 * @return {string}
 */
proto.Field.prototype.getStringValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 101, ""));
};


/**
 * @param {string} value
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.setStringValue = function(value) {
  return jspb.Message.setOneofField(this, 101, proto.Field.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.clearStringValue = function() {
  return jspb.Message.setOneofField(this, 101, proto.Field.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Field.prototype.hasStringValue = function() {
  return jspb.Message.getField(this, 101) != null;
};


/**
 * optional int64 int64_value = 102;
 * @return {number}
 */
proto.Field.prototype.getInt64Value = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 102, 0));
};


/**
 * @param {number} value
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.setInt64Value = function(value) {
  return jspb.Message.setOneofField(this, 102, proto.Field.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.clearInt64Value = function() {
  return jspb.Message.setOneofField(this, 102, proto.Field.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Field.prototype.hasInt64Value = function() {
  return jspb.Message.getField(this, 102) != null;
};


/**
 * optional uint64 uint64_value = 103;
 * @return {number}
 */
proto.Field.prototype.getUint64Value = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 103, 0));
};


/**
 * @param {number} value
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.setUint64Value = function(value) {
  return jspb.Message.setOneofField(this, 103, proto.Field.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.clearUint64Value = function() {
  return jspb.Message.setOneofField(this, 103, proto.Field.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Field.prototype.hasUint64Value = function() {
  return jspb.Message.getField(this, 103) != null;
};


/**
 * optional double double_value = 104;
 * @return {number}
 */
proto.Field.prototype.getDoubleValue = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 104, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.setDoubleValue = function(value) {
  return jspb.Message.setOneofField(this, 104, proto.Field.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.clearDoubleValue = function() {
  return jspb.Message.setOneofField(this, 104, proto.Field.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Field.prototype.hasDoubleValue = function() {
  return jspb.Message.getField(this, 104) != null;
};


/**
 * optional bool bool_value = 105;
 * @return {boolean}
 */
proto.Field.prototype.getBoolValue = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 105, false));
};


/**
 * @param {boolean} value
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.setBoolValue = function(value) {
  return jspb.Message.setOneofField(this, 105, proto.Field.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.clearBoolValue = function() {
  return jspb.Message.setOneofField(this, 105, proto.Field.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Field.prototype.hasBoolValue = function() {
  return jspb.Message.getField(this, 105) != null;
};


/**
 * optional bytes bytes_value = 106;
 * @return {string}
 */
proto.Field.prototype.getBytesValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 106, ""));
};


/**
 * optional bytes bytes_value = 106;
 * This is a type-conversion wrapper around `getBytesValue()`
 * @return {string}
 */
proto.Field.prototype.getBytesValue_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBytesValue()));
};


/**
 * optional bytes bytes_value = 106;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBytesValue()`
 * @return {!Uint8Array}
 */
proto.Field.prototype.getBytesValue_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBytesValue()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.setBytesValue = function(value) {
  return jspb.Message.setOneofField(this, 106, proto.Field.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.clearBytesValue = function() {
  return jspb.Message.setOneofField(this, 106, proto.Field.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Field.prototype.hasBytesValue = function() {
  return jspb.Message.getField(this, 106) != null;
};


/**
 * optional google.protobuf.Timestamp time_value = 107;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.Field.prototype.getTimeValue = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 107));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.Field} returns this
*/
proto.Field.prototype.setTimeValue = function(value) {
  return jspb.Message.setOneofWrapperField(this, 107, proto.Field.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Field} returns this
 */
proto.Field.prototype.clearTimeValue = function() {
  return this.setTimeValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Field.prototype.hasTimeValue = function() {
  return jspb.Message.getField(this, 107) != null;
};


/**
 * @enum {number}
 */
proto.Comparator = {
  UNKNOWN_COMPARATOR: 0,
  EQUAL: 1,
  FUZZY_EQUAL: 2,
  GREATER_THAN: 3,
  LESS_THAN: 4,
  GREATER_THAN_OR_EQUAL: 5,
  LESS_THAN_OR_EQUAL: 6,
  IS_NULL: 7
};

/**
 * @enum {number}
 */
proto.GroupOperator = {
  UNKNOWN_GROUPOPERATOR: 0,
  AND: 1,
  OR: 2,
  XOR: 3
};

goog.object.extend(exports, proto);
