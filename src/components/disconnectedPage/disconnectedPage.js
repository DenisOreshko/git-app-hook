import './disconnectedPage.css';
import imgDisconnected from './icons8-wi-fi-off-96.png'

const DisconnectedPage = () => {
    return(
        <div className="disconnected-container">            
            <img src={imgDisconnected} alt="disconnected"/>
            <span>Internet Disconnected </span>
        </div>
    )
}

export default DisconnectedPage;