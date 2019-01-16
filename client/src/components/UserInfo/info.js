import React, { Component } from "react";
import './info.css';


const Userinfo = props => (
    <div className="card">
            <img alt={props.id} src={props.image} />
            <ul>Email: {props.email}</ul>
            <ul>Name: {props.name}</ul>
            <ul>ID: {props.id}</ul>
            <ul>Role: {props.role}</ul>
            {/* onclick assign role*/}
            <button onClick={() => props.clicked(props.id, 'Manager')}>Manager</button>
            <button onClick={() => props.clicked(props.id, 'Preparer')}>Preparer</button>
        </div>
);


export default Userinfo;