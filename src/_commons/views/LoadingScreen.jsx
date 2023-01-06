import * as MaterialUI from "@mui/material";

export default function LoadingScreen(props) {
  
  return ( <>
    {!props.loading? <></> :
      <>
        <MaterialUI.Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}>
            <MaterialUI.CircularProgress color="inherit" />
        </MaterialUI.Backdrop>
      </>}
  </>);
}