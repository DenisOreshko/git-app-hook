import iconFollowers from '../../resources/img/icon/shared.svg';
import iconFollowing from '../../resources/img/icon/provate.svg';

const ViewUser = ({user}) => {
    const {avatar_url, name, html_url, login, followers, following} = user;

    return (
        <div className="container-info">
            <img src={avatar_url} alt="avatar"/>
            <div className="info">
                <h1>{name}</h1>
                <a href={html_url} target="_blank" rel="noreferrer">{login}</a>
            </div>
            <div className="followers-info">
                <div className="followers">
                    <img src={iconFollowers} alt="icon_followers"/>
                    <span>{followers} followers</span>
                </div>
                <div className="following">
                    <img src={iconFollowing} alt="icon_following"/>
                    <span>{following} following</span>
                </div>
            </div>
        </div> 
    )
}
export default ViewUser;