import './userNotFoundPage.css';
import img from './user.svg';

const UserNotFoundPage = () => {
    return (
        <div className="main-usernotfound-container">
            <div className="user_not_found">
                <img src={img} alt="user_not_found"/>
                <span>User not found</span>
            </div>
        </div>
    )
}

export default UserNotFoundPage;