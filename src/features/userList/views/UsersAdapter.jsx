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
                                item={item}
                                onItemClick={props.onItemClickListener} />
                            ) 
                })
        }
    </>);
}