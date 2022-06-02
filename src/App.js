import {useEffect, useState, lazy, Suspense} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import InitialPage from './components/initialPage/initialPage';
import useGitHubService from './services/GitHubService';
import ContentLoadPage from './components/contentLoadPage/contentLoadPage.js';

const UserNotFoundPage = lazy(()=> import('./components/userNotFoundPage/userNotFoundPage'));

const App = () => {
  const [searchUsername, setSearchUsername] = useState('');
  const navigate = useNavigate();
  const {error, clearError} = useGitHubService(); 

  const onSearchUserApp = (search) => {
    if(error){
      console.log(`onSearchUserApp() error ${error}`);      
    } 
    clearError();
    localStorage.setItem('path', search);
    setSearchUsername(search);  
  }

  useEffect(()=>{
    if(localStorage.getItem('path'))
      navigate(`/${localStorage.getItem('path')}`);
    else
      navigate(`/${searchUsername}`); 
  },[searchUsername]); 

  return (  
        <div className="App">
              <Header onSearchUserApp={onSearchUserApp}/>
              <div>
                <Suspense fullback={<span>Loading...</span>}>
                    <Routes> 
                      <Route exact path="/" element={<InitialPage/>}/> 
                      <Route exact path="/:login" element={<ContentLoadPage/>}/>           
                      <Route path="*" element={<UserNotFoundPage/>}/>                  
                    </Routes>
                </Suspense>                
              </div>
        </div>
  )
}

export default App;
