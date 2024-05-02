"use client";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App/App";
import * as React from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import Voiture from "../Voiture/Voiture";
import { t } from "i18next";



function BreadcrumbC(props) {

  console.log(props.breadVoiture)

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/" icon={HiHome}>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/liste-voitures">{t('autos_menu')}</Breadcrumb.Item>
      <Breadcrumb.Item>{props.breadVoiture.marque} {props.breadVoiture.modele} {props.breadVoiture.annee}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbC;
