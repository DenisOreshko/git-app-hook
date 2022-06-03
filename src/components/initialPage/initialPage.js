import {useEffect,useContext} from 'react';
import {LoginContext} from '../../context/index.js';
import './initialPage.css';
import InitIcoSvg from './initIcosvg';

const InitialPage = () => {
    const {loginContext, setLoginContext} = useContext(LoginContext);

    useEffect(()=>{
        setLoginContext('');
    },[])

    return (
        <div className="main-init-container">
            <div className="big-search">
                <InitIcoSvg/>
                <span>Start with searching a GitHub user</span>
            </div>
        </div>
    )
}

export default InitialPage;