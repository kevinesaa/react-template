
import LoadingScreen from '../../../_commons/views/LoadingScreen';


export default function RootPath(props) {

    if(props.sessionChecker) {
        setTimeout(() =>{
            props.sessionChecker();
        }, 3000);
    }
    return (<>
        <LoadingScreen loading={true}/>
    </>);
}