// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package golsql

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion7

// DataSourceClient is the client API for DataSource service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type DataSourceClient interface {
	Execute(ctx context.Context, in *Query, opts ...grpc.CallOption) (*Result, error)
	ExecuteBatch(ctx context.Context, opts ...grpc.CallOption) (DataSource_ExecuteBatchClient, error)
}

type dataSourceClient struct {
	cc grpc.ClientConnInterface
}

func NewDataSourceClient(cc grpc.ClientConnInterface) DataSourceClient {
	return &dataSourceClient{cc}
}

func (c *dataSourceClient) Execute(ctx context.Context, in *Query, opts ...grpc.CallOption) (*Result, error) {
	out := new(Result)
	err := c.cc.Invoke(ctx, "/DataSource/Execute", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *dataSourceClient) ExecuteBatch(ctx context.Context, opts ...grpc.CallOption) (DataSource_ExecuteBatchClient, error) {
	stream, err := c.cc.NewStream(ctx, &_DataSource_serviceDesc.Streams[0], "/DataSource/ExecuteBatch", opts...)
	if err != nil {
		return nil, err
	}
	x := &dataSourceExecuteBatchClient{stream}
	return x, nil
}

type DataSource_ExecuteBatchClient interface {
	Send(*Query) error
	Recv() (*StreamResult, error)
	grpc.ClientStream
}

type dataSourceExecuteBatchClient struct {
	grpc.ClientStream
}

func (x *dataSourceExecuteBatchClient) Send(m *Query) error {
	return x.ClientStream.SendMsg(m)
}

func (x *dataSourceExecuteBatchClient) Recv() (*StreamResult, error) {
	m := new(StreamResult)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// DataSourceServer is the server API for DataSource service.
// All implementations must embed UnimplementedDataSourceServer
// for forward compatibility
type DataSourceServer interface {
	Execute(context.Context, *Query) (*Result, error)
	ExecuteBatch(DataSource_ExecuteBatchServer) error
	mustEmbedUnimplementedDataSourceServer()
}

// UnimplementedDataSourceServer must be embedded to have forward compatible implementations.
type UnimplementedDataSourceServer struct {
}

func (UnimplementedDataSourceServer) Execute(context.Context, *Query) (*Result, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Execute not implemented")
}
func (UnimplementedDataSourceServer) ExecuteBatch(DataSource_ExecuteBatchServer) error {
	return status.Errorf(codes.Unimplemented, "method ExecuteBatch not implemented")
}
func (UnimplementedDataSourceServer) mustEmbedUnimplementedDataSourceServer() {}

// UnsafeDataSourceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to DataSourceServer will
// result in compilation errors.
type UnsafeDataSourceServer interface {
	mustEmbedUnimplementedDataSourceServer()
}

func RegisterDataSourceServer(s *grpc.Server, srv DataSourceServer) {
	s.RegisterService(&_DataSource_serviceDesc, srv)
}

func _DataSource_Execute_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Query)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DataSourceServer).Execute(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/DataSource/Execute",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DataSourceServer).Execute(ctx, req.(*Query))
	}
	return interceptor(ctx, in, info, handler)
}

func _DataSource_ExecuteBatch_Handler(srv interface{}, stream grpc.ServerStream) error {
	return srv.(DataSourceServer).ExecuteBatch(&dataSourceExecuteBatchServer{stream})
}

type DataSource_ExecuteBatchServer interface {
	Send(*StreamResult) error
	Recv() (*Query, error)
	grpc.ServerStream
}

type dataSourceExecuteBatchServer struct {
	grpc.ServerStream
}

func (x *dataSourceExecuteBatchServer) Send(m *StreamResult) error {
	return x.ServerStream.SendMsg(m)
}

func (x *dataSourceExecuteBatchServer) Recv() (*Query, error) {
	m := new(Query)
	if err := x.ServerStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

var _DataSource_serviceDesc = grpc.ServiceDesc{
	ServiceName: "DataSource",
	HandlerType: (*DataSourceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Execute",
			Handler:    _DataSource_Execute_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "ExecuteBatch",
			Handler:       _DataSource_ExecuteBatch_Handler,
			ServerStreams: true,
			ClientStreams: true,
		},
	},
	Metadata: "service.proto",
}
