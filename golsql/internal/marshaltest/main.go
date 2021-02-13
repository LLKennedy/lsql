package main

import (
	"log"
	"time"

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
	domain := &golsql.Domain{
		Name: "TestModel",
		Properties: map[string]*golsql.PropertyInformation{
			"Name": {
				DisplayName: "Object Name",
				TypeAndLimits: &golsql.PropertyInformation_String_{
					String_: &golsql.StringPropertyType{
						LengthMinimum:        0,
						LengthMaximum:        1000,
						CharacterSet:         "*",
						QueryValidationRegex: "[a-zA-Z0-9]*",
					},
				},
			},
			"Stuff": {
				DisplayName: "Is Stuff",
				TypeAndLimits: &golsql.PropertyInformation_Bool{
					Bool: &golsql.BoolPropertyType{},
				},
			},
			"Width": {
				DisplayName: "Width",
				TypeAndLimits: &golsql.PropertyInformation_Double{
					Double: &golsql.DoublePropertyType{
						MinimumValue: -1000,
						MaximumValue: 2000000000,
					},
				},
			},
			"Height": {
				DisplayName: "Height",
				TypeAndLimits: &golsql.PropertyInformation_Int64{
					Int64: &golsql.Int64PropertyType{
						MinimumValue: -1000,
						MaximumValue: 2000000000,
					},
				},
			},
			"Length": {
				DisplayName: "Length",
				TypeAndLimits: &golsql.PropertyInformation_Uint64{
					Uint64: &golsql.Uint64PropertyType{
						MinimumValue: 0,
						MaximumValue: 1000,
					},
				},
			},
			"Data": {
				DisplayName: "Data",
				TypeAndLimits: &golsql.PropertyInformation_Bytes{
					Bytes: &golsql.BytesPropertyType{
						LengthMinimum: 0,
						LengthMaximum: 1000,
					},
				},
			},
			"Created": {
				DisplayName: "Date Created",
				TypeAndLimits: &golsql.PropertyInformation_Timestamp{
					Timestamp: &golsql.TimestampPropertyType{
						MaximumValue: timestamppb.New(time.Date(3000, 1, 1, 0, 0, 0, 0, time.UTC)),
					},
				},
			},
		},
	}
	data, err = protojson.Marshal(domain)
	if err != nil {
		log.Fatalf("%v", err)
	}
	log.Printf("%s\n\n", data)
}
