import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useGitHubService from '../../services/GitHubService.js';
import Content from '../content/content.js';
import ErrorPage from '../errorPage/errorPage.js';
import UserNotFoundPage from '../userNotFoundPage/userNotFoundPage.js';
import Spinner from '../spinner/spinner.js';

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
    }
    
    const onRequest = (login) => {
        getUser(login).then(onUserLoaded).catch(onError); 
    }
    
    const updateUser = (login) =>{  
        if(login === '') return;
        onRequest(login);        
    }

    useEffect(()=>{
        console.log('ContentLoadPage useEffect');
        updateUser(login); 
    },[login])  

    const spinner = loading ? <Spinner/>:null;
    const content = !(error || !user.login) ? <Content user={user}/> : null; 
    const errorPage = error ? <ErrorPage error={error} notFoundPage={<UserNotFoundPage/>} /> : null;  

    //console.log('user spinner loading = ' + loading);

    return (
        <>
            {spinner}
            {content}
            {errorPage}
        </>
    )
}

export default ContentLoadPage;