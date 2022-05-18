import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/header.js';
import InitialPage from './components/initialPage/initialPage';
import UserNotFoundPage from './components/userNotFoundPage/userNotFoundPage';
import Spinner from './components/spinner/spinner';
import GitHubService from './services/GitHubService';
import Error403Message from './components/error403Message/error403Message';
import DisconnectedPage from './components/disconnectedPage/disconnectedPage';
import Content from './components/content/content';

const App = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [initState, setInitState] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error403, setError403] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [user, setUser] = useState({});

  const gitHubService = new GitHubService();

  const onError = (error) => {

    switch(error.status){
      case 0:   
          setSearchUsername("");
          setInitState(false);
          setUserNotFound(false);
          setLoading(false);
          setError403(false);
          setDisconnected(true);
          break;
      case 400: 
          setSearchUsername("");
          setInitState(false);
          setUserNotFound(true);
          setLoading(false);
          setError403(false);
          setDisconnected(false);
          break;
      case 403:
          setSearchUsername("");
          setLoading(false);
          setError403(true);
          setDisconnected(false); 
          break;
      case 404:
          setSearchUsername("");
          setLoading(false);
          setUserNotFound(true);
          setError403(false);
          setDisconnected(false);
          break;
      default: break;
    }
  }

  const onUserLoaded = (user) => {
    setUser(user);
    setSearchUsername("");
    setLoading(false);
    setUserNotFound(false);
    setError403(false);
    setDisconnected(false);
  }

  const onLoadingSpinner = () =>{
    setLoading(true);
  }

  const updateUser = (username) =>{  
    if(username === ""){   
       return;
    }  

    onLoadingSpinner();

    gitHubService
    .getUser(username)
    .then(onUserLoaded)
    .catch(onError);         
  }

  const onSearchUserApp = (search) => {
    if(search === ''){
      setSearchUsername(search);
      setInitState(true);
      setUserNotFound(false);      
      setError403(false);
      setDisconnected(false);
    }else{
      setSearchUsername(search);
      setInitState(false);      
      setError403(false);
      setDisconnected(false);    
    }
  }

  useEffect(()=>{
    updateUser(searchUsername);
  },[searchUsername])

  const disconnectedPage = disconnected ? <DisconnectedPage/> : null;
  const initPage = initState ? <InitialPage/> : null;
  const userNotFoundPage = userNotFound ? <UserNotFoundPage/> : null; 
  const error403Page = error403 ? <Error403Message/> : null;  
  const spinner = loading ? <Spinner/>:null; 
  const content = !(initState || error403 || userNotFound || loading || disconnected) ? <Content user={user}/> : null;
    
  return (
    <div className="App">
          <Header onSearchUserApp={onSearchUserApp}/>
          {spinner}
          <div>
            {disconnectedPage}
            {initPage}
            {userNotFoundPage}
            {error403Page}              
            {content}
          </div>
    </div>
  )
}

export default App;
