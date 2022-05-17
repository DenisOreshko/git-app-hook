import { Component } from 'react';
import GitHubService from '../../services/GitHubService';
import img403 from './403.png';
import './errorMessage.css';

class ErrorMessage extends  Component{

    state = { 
        reset: 0
    }

    gitHubService = new GitHubService();

    onRateLoaded = (reset) => {
        this.setState({reset})
    }

    componentDidMount(){
        this.gitHubService
            .getRateLimitRemaining()
            .then(this.onRateLoaded)    
    }

    render(){
        let hour = new Date(+this.state.reset * 1000).getHours();
        let minute = new Date(+this.state.reset * 1000).getMinutes();
        let second = new Date(+this.state.reset * 1000).getSeconds();
        
        return(
            <div className="error">
                <img src={img403} alt="Error"/>
                <span>GitHub API request limit exceeded</span> 
                <span>Please try again in {hour}:{minute}:{second}</span>               
            </div>
            
        )
    }    
}

export default ErrorMessage;