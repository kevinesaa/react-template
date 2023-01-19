import * as MaterialUI from "@mui/material";
import LoadingScreen from "./LoadingScreen";

export default function FeatureContainer(props) {

    return (<>
        <MaterialUI.Paper
            elevation={2}
            sx={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "5px",
                pb: 5,
            }}>
                
                <MaterialUI.Grid item sx={{ pt: 2, pl: 2 }}>
                    <MaterialUI.Typography variant="subtitles">
                        {props.title_text}
                    </MaterialUI.Typography>
                </MaterialUI.Grid>
                <MaterialUI.Divider variant="middle"/>
                {props.children}
        </MaterialUI.Paper>

        <LoadingScreen loading={props.loading}/>
    </>)

}