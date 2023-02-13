import React from "react";
import * as MaterialUI from "@mui/material";
import Strings from "../../../_Resources/strings/strings";

export default class LogoutView extends React.Component {

    constructor(props) {
        super(props);
        this.viewModel = props.viewModel;
        this.handledOnNegativeOption = this.handledOnNegativeOption.bind(this);
    }
    
    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    handledOnNegativeOption() {
        if(this.props.onNegativeOptionListener){
            this.props.onNegativeOptionListener();
        }
    }

    render() {
        return (<>
            <MaterialUI.Dialog
                open={this.props.open} >
                
                <MaterialUI.DialogTitle >
                    {Strings.logout_view_title}
                </MaterialUI.DialogTitle>
                
                <MaterialUI.DialogContent dividers={true} sx={{ minWidth: 300 }}>
                    
                    <MaterialUI.Typography variant="body1">
                        <b>{Strings.logout_view_message}</b>
                    </MaterialUI.Typography>
                    <MaterialUI.Box >
                        <MaterialUI.Stack alignItems="center" direction="row" spacing={1}>
                            <MaterialUI.Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    px: 5,
                                    mt: 1,
                                    mb: 1,
                                    borderRadius: "1rem",
                                    color: "white.main",
                                    textTransform: "none",
                                }}>
                                {Strings.text_yes}
                            </MaterialUI.Button>

                            <MaterialUI.Button
                                onClick={this.handledOnNegativeOption}
                                fullWidth
                                variant="contained"
                                sx={{
                                    px: 5,
                                    mt: 1,
                                    mb: 1,
                                    borderRadius: "1rem",
                                    color: "white.main",
                                    textTransform: "none",
                                }}>
                                {Strings.text_no}
                            </MaterialUI.Button>

                        </MaterialUI.Stack>
                    </MaterialUI.Box >
                </MaterialUI.DialogContent>
            </MaterialUI.Dialog>
        </>); 
    }
}