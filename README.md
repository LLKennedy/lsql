# Luke's "Silly" Query Language

SQL is simply not suited to distributed systems. Even with a monolithic data store, user-generated queries are functionally impossible to sanitise, authorise, analyse and audit if the responsibility for those tasks is moved even a single layer away from the RDBMS.

A real solution to this problem is to use the large knowledge base of academic research on exactly this issue, which propose all kinds of interesting solutions and discuss the problems and areas of new research fundamental to the distributed systems that are increasingly necessary in today's software landscape. My shitty (hereafter written as "silly") solution is to do none of that and just hack together something that makes my life easier.

Enter, LSQL. Designed to let users query against EF models from javascript (but ideally Typescript) using gRPC as the courier. Official proto-JSON conversion handles a REST proxy for gRPC microservices if you're not fancy enough for gRPC-web yet. Canonical gRPC message syntax means you can inspect, understand and modify the request contents from any language. Code generation means you can get strong typing at compile time.

At least, that's the plan. At time of writing, I only just came up with this idea as a half-joke. We'll see what happens.

## Code Generation

The idea here is that the proto messages are static, regardless of your data model(s). Code will be generated from .NET Core Entity Framework (EF) models for both the Typescript bindings and an LSQL->EF proxy layer. Other languages are mostly supported by proto's inherent language support, but if I get to it I'll work on codegen for strongly typed in-transit inspection of the query types. It's going to be hard to do this in languages that don't support generics (looking at you, Go).