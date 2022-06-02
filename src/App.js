import {useEffect, useState, lazy, Suspense} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import InitialPage from './components/initialPage/initialPage';
import useGitHubService from './services/GitHubService';
import ContentLoadPage from './components/contentLoadPage/contentLoadPage.js';
import About from './pages/About';

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
    if(search === ''){
      navigate(`/`);
    }else{
      navigate(`/users/${search}`);
    }    
    setSearchUsername(search);  
  }

  // useEffect(()=>{
  //   if(localStorage.getItem('path')){
  //     //navigate(`/${localStorage.getItem('path')}`);
  //   }
  //   else{
  //     //navigate(`/${searchUsername}`); 
  //   }
      
  // },[searchUsername]); 
console.log('render App.js');
  return (  
        <div className="App">
              <Header onSearchUserApp={onSearchUserApp}/>
              <div>
                <Suspense fullback={<span>Loading...</span>}>
                    <Routes> 
                      <Route exact path="/" element={<InitialPage/>}/>
                      <Route exact path="/about" element={<About/>}/>  
                      <Route exact path="/users/:login" element={<ContentLoadPage/>}/>           
                      <Route path="*" element={<UserNotFoundPage/>}/>                  
                    </Routes>
                </Suspense>                
              </div>
        </div>
  )
}

export default App;
