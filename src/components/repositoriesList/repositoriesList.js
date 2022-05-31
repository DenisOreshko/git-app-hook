import { useState, useEffect,lazy, Suspense } from 'react';
import useGitHubService from '../../services/GitHubService';
import './repositoriesList.css';
import Spinner from '../spinner/spinner';
import RepositoriesNotFoundPage from '../repositoriesNotFound/repositoriesNotFound';
import ViewRepositoriesList from '../viewRepositoriesList/viewRepositoriesList';
<<<<<<< HEAD
import PaginatedItems from '../paginatedItems/paginatedItems';
=======

const ErrorPage= lazy(()=> import('../errorPage/errorPage'));
>>>>>>> 147a7d0cb337d0ae6161c5cc899e6f6040230661

const RepositoriesList = (props) => {
    const [repositories, setRepositories] = useState([]);
    const [showRepSpinner, setShowRepSpinner] = useState(false);
    const {loading, error, getRepositories, clearError} = useGitHubService();
    const [page, setPage] = useState(0);

    const onRepositoriesLoaded = (repositories) => { 
<<<<<<< HEAD
=======
        console.log(`onRepositoriesLoaded RepositoriesList`);
>>>>>>> 147a7d0cb337d0ae6161c5cc899e6f6040230661
        setRepositories(repositories);
        setShowRepSpinner(true);    
    }

    const onRequest = (username, offset, pageNumber) => {
        //console.log('onRequest() RepositoriesList');
        getRepositories(username, offset, pageNumber).then(onRepositoriesLoaded);
    }

<<<<<<< HEAD
    const updateRepositories = (pageNumb) => {
        clearError();
        const {username, public_repos} = props;
        if(public_repos === 0){    
            return;
        }
        onRequest(username, 4, pageNumb);        
    }

    useEffect(()=>{
=======
    const updateRepositories = () => {
        console.log(`updateRepositories RepositoriesList`);
        clearError();
        const {username, public_repos, pageNumber} = props;
        if(public_repos === 0){ 
            console.log(`updateRepositories RepositoriesList return 0`);
            return;
        }
        onRequest(username, 4, pageNumber);        
    }  

    useEffect(()=>{
        console.log(`useEffect() [${props.username}] RepositoriesList`);
>>>>>>> 147a7d0cb337d0ae6161c5cc899e6f6040230661
        setShowRepSpinner(false);
        updateRepositories(0);        
    },[props.username]);

<<<<<<< HEAD
    useEffect(()=>{      
        updateRepositories(page);
    },[page]);

    const onPage = (pageNumber) => {
        setPage(pageNumber);         
    }
=======
    useEffect(()=>{
        console.log(`useEffect() [${props.pageNumber}] RepositoriesList`);        
        updateRepositories();
    },[props.pageNumber]);
>>>>>>> 147a7d0cb337d0ae6161c5cc899e6f6040230661
    
    const spinner = (showRepSpinner && loading) ? <Spinner/>:null;
    const content = !(error || (props.public_repos === 0)) ? <ViewRepositoriesList repositories={repositories}/> : null;   
    const emptyRepositoriesPage = (props.public_repos === 0) ? <RepositoriesNotFoundPage/> : null;    
    const errorPage = error ? <ErrorPage error={error} notFoundPage={<RepositoriesNotFoundPage/>} /> : null;  

<<<<<<< HEAD
    return (
        <div className='rep'>
            {spinner}
            {content}
            {emptyRepositoriesPage}
            {errorPage}    
            <PaginatedItems itemsPerPage={4} onClickedPage={onPage} public_repos={props.public_repos} userLogin={props.username}/>
        </div>
=======
    //console.log('render RepositoriesList.js');
    return (
        <Suspense fullback={<span>Loading...</span>}>
            <div className='rep'>
                {spinner}
                {content}
                {emptyRepositoriesPage}
                {errorPage}    
            </div>
        </Suspense>
>>>>>>> 147a7d0cb337d0ae6161c5cc899e6f6040230661
    )
}

export default RepositoriesList;