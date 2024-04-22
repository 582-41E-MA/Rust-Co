import './Client.css';
import React, { useState } from 'react';
import { useContext } from "react";
import { AppContext } from "../App/App";
import { t } from "i18next";

function Client(props){
console.log(props)

    return(
        <div>
            <div>user : {props.logging.utilisateur}</div>
            <div>privilege : {props.logging.privilege}</div>
        </div>
        
    )
}

export default Client