import './initialPage.css';
import InitIcoSvg from './initIcosvg';

const InitialPage = () => {
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