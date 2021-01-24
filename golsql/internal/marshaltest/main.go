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
	msg.Select = &golsql.Select{
		Columns: []*golsql.ColumnID{
			{
				FieldName:  "Name",
				DomainName: "stuff",
			},
			{
				FieldName: "Width",
			},
		},
		Ordering: map[uint32]*golsql.Ordering{
			138: {
				Column: &golsql.ColumnID{
					FieldName:  "Name",
					DomainName: "stuff",
				},
				Descending: true,
			},
			12: {
				Column: &golsql.ColumnID{
					FieldName:  "Width",
					DomainName: "otherStuff",
				},
				Descending: false,
			},
		},
	}
	msg.Where = &golsql.Group{
		NegateOperator: true,
		Operator:       golsql.GroupOperator_OR,
		Elements: []*golsql.GroupElement{
			{
				Element: &golsql.GroupElement_Field{
					Field: &golsql.Field{
						Column: &golsql.ColumnID{
							FieldName: "Name",
						},
						NegateComparator: true,
						Comparator:       golsql.Comparator_FUZZY_EQUAL,
						Value: &golsql.Field_StringValue{
							StringValue: "abcd",
						},
					},
				},
			},
			{
				Element: &golsql.GroupElement_Group{
					Group: &golsql.Group{
						NegateOperator: false,
						Operator:       golsql.GroupOperator_XOR,
						Elements: []*golsql.GroupElement{
							{
								Element: &golsql.GroupElement_Field{
									Field: &golsql.Field{
										Column: &golsql.ColumnID{
											FieldName: "Width",
										},
										NegateComparator: false,
										Comparator:       golsql.Comparator_GREATER_THAN,
										Value: &golsql.Field_DoubleValue{
											DoubleValue: 889.531,
										},
									},
								},
							},
							{
								Element: &golsql.GroupElement_Group{
									Group: &golsql.Group{
										NegateOperator: true,
										Operator:       golsql.GroupOperator_UNKNOWN_GROUPOPERATOR,
										Elements: []*golsql.GroupElement{
											{
												Element: &golsql.GroupElement_Field{
													Field: &golsql.Field{
														Column: &golsql.ColumnID{
															FieldName: "Name",
														},
														NegateComparator: true,
														Comparator:       golsql.Comparator_FUZZY_EQUAL,
														Value: &golsql.Field_StringValue{
															StringValue: "abcd",
														},
													},
												},
											},
											{
												Element: &golsql.GroupElement_Group{
													Group: &golsql.Group{
														NegateOperator: false,
														Operator:       golsql.GroupOperator_XOR,
														Elements: []*golsql.GroupElement{
															{
																Element: &golsql.GroupElement_Field{
																	Field: &golsql.Field{
																		Column: &golsql.ColumnID{
																			FieldName: "Width",
																		},
																		NegateComparator: false,
																		Comparator:       golsql.Comparator_UNKNOWN_COMPARATOR,
																		Value: &golsql.Field_DoubleValue{
																			DoubleValue: 889.531,
																		},
																	},
																},
															},
														},
													},
												},
											},
											{
												Element: &golsql.GroupElement_Field{
													Field: &golsql.Field{
														Column: &golsql.ColumnID{
															FieldName: "Created",
														},
														Comparator: golsql.Comparator_LESS_THAN_OR_EQUAL,
														Value: &golsql.Field_TimeValue{
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
