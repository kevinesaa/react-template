import { Component } from "react";
import * as MaterialUI from "@mui/material";

export default function TitleSection(props) {

  return (<>
    <MaterialUI.Grid align="center">
      <MaterialUI.Typography variant="subtitles">
          {props.text}
      </MaterialUI.Typography>
    </MaterialUI.Grid>
    
  </>);
}
