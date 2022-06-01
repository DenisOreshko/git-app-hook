import { useState, useEffect,lazy, Suspense } from 'react';
import useGitHubService from '../../services/GitHubService';
import './repositoriesList.css';
import Spinner from '../spinner/spinner';
import RepositoriesNotFoundPage from '../repositoriesNotFound/repositoriesNotFound';
import ViewRepositoriesList from '../viewRepositoriesList/viewRepositoriesList';
import PaginatedItems from '../paginatedItems/paginatedItems';

const ErrorPage = lazy(()=> import('../errorPage/errorPage.js'));

const RepositoriesList = (props) => {
    const [repositories, setRepositories] = useState([]);
    const [showRepSpinner, setShowRepSpinner] = useState(false);
    const {loading, error, getRepositories, clearError} = useGitHubService();
    const [page, setPage] = useState(0);

    const onRepositoriesLoaded = (repositories) => { 
        setRepositories(repositories);
        setShowRepSpinner(true);    
    }

    const onRequest = (username, offset, pageNumber) => {
        getRepositories(username, offset, pageNumber).then(onRepositoriesLoaded);
    }

    const updateRepositories = (pageNumb) => {
        clearError();
        const {username, public_repos} = props;
        if(public_repos === 0){    
            return;
        }
        onRequest(username, 4, pageNumb);        
    }

    useEffect(()=>{
        setShowRepSpinner(false);
        updateRepositories(0);        
    },[props.username]);    

    const onPage = (pageNumber) => {
        setPage(pageNumber);         
    }
    
    useEffect(()=>{      
        updateRepositories(page);
    },[page]);
    
    const spinner = (showRepSpinner && loading) ? <Spinner/>:null;
    const content = !(error || (props.public_repos === 0)) ? <ViewRepositoriesList repositories={repositories}/> : null;   
    const emptyRepositoriesPage = (props.public_repos === 0) ? <RepositoriesNotFoundPage/> : null;    
    const errorPage = error ? <ErrorPage error={error} notFoundPage={<RepositoriesNotFoundPage/>} /> : null;  

    return (
        <div className='rep'>
            <Suspense fullback={<span>Loading...</span>}>
                {spinner}
                {content}
                {emptyRepositoriesPage}
                {errorPage}
            </Suspense>    
            <PaginatedItems itemsPerPage={4} onClickedPage={onPage} public_repos={props.public_repos} userLogin={props.username}/>
        </div>
    )
}

export default RepositoriesList;