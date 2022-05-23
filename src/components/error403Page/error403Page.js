import {useState, useEffect} from 'react';
import useGitHubService from '../../services/GitHubService';
import img403 from './403.png';
import './error403Page.css';

const Error403Page = () => {

    const [ret, setRet] = useState(0);
    const {getRateLimitRemaining} = useGitHubService();

    const onRateLoaded = (ret) => {
        setRet(ret);
    }
    
    let hour = new Date(+ret * 1000).getHours();
    let minute = new Date(+ret * 1000).getMinutes();
    let second = new Date(+ret * 1000).getSeconds();

    const transformTime = (item) =>{
        return item<10 ? `0${item}`: item
    }

    useEffect(()=> {
        getRateLimitRemaining().then(onRateLoaded)
    },[])        

    return (
        <div className="error">
            <img src={img403} alt="Error"/>
            <span>GitHub API request limit exceeded</span> 
            <span>Please try again in {transformTime(hour)}:{transformTime(minute)}:{transformTime(second)}</span>               
        </div>
    )
}

export default Error403Page;