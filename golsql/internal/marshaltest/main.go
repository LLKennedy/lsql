package main

import (
	"log"

	"github.com/google/uuid"
	"github.com/llkennedy/lsql/golsql"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func main() {
	msg := &golsql.Query{}
	msg.Id = uuid.New().String()
	msg.Paging = &golsql.Paging{
		Limit:  100,
		Offset: 1000,
	}
	msg.Where = &golsql.WhereGroup{
		NegateOperator: true,
		Operator:       golsql.GroupOperator_OR,
		Elements: []*golsql.WhereGroupElement{
			{
				Element: &golsql.WhereGroupElement_Field{
					Field: &golsql.WhereField{
						FieldName:        "Name",
						NegateComparator: true,
						Comparator:       golsql.Comparator_FUZZY_EQUAL,
						Value: &golsql.WhereField_StringValue{
							StringValue: "abcd",
						},
						Ordering: &golsql.Ordering{
							Priority:   1,
							Descending: true,
						},
					},
				},
			},
			{
				Element: &golsql.WhereGroupElement_Group{
					Group: &golsql.WhereGroup{
						NegateOperator: false,
						Operator:       golsql.GroupOperator_XOR,
						Elements: []*golsql.WhereGroupElement{
							{
								Element: &golsql.WhereGroupElement_Field{
									Field: &golsql.WhereField{
										FieldName:        "Width",
										NegateComparator: false,
										Comparator:       golsql.Comparator_GREATER_THAN,
										Value: &golsql.WhereField_DoubleValue{
											DoubleValue: 889.531,
										},
										Ordering: &golsql.Ordering{
											Priority:   3,
											Descending: false,
										},
									},
								},
							},
							{
								Element: &golsql.WhereGroupElement_Group{
									Group: &golsql.WhereGroup{
										NegateOperator: true,
										Operator:       golsql.GroupOperator_OR,
										Elements: []*golsql.WhereGroupElement{
											{
												Element: &golsql.WhereGroupElement_Field{
													Field: &golsql.WhereField{
														FieldName:        "Name",
														NegateComparator: true,
														Comparator:       golsql.Comparator_FUZZY_EQUAL,
														Value: &golsql.WhereField_StringValue{
															StringValue: "abcd",
														},
														Ordering: &golsql.Ordering{
															Priority:   1,
															Descending: true,
														},
													},
												},
											},
											{
												Element: &golsql.WhereGroupElement_Group{
													Group: &golsql.WhereGroup{
														NegateOperator: false,
														Operator:       golsql.GroupOperator_XOR,
														Elements: []*golsql.WhereGroupElement{
															{
																Element: &golsql.WhereGroupElement_Field{
																	Field: &golsql.WhereField{
																		FieldName:        "Width",
																		NegateComparator: false,
																		Comparator:       golsql.Comparator_GREATER_THAN,
																		Value: &golsql.WhereField_DoubleValue{
																			DoubleValue: 889.531,
																		},
																		Ordering: &golsql.Ordering{
																			Priority:   3,
																			Descending: false,
																		},
																	},
																},
															},
														},
													},
												},
											},
											{
												Element: &golsql.WhereGroupElement_Field{
													Field: &golsql.WhereField{
														FieldName:  "Created",
														Comparator: golsql.Comparator_LESS_THAN_OR_EQUAL,
														Value: &golsql.WhereField_TimeValue{
															TimeValue: &timestamppb.Timestamp{
																Seconds: 1000,
																Nanos:   999,
															},
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}
	data, err := protojson.Marshal(msg)
	if err != nil {
		log.Fatalf("%v", err)
	}
	log.Printf("%s\n\n", data)
}
