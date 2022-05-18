import {Component, useState, useEffect} from 'react';
import GitHubService from '../../services/GitHubService';
import img403 from './403.png';
import './error403Message.css';

const Error403Message = () => {

    const [ret, setRet] = useState(0);
    const  gitHubService = new GitHubService();

    const onRateLoaded = (ret) => {
        setRet(ret);
    }
    
    let hour = new Date(+ret * 1000).getHours();
    let minute = new Date(+ret * 1000).getMinutes();
    let second = new Date(+ret * 1000).getSeconds();

    useEffect(()=> {
        gitHubService
        .getRateLimitRemaining()
        .then(onRateLoaded)}
        ,[ret])        

    return (
        <div className="error">
            <img src={img403} alt="Error"/>
            <span>GitHub API request limit exceeded</span> 
            <span>Please try again in {hour}:{minute}:{second}</span>               
        </div>
    )
}

export default Error403Message;