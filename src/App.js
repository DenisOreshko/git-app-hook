import {useEffect, useState} from 'react';
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

  const onRequest = (username) => {
    getUser(username).then(onUserLoaded)  
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

  useEffect(()=>{
    updateUser(searchUsername);
  },[searchUsername])  

  const initPage = initState ? <InitialPage/> : null;
  const spinner = loading ? <Spinner/>:null; 
  const errorPage = error && !initState ? <ErrorPage error={error} notFoundPage={<UserNotFoundPage/>} /> : null; 
  const content = !(initState || loading || error || !user.login) ? <Content user={user}/> : null;
  return (
    <div className="App">
          <Header onSearchUserApp={onSearchUserApp}/>
          {spinner}
          <div>
            {initPage}
            {content}
            {errorPage}
          </div>
    </div>
  )
}

export default App;
