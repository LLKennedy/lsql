import React from "react";

export class Component<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> { };

export interface FunctionComponent<P = {}> extends React.FunctionComponent<P> { };