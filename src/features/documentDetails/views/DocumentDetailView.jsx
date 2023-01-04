import React from "react";
import * as MaterialUI from "@mui/material";

export default class DocumentDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.document = props.document;
        this.viewModel = props.viewModel;
    }
    
    componentDidMount() {
        
    }

    componentWillUnmount() { 

    }

    render() {
       return (<>
        <MaterialUI.Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            scroll={"paper"}>
                
                <MaterialUI.DialogTitle >
                    {`Detalles del documento`}
                </MaterialUI.DialogTitle>
                <MaterialUI.DialogContent dividers={true}>
                    
                </MaterialUI.DialogContent>

        </MaterialUI.Dialog>
      </>) 
    }
}