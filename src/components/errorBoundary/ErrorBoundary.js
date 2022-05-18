import {useState, useEffect} from 'react'; 
import ErrorBoundaryMessage from '../errorBoundaryMessage/errorBoundaryMessage';

const ErrorBoundary = (props) => {
    const [error, setError] = useState(false);

    useEffect((error, errorInfo)=>{
        console.log('error: '+ error +', errorInfo: ' + errorInfo);
        //setError(true);
    },[error]);

    if (error){
        return <ErrorBoundaryMessage/>
    }
    return props.children;
}

export default ErrorBoundary;