import React from 'react';
import * as MaterialUI from "@mui/material";


export default function TableBodyCell(props) {

    return (
        <MaterialUI.TableCell component="th" scope="row" align="center">
          {props.text}
        </MaterialUI.TableCell>
    );
}