import { Component } from 'react';
import './App.css';
import Header from './components/header/header.js';
import InitialPage from './components/initialPage/initialPage';
import UserNotFoundPage from './components/userNotFoundPage/userNotFoundPage';
import Spinner from './components/spinner/spinner';
import GitHubService from './services/GitHubService';
import ErrorMessage from './components/errorMessage/errorMessage';
import DisconnectedPage from './components/disconnectedPage/disconnectedPage';
import Content from './components/content/content';

class App extends Component{

  state = {
      searchUsername:"",
      initState:true,
      userNotFound: false,
      loading: false,
      error:false,
      errorStatus: 200,
      disconnected: false,
      user:{}
  }

  gitHubService = new GitHubService();

  onError = (error) => {
    switch(error.status){
      case 0:   this.setState({    
                    searchUsername:"",
                    initState:false,
                    userNotFound:false,
                    loading:false,                
                    error:false,                                       
                    errorStatus:0,
                    disconnected: true});
                break;
      case 400: 
                this.setState({
                    searchUsername:"",
                    initState:false,
                    userNotFound:true,
                    loading:false, 
                    error:true,                    
                    errorStatus:400,                    
                    disconnected: false});
                break;
      case 403: 
                this.setState({
                    searchUsername:"",
                    loading:false, 
                    error:true,                    
                    errorStatus:403,
                    disconnected: false});
                break;
      case 404:
                this.setState({
                    searchUsername:"", 
                    loading:false,
                    userNotFound:true,
                    errorStatus:404,
                    disconnected: false});
                break;
      default: break;
    }
  }

  onUserLoaded = (user) => {
    this.setState({
        user, 
        searchUsername:"", 
        loading: false, 
        userNotFound: false,
        error:false,
        errorStatus:200,
        disconnected: false
    })
  }

  onLoadingSpinner = () =>{
    this.setState({loading:true});
  }

  updateUser = (username) =>{

    this.onLoadingSpinner();
    
    this.gitHubService
          .getUser(username)
          .then(this.onUserLoaded)
          .catch(this.onError);           
  }

  onSearchUserApp = (search) => {
    if(search === ''){
        this.setState({
              initState: true,
              userNotFound:false,
              error: false,
              disconnected: false,
              searchUsername: search        
        });
    }else{
        this.setState({
              initState: false,
              error: false,
              disconnected: false,
              searchUsername: search
        });     
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.searchUsername !== this.state.searchUsername) {
      if(this.state.searchUsername !== '')
        this.updateUser(this.state.searchUsername);
    }
  }

  render(){
    console.log('App.js render()');
    const {initState, userNotFound, loading, error, user, disconnected} = this.state;
    const disconnectedPage = disconnected ? <DisconnectedPage/> : null;
    const initPage = initState ? <InitialPage/> : null;
    const userNotFoundPage = userNotFound ? <UserNotFoundPage/> : null; 
    const errorPage = error ? <ErrorMessage errorStatus={this.state.errorStatus}/> : null;  
    const spinner = loading ? <Spinner/>:null; 
    const content = !(initState || error || userNotFound || loading || disconnected) ? <Content user={user}/> : null;
    
    return (
        <div className="App">
              <Header onSearchUserApp={this.onSearchUserApp}/>
              {spinner}
              <div>
                {disconnectedPage}
                {initPage}
                {userNotFoundPage}
                {errorPage}              
                {content}
              </div>
        </div>
      )
  }  
}

export default App;
