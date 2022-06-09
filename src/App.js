import {useEffect, useState, lazy, Suspense} from 'react';
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './App.css';
import Header from './components/header/header.js';
import InitialPage from './components/initialPage/initialPage';
import useGitHubService from './services/GitHubService';
import ContentLoadPage from './components/contentLoadPage/contentLoadPage.js';
import {LoginContext} from './context';
const UserNotFoundPage = lazy(()=> import('./components/userNotFoundPage/userNotFoundPage'));

const App = () => {
  const navigate = useNavigate();
  const {error, clearError} = useGitHubService(); 
  const onSearchUserApp = (search) => {
    if(error){
      console.log(`onSearchUserApp() error ${error}`);      
    } 
    clearError();    
    (search === '') ? navigate(`/`) : navigate(`/users/${search}`);  
  }

  const [loginContext, setLoginContext] = useState('');

  // const routes = [
  //   { path: '/', name: 'InitPage', Component: InitialPage },
  //   { path: '/users/:login', name: 'ContentLoadPage', Component: ContentLoadPage },
  //   { path: '*', name: 'UserNotFoundPage', Component: UserNotFoundPage },
  // ]
  const location = useLocation();
  return (  
    <LoginContext.Provider value={{
      loginContext,
      setLoginContext
    }}>
      <div className="App">
            <Header onSearchUserApp={onSearchUserApp}/>
            <div>
               <Suspense fullback={<span>Loading...</span>}>
                  {/* <TransitionGroup component={null}>
                    <CSSTransition key={location.key} timeout={500} classNames="fade" mountOnEnter unmountOnExit> */}
                      <Routes location={location}>
                          <Route exact path={'/'} element={<InitialPage className="fade"/>}/> 
                          <Route exact path={'/users/:login'} element={<ContentLoadPage className="fade"/>}/> 
                          <Route exact path={'*'} element={<UserNotFoundPage className="fade"/> }/>
                          {/* <Route exact path={'/about'} element={<About className="fade"/> }/>   */}
                      </Routes>
                    {/* </CSSTransition>
                  </TransitionGroup> */}
              </Suspense>                
            </div>
      </div>
    </LoginContext.Provider>
  )
}

const About = () =>{
  return (
    <div style={{height:"300px", background:'red'}}>About this application</div>
  )
}
export default App;
