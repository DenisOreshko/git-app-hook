import {useEffect, useState, lazy, Suspense} from 'react';
import {useParams} from 'react-router-dom';
import useGitHubService from '../../services/GitHubService.js';
import Content from '../content/content.js';
import Spinner from '../spinner/spinner.js';
import ErrorPage from '../errorPage/errorPage.js';

const UserNotFoundPage = lazy(()=> import('../userNotFoundPage/userNotFoundPage.js'));

const ContentLoadPage = () => {

    const {loading, error, getUser, clearError} = useGitHubService();
    const [user, setUser] = useState({});

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
        getUser(login).then(onUserLoaded).catch(onError); 
    }
    
    const updateUser = (login) =>{  
        if(login === '') return;
        onRequest(login);        
    }

    useEffect(()=>{
        updateUser(login); 
    },[login]);  

    const spinner = loading ? <Spinner/>:null;
    const content = !(error || !user.login) ? <Content user={user}/> : null; 
    const errorPage = error ? <ErrorPage error={error} notFoundPage={<UserNotFoundPage/>} /> : null;  

    //console.log('render ContentLoadPage.js');

    return (
        <Suspense fullback={<span>Loading...</span>}>
            <>
                {spinner}
                {content}
                {errorPage}
            </>
        </Suspense>
    )
}

export default ContentLoadPage;