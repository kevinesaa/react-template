import * as MaterialUI from "@mui/material";


export default function CustomMessageDialog(props) {
    
    return (<>
        <MaterialUI.Dialog
            open={props.open}
            onClose={props.onClose}>

            <MaterialUI.DialogTitle >
                
                <MaterialUI.Stack 
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                
                    <MaterialUI.Typography variant="h6" >
                        {" "}
                    </MaterialUI.Typography>

                    <MaterialUI.Button size="small" color="error" onClick={props.onClose}>X</MaterialUI.Button>
                </MaterialUI.Stack>
            
            </MaterialUI.DialogTitle>
            
            <MaterialUI.DialogContent dividers={false} sx={{ width: 350 }}>
                
                <MaterialUI.Typography variant="body1" >
                    {props.message}
                </MaterialUI.Typography>
            </MaterialUI.DialogContent>
            
        </MaterialUI.Dialog>
    </>);
}