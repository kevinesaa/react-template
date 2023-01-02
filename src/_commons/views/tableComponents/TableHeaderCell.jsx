import React from 'react';
import * as MaterialUI from "@mui/material";


export default function TableHeaderCell(props) {

    return (
        <MaterialUI.TableCell component="th" className="sort" align="center">
          <span>
            <b>{props.title}</b>
          </span>
        </MaterialUI.TableCell>
    );
}
