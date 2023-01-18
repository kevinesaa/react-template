import * as MaterialUI from "@mui/material";


export default function CustomButtonForm(props) {

    
    return (<>
        <MaterialUI.Grid item xs={12} sm={12} md={3} lg={2}>
            <MaterialUI.Paper elevation={0} align="center">
                <MaterialUI.Button
                    type={"submit"}
                    
                    align="center"
                    variant="contained"
                    sx={{
                        px: 5,
                        mt: 1,
                        mb: 1,
                        borderRadius: "1rem",
                        color: "white.main",
                        textTransform: "none",
                    }}
                >
                    {props.text}
                </MaterialUI.Button>
            </MaterialUI.Paper>
        </MaterialUI.Grid>
    </>);
        
}