import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import InitialPage from './components/initialPage/initialPage';
import useGitHubService from './services/GitHubService';
import ContentLoadPage from './components/contentLoadPage/contentLoadPage.js';

import UserNotFoundPage from './components/userNotFoundPage/userNotFoundPage';

const App = () => {
  const [searchUsername, setSearchUsername] = useState('');
  const {clearError} = useGitHubService();
  const navigate = useNavigate();

  const onSearchUserApp = (search) => {
    clearError();
    setSearchUsername(search);  
  }

  useEffect(()=>{
    navigate(`/${searchUsername}`);
  },[searchUsername]); 
  
  return (  
        <div className="App">
              <Header onSearchUserApp={onSearchUserApp}/>
              <div>
                <Routes> 
                  <Route exact path="/" element={<InitialPage/>}/> 
                  <Route exact path="/:login" element={<ContentLoadPage/>}/>           
                  <Route path="*" element={<UserNotFoundPage/>}/>                  
                </Routes>                
              </div>
        </div>
  )
}

export default App;
