import iconRepsNotFound from '../../resources/img/icon/rep.svg';

import './repositoriesNotFound.css'; 

const RepositoriesNotFoundPage = () => {
    return (
        <div className="wrapper-rep-not-found">
            <div className="reposit-not-found">
                <img src={iconRepsNotFound} alt="repositories not found"/>
                <span>Repository list is empty</span>
            </div>
        </div>
    )
}

export default RepositoriesNotFoundPage;