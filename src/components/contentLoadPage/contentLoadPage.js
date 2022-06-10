import {useEffect, useState, lazy, Suspense, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {LoginContext} from '../../context/index.js';
import useGitHubService from '../../services/GitHubService.js';
import Content from '../content/content.js';
import Spinner from '../spinner/spinner.js';
import ErrorPage from '../errorPage/errorPage.js';

const UserNotFoundPage = lazy(()=> import('../userNotFoundPage/userNotFoundPage.js'));

const ContentLoadPage = () => {

    const {loading, error, getUser, clearError, process, setProcess} = useGitHubService();
    const [user, setUser] = useState({});
    const {loginContext, setLoginContext} = useContext(LoginContext);

    let {login} = useParams();

    const onUserLoaded = (user) => {
        clearError();
        setUser(user);        
    }
    
    const onError = (e) =>{
        console.log(e);
        setUser({});
    }
    
    const onRequest = (login) => {
        getUser(login)
            .then(onUserLoaded)
            .then(()=>setProcess('confirmed'))
            .catch(onError); 
    }
    
    const updateUser = (login) =>{  
        if(login === '') return;
        onRequest(login);        
    }

    useEffect(()=>{
        setLoginContext(login);
        updateUser(login); 
    },[login]);  

    const setContent = (process, user) =>{
        switch(process){
            case 'waiting': 
                return null;

            case 'loading': 
                return <Spinner/>;

            case 'confirmed': 
                return <Content user={user}/>;

            case 'error':
                return <ErrorPage error={error} notFoundPage={<UserNotFoundPage/>}/>;

            default:
                throw new Error('Unexpected process state');            
        }
    }
    return (
        <Suspense fullback={<span>Loading...</span>}>
            <>
                {setContent(process, user)}
            </>
        </Suspense>
    )
}

export default ContentLoadPage;