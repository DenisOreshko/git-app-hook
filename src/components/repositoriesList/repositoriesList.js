import { useState, useEffect } from 'react';
import RepositoryCard from '../repositoryCard/repositoryCard';
import GitHubService from '../../services/GitHubService';
import './repositoriesList.css';
import Spinner from '../spinner/spinner';
import Error403Message from '../error403Message/error403Message';
import RepositoriesNotFoundPage from '../repositoriesNotFound/repositoriesNotFound';
import DisconnectedPage from '../disconnectedPage/disconnectedPage';

const RepositoriesList = (props) => {

    const [repositories, setRepositories] = useState([]);
    const [public_repos, setPublicRepos] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [disconnected, setDisconnected] = useState(false);
    const [showRepSpinner, setShowRepSpinner] = useState(false);

    const gitHubService = new GitHubService();

    useEffect(() => {
        updateRepositories();
    },[]);

    useEffect(()=>{
        updateRepositories();
    },[props.username, props.pageNumber]);

    const onError = (error) => {
        if(error.status === 0){
            setLoading(false);
            setError(false);
            setDisconnected(true);
        }else{
            setLoading(false);
            setError(true);
            setDisconnected(false);
        }        
    } 

    const onRepositoriesLoaded = (repositories) => {
        console.log('onRepositoriesLoaded()');
        setRepositories(repositories);
        setLoading(false);
        setError(false);
        setDisconnected(false);
        setShowRepSpinner(true);
    }

    const onLoadingSpinner = () =>{
        setLoading(true);
        setDisconnected(false);      
    }

    const onRequest = (username, offset, pageNumber) => {
        gitHubService
            .getRepositories(username, offset, pageNumber)
            .then(onRepositoriesLoaded)
            .catch(onError);
    }

    const updateRepositories = () => {
        const {username, public_repos, pageNumber} = props;
        if(public_repos === 0){
            setPublicRepos(0);       
            return;
        }
        onLoadingSpinner();
        onRequest(username, 4, pageNumber);        
    }

    const disconnectedPage = disconnected ? <DisconnectedPage/> : null;
    const error403Message = error ? <Error403Message/> : null;
    const spinner = (showRepSpinner && loading && !disconnected) ? <Spinner/>:null;
    const emptyRepositoriesPage = (public_repos === 0) ? <RepositoriesNotFoundPage/> : null;
    const content = !(disconnected || error || (public_repos === 0)) ? <ViewRepositoriesList repositories={repositories}/> : null; 

    return (
        <div className='rep'>
            {disconnectedPage}
            {error403Message}
            {spinner}
            {emptyRepositoriesPage}
            {content}
        </div>
    )
}

const ViewRepositoriesList = ({repositories}) => {

    const elements = repositories.map(item => {
                const {id, ...itemProps} = item;
                return (<RepositoryCard key={id} {...itemProps}/>)
            })

    return (
        <div className="repositories-list">
            {elements}
        </div>
    )
}

export default RepositoriesList;