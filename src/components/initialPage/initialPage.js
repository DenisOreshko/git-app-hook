import {useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import {LoginContext} from '../../context/index.js';
import {Helmet} from "react-helmet";
import './initialPage.css';
import InitIcoSvg from './initIcosvg';

const InitialPage = () => {
    const {loginContext, setLoginContext} = useContext(LoginContext);

    useEffect(()=>{
        setLoginContext('');
    },[])

    return (
        <>
            <Helmet>
                <meta 
                    name="description" 
                    content="GitHub search user application"
                    />    
                <title>GitHub Search application</title>
            </Helmet>
            <div className="main-init-container">                
                <div className="big-search">
                    <InitIcoSvg/>
                    <span>Start with searching a GitHub user</span>
                </div>
            </div>
        </>
    )
}

export default InitialPage;