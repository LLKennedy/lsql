package main

import (
	"github.com/llkennedy/lsql/golsql"
	"google.golang.org/protobuf/encoding/protojson"
)

func main() {
	msg := &golsql.Query{}
	data, err := protojson.Marshal(msg)
}
