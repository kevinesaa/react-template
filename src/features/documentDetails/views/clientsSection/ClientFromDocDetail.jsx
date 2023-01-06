import * as MaterialUI from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from "react";
import TableHeader from "../../../../_commons/views/tableComponents/TableHeader";

function OneClient(props) {

    return (
        <>
            <MaterialUI.Typography variant="body2">
                    <b>Cliente</b>
            </MaterialUI.Typography>
            <MaterialUI.Box sx={{ p: 2 }}>
                <MaterialUI.Stack direction="row" spacing={2}>
                    <MaterialUI.Typography variant="body2">{props.name}</MaterialUI.Typography>
                    <MaterialUI.Typography variant="body2"><b>RIF: </b>{props.dni}</MaterialUI.Typography>
                    <MaterialUI.Typography variant="body2"><b>Código: </b>{props.code}</MaterialUI.Typography>
                </MaterialUI.Stack>
            </MaterialUI.Box>
        </>
    );
}


function ClientItemHolder(props) {

    return (
        <MaterialUI.TableRow >
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.name}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.dni}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.code}
            </MaterialUI.TableCell>
        </MaterialUI.TableRow>
    );
}

export default function ClientFromDocDetail(props) {
    
    const clients = props.clients?props.clients:[];
    const [showClient,setShowClients] = useState(false);
    
    const handleClickShowClients = () => {
        setShowClients(!showClient);
    }

    return (
        <>
            {clients.length === 0 ? 
                    <>
                        <MaterialUI.Typography variant="body2">
                            <b>Cliente no encontrado</b>
                        </MaterialUI.Typography>
                    </> :
            clients.length === 1 ?
                <><OneClient 
                    name={props.clients[0].RAZON_SOCIAL_CLIENTE}
                    dni={props.clients[0].RIF_CLIENTE}
                    code={props.clients[0].CODIGO_DE_CLIENTE} />
                    
                </>  : 
                <>
                    <MaterialUI.Box >
                        <MaterialUI.Stack 
                            alignItems="center" 
                            direction="row" 
                            spacing={1}>
                            
                            <MaterialUI.Typography variant="body2">
                                <b>Clientes</b>
                            </MaterialUI.Typography>
                            <MaterialUI.Chip
                                 variant="outlined"
                                 icon={showClient? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}
                                 onClick={handleClickShowClients} 
                            />
                        </MaterialUI.Stack>
                    </MaterialUI.Box>
                    
                    {!showClient?<></>: 
                        <MaterialUI.TableContainer sx={{ maxHeight: 250 }}>
                            <MaterialUI.Table
                                stickyHeader
                                aria-label="sticky table"
                                size="small">
                                
                                <TableHeader columns={[{title:"RIF"},{title:"Cliente"},{title:"Código"}]}/>
                                <MaterialUI.TableBody>
                                    {
                                        clients.map((item,index) => 
                                            <ClientItemHolder 
                                                key={`client-${index}`}
                                                name={item.RAZON_SOCIAL_CLIENTE}
                                                dni={item.RIF_CLIENTE}
                                                code={item.CODIGO_DE_CLIENTE}
                                            />
                                        )
                                    }

                                </MaterialUI.TableBody>
                            </MaterialUI.Table>
                        </MaterialUI.TableContainer>
                    }
                </>
            }
        </>
    );
}
