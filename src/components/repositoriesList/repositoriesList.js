import { useState, useEffect,lazy, Suspense } from 'react';
import useGitHubService from '../../services/GitHubService';
import './repositoriesList.css';
import Spinner from '../spinner/spinner';
import RepositoriesNotFoundPage from '../repositoriesNotFound/repositoriesNotFound';
import ViewRepositoriesList from '../viewRepositoriesList/viewRepositoriesList';

const ErrorPage= lazy(()=> import('../errorPage/errorPage'));

const RepositoriesList = (props) => {
    const [repositories, setRepositories] = useState([]);
    const [showRepSpinner, setShowRepSpinner] = useState(false);
    const {loading, error, getRepositories, clearError} = useGitHubService();

    const onRepositoriesLoaded = (repositories) => { 
        console.log('onRepositoriesLoaded()');
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
        console.log('RepositoriesList useEffect() []');
        //updateRepositories();
    },[]);

    useEffect(()=>{
        console.log('RepositoriesList useEffect() [props.username]');
        setShowRepSpinner(false);
        updateRepositories();
    },[props.username]);

    useEffect(()=>{
        console.log('RepositoriesList useEffect() [props.pageNumber]');        
        updateRepositories();
    },[props.pageNumber]);
    
    const spinner = (showRepSpinner && loading) ? <Spinner/>:null;
    const content = !(error || (props.public_repos === 0)) ? <ViewRepositoriesList repositories={repositories}/> : null;   
    const emptyRepositoriesPage = (props.public_repos === 0) ? <RepositoriesNotFoundPage/> : null;    
    const errorPage = error ? <ErrorPage error={error} notFoundPage={<RepositoriesNotFoundPage/>} /> : null;  

    // console.log('username = ' + props.username);
    // console.log('showRepSpinner = ' + showRepSpinner);
    // console.log('spinner loading = ' + loading);

    return (
        <Suspense fullback={<span>Loading...</span>}>
            <div className='rep'>
                {spinner}
                {content}
                {emptyRepositoriesPage}
                {errorPage}    
            </div>
        </Suspense>
    )
}

export default RepositoriesList;