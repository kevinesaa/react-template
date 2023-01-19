import * as MaterialUI from "@mui/material";

export default function UserHolder(props) 
{
    const handleClick = (item) => {
        
        if(props.onItemClick) {
            props.onItemClick(item)
        }
    }

    return (
        <MaterialUI.TableRow hover onClick={event => handleClick(props.item)}>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.userName}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.userLastName}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.email}
            </MaterialUI.TableCell>
        </MaterialUI.TableRow>
    );
}