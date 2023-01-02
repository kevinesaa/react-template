import React from 'react';
import * as MaterialUI from "@mui/material";
import TableHeaderCell from './TableHeaderCell';


export default function TableHeader(props) {

    const columns = props.columns ? props.columns:[];
     
    return (
        <MaterialUI.TableHead>
            <MaterialUI.TableRow>
                { columns.map((item,index ) => <TableHeaderCell key={index} title={item.title} />) }
            </MaterialUI.TableRow>
        </MaterialUI.TableHead>
    );
}