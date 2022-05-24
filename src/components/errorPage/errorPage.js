import DisconnectedPage from '../disconnectedPage/disconnectedPage';
import Error403Page from '../error403Page/error403Page';


const ErrorPage = ({error, notFoundPage}) =>{

        switch(+error.split('status: ')[1]){
            case 0: 
                return <DisconnectedPage/>
            case 400:  
                return <>{notFoundPage}</>
            case 403:      
                return <Error403Page/>
            case 404:
                return <>{notFoundPage}</>
            default: return null;
          }
}   
export default ErrorPage;