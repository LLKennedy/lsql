go get google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.0.0
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc
$Directory = "."
$IncludeRule = "*.proto"
$ExcludeRUle = [Regex]'.*google.*'
$ProtoFiles = Get-ChildItem -path $Directory -Recurse -Include $IncludeRule | Where-Object FullName -NotMatch $ExcludeRUle
foreach ($file in $ProtoFiles) {
    protoc --proto_path="$($file.DirectoryName)" --go_out=paths=source_relative:./golsql --go-grpc_out=paths=source_relative:./golsql --js_out=import_style=commonjs:./lsql.js/src --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:./lsql.js/src $file.FullName
}
# Get-ChildItem -Path ./lsql.ts/src/generated *.d.ts | Rename-Item -NewName { $_.name -replace ".d.ts",".ts" }
dotnet build ./LSQL.Net/LSQL.Net.csproj
go build ./golsql
go mod tidy