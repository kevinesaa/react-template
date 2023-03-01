import * as MaterialUI from "@mui/material";

export default function UserHolder(props) 
{
    const handleClick = (item) => {
        
        if(props.onItemClick) {
            props.onItemClick(item)
        }
    }
    const item = props.item;
    
    return (
        <MaterialUI.TableRow hover onClick={event => handleClick(item)}>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {item.userName}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {item.userLastName}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {item.email}
            </MaterialUI.TableCell>
        </MaterialUI.TableRow>
    );
}