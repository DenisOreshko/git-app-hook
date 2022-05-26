import { useState, useEffect } from 'react';
import useGitHubService from '../../services/GitHubService';
import './repositoriesList.css';
import Spinner from '../spinner/spinner';
import ErrorPage from '../errorPage/errorPage';
import RepositoriesNotFoundPage from '../repositoriesNotFound/repositoriesNotFound';
import ViewRepositoriesList from '../viewRepositoriesList/viewRepositoriesList';


const RepositoriesList = (props) => {
    const [repositories, setRepositories] = useState([]);
    const [showRepSpinner, setShowRepSpinner] = useState(false);
    const {loading, error, getRepositories, clearError} = useGitHubService();

    const onRepositoriesLoaded = (repositories) => { 
        setRepositories(repositories);
        setShowRepSpinner(true);    
    }

    const onRequest = (username, offset, pageNumber) => {
        getRepositories(username, offset, pageNumber).then(onRepositoriesLoaded);
    }

    const updateRepositories = () => {
        clearError();
        const {username, public_repos, pageNumber} = props;
        if(public_repos === 0){    
            return;
        }
        onRequest(username, 4, pageNumber);        
    }  

    useEffect(() => {
        updateRepositories();
    },[]);

    useEffect(()=>{
        updateRepositories();
    },[props.username, props.pageNumber]);
    
    const spinner = (showRepSpinner && loading) ? <Spinner/>:null;
    const content = !(error || (props.public_repos === 0)) ? <ViewRepositoriesList repositories={repositories}/> : null;   
    const emptyRepositoriesPage = (props.public_repos === 0) ? <RepositoriesNotFoundPage/> : null;    
    const errorPage = error ? <ErrorPage error={error} notFoundPage={<RepositoriesNotFoundPage/>} /> : null;  

    return (
        <div className='rep'>
            {spinner}
            {content}
            {emptyRepositoriesPage}
            {errorPage}    
        </div>
    )
}

export default RepositoriesList;