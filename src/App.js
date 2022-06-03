import {useEffect, useState, lazy, Suspense} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import InitialPage from './components/initialPage/initialPage';
import useGitHubService from './services/GitHubService';
import ContentLoadPage from './components/contentLoadPage/contentLoadPage.js';
import { LoginContext } from './context';
const UserNotFoundPage = lazy(()=> import('./components/userNotFoundPage/userNotFoundPage'));

const App = () => {
  const navigate = useNavigate();
  const {error, clearError} = useGitHubService(); 
  const onSearchUserApp = (search) => {
    if(error){
      console.log(`onSearchUserApp() error ${error}`);      
    } 
    clearError();    
    //localStorage.setItem('path', search);
    (search === '') ? navigate(`/`) : navigate(`/users/${search}`);  
  }

  const [loginContext, setLoginContext] = useState('');

  return (  
      <LoginContext.Provider value={{
        loginContext,
        setLoginContext
      }}>
        <div className="App">
              <Header onSearchUserApp={onSearchUserApp}/>
              <div>
                <Suspense fullback={<span>Loading...</span>}>
                    <Routes> 
                      <Route exact path="/" element={<InitialPage/>}/>
                      <Route exact path="/users/:login" element={<ContentLoadPage/>}/>           
                      <Route path="*" element={<UserNotFoundPage/>}/>                  
                    </Routes>
                </Suspense>                
              </div>
        </div>
      </LoginContext.Provider>
  )
}

export default App;
