# Luke's "Silly" Query Language

SQL is simply not suited to distributed systems. Even with a monolithic data store, user-generated queries are functionally impossible to sanitise, authorise, analyse and audit if the responsibility for those tasks is moved even a single layer away from the RDBMS.

A real solution to this problem is to use the large knowledge base of academic research on exactly this issue, which propose all kinds of interesting solutions and discuss the problems and areas of new research fundamental to the distributed systems that are increasingly necessary in today's software landscape. My shitty (hereafter written as "silly") solution is to do none of that and just hack together something that makes my life easier.

Enter, LSQL. Designed to let users query against EF models from javascript (but ideally Typescript) using gRPC as the courier. Official proto-JSON conversion handles a REST proxy for gRPC microservices if you're not fancy enough for gRPC-web yet. Canonical gRPC message syntax means you can inspect, understand and modify the request contents from any language. Code generation means you can get strong typing at compile time.

At least, that's the plan. At time of writing, I only just came up with this idea as a half-joke. We'll see what happens.

## Code Generation

The idea here is that the proto messages are static, regardless of your data model(s). Code will be generated from .NET Core Entity Framework (EF) models for both the Typescript bindings and an LSQL->EF proxy layer. Other languages are mostly supported by proto's inherent language support, but if I get to it I'll work on codegen for strongly typed in-transit inspection of the query types. It's going to be hard to do this in languages that don't support generics (looking at you, Go).

## Transactions

Transactions? What are those? Not my problem, for sure. After all, we only do gets here. Sure, you *could* use gets to communicate data you want to delete or apply modifications to, but that sounds like a you problem.

For real though, transactions over RPC are their own entire systemic problem, they're out of scope for this project. If you plan to use this query language for transactional sequences, you'll need to implement that within your microservice architecture and DB solution.

## Data Model

### Domains

A "domain", within this project, is a collection of properties which can be joined with other domains. At the lowest level implementation, all EF Models involved in querying are their own domains, but services responsible for multiple domains can choose whether to expose them individually or join them internally and expose a single virtual domain.

For example, if the Orders service controls EF models Order (properties: ID, DatePlaced, CustomerID, Cost, Tax), LineItem (properties: OrderID, ItemString) and RefundRequest (properties: OrderID, DatePlaced, Fulfilled), then the Orders service could either expose these domains individually, or expose a single domain which it might call "OrderInformation" (properties: ID, DatePlaced, CustomerID, Cost, Tax, LineItems, Refunded) which exposes only part of the information, but simplifies the query surface. This same logic applies recursively, and another service depending on the Orders service may in turn hide the OrderInformation domain behind a virtual domain of its own. 

Any service which uses virtual domains rather than proxying the true EF domains is repsonsible for de-referencing these virtual domains to their original sources when executing a query, to which end it is vitally important to maintain unique naming of properties in virtual domains which can always be traced back to a specific property on an original domain.

### Property Information

The types of properties supported is intentionally limited to cover most use cases with a relatively small amount of type-switching code. This is subject to change as the EF integration component is written.

Currently supported types in message transport (protobuf types):
 * Basic string data
 * 64 bit integers, for all signed integer data
 * 64 bit unsigned integers, for all unsigned integer data
 * Double-precision floating point numbers, for all floating point data
 * Booleans
 * Bytes, for raw binary data representing anything - not particularly user friendly, but can be necessary
 * Timestamp - if you need to convey date/time ranges, do so by specifying both greater than and less than timestamps

If you think an important type is missing from this list, feel free to open an issue for it on the repo and I'll consider adding it, or submit a pull request if you want to add it yourself. Or just fork the repo and do your own thing, I'm not the boss of you.