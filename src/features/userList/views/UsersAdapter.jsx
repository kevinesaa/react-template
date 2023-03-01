import UserHolder from "./UserHolder";


export default function UsersAdapter(props) 
{
    
    return (<>
        {props.items == null || props.items.length == 0 ? <></> : 
            props.items
                .map((item,index ) => {  
                    return (
                            <UserHolder 
                                key={`user-${index}`} 
                                onItemClick={props.onItemClickListener} 
                                item={{
                                    userName:item.NOMBRE,
                                    userLastName:item.APELLIDO,
                                    email:item.CORREO,
                                }}/>
                            ) 
                })
        }
    </>);
}