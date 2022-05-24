import './disconnectedPage.css';
import DisconnectedIcon  from './disconnectedIcon';

const DisconnectedPage = () => {
    return(
        <div className="disconnected-container">            
            <DisconnectedIcon/>
            <span>Internet Disconnected </span>
        </div>
    )
}

export default DisconnectedPage;