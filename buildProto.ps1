go get google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.0.0
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc
$Directory = "."
$IncludeRule = "*.proto"
$ExcludeRUle = [Regex]'.*google.*'
$ProtoFiles = Get-ChildItem -path $Directory -Recurse -Include $IncludeRule | Where-Object FullName -NotMatch $ExcludeRUle
foreach ($file in $ProtoFiles) {
    protoc --proto_path="$($file.DirectoryName)" --go_out=paths=source_relative:./proto/golsql --go-grpc_out=paths=source_relative:./proto/golsql $file.FullName
}
go build ./proto/golsql
go mod tidy