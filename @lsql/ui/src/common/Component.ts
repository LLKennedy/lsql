import React from "react";
import "./styles.css";

export class Component<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> { };

export interface FunctionComponent<P = {}> extends React.FunctionComponent<P> { };