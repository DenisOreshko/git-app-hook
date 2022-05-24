import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import InitialPage from './components/initialPage/initialPage';
import UserNotFoundPage from './components/userNotFoundPage/userNotFoundPage';
import Spinner from './components/spinner/spinner';
import useGitHubService from './services/GitHubService';
import ErrorPage from './components/errorPage/errorPage';
import Content from './components/content/content';

const App = () => {
  const [searchUsername, setSearchUsername] = useState('');
  const [user, setUser] = useState({});
  const [initState, setInitState] = useState(true);
  const {loading, error, getUser, clearError} = useGitHubService();

  const onUserLoaded = (user) => {
    clearError();
    setUser(user);
    setSearchUsername('');  
  }

  const onError = (e) =>{
    setSearchUsername('');
  }

  const onRequest = (username) => {
    getUser(username).then(onUserLoaded).catch(onError); 
  }

  const updateUser = (username) =>{  
    if(username === '') return;
    onRequest(username);        
  }

  const onSearchUserApp = (search) => {
    setUser({});
    setInitState(search === '');
    setSearchUsername(search);  
  }

  const initPage = initState ? <InitialPage/> : null;
  const spinner = loading ? <Spinner/>:null; 
  const errorPage = error && !initState ? <ErrorPage error={error} notFoundPage={<UserNotFoundPage/>} /> : null; 
  const content = !(initState || loading || error || !user.login) ? <Content user={user}/> : null;

  const navigate = useNavigate();

  useEffect(()=>{
    updateUser(searchUsername);

  },[searchUsername])   

  return (  
        <div className="App">
              <Header onSearchUserApp={onSearchUserApp}/>
              {spinner}
              <div>
                <Routes> 
                  <Route path="/" element={
                        <>
                          {initPage}
                          {content}
                          {errorPage}
                        </>
                  }/>                 
                  <Route path="*" element={<UserNotFoundPage/>}/>                  
                </Routes>                
              </div>
        </div>
  )
}

export default App;
