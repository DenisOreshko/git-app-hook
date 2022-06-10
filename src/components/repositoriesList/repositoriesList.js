import {useState, useEffect, lazy, Suspense} from 'react';
import useGitHubService from '../../services/GitHubService';
import ViewRepositoriesList from '../viewRepositoriesList/viewRepositoriesList';
import PaginatedItems from '../paginatedItems/paginatedItems';
import Spinner from '../spinner/spinner';
import './repositoriesList.css';

const RepositoriesNotFoundPage = lazy(()=> import('../repositoriesNotFound/repositoriesNotFound'));
const ErrorPage = lazy(()=> import('../errorPage/errorPage.js'));

const RepositoriesList = (props) => {
    const [repositories, setRepositories] = useState([]);
    const [showRepSpinner, setShowRepSpinner] = useState(false);
    const {error, getRepositories, clearError, process, setProcess} = useGitHubService();
    const [page, setPage] = useState(0);

    const onRepositoriesLoaded = (repositories) => { 
        setRepositories(repositories);
        setShowRepSpinner(true);    
    }

    const onRequest = (username, offset, pageNumber) => {
        getRepositories(username, offset, pageNumber)
            .then(onRepositoriesLoaded)
            .then(()=>setProcess('confirmed'));
    }

    const updateRepositories = (pageNumb) => {
        clearError();
        const {username, public_repos} = props;
        if(public_repos === 0){    
            setProcess('empty_repositories')
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

    const setContent = (process, repositories) =>{
        switch(process){
            case 'waiting': 
                return null;

            case 'loading': 
                return <>
                        <ViewRepositoriesList repositories={repositories}/>
                        {showRepSpinner ? <Spinner/>: null}
                       </>;

            case 'confirmed': 
                return <ViewRepositoriesList repositories={repositories}/>;

            case 'empty_repositories':
                return <RepositoriesNotFoundPage/>;

            case 'error':
                return <ErrorPage error={error} notFoundPage={<RepositoriesNotFoundPage/>}/>;
                
            default:
                throw new Error('Unexpected process state');            
        }
    }

    return (
        <div className='rep'>
            <Suspense fullback={<span>Loading...</span>}>
                {setContent(process, repositories)}
            </Suspense>    
            <PaginatedItems itemsPerPage={4} onClickedPage={onPage} public_repos={props.public_repos} userLogin={props.username}/>
        </div>
    )
}

export default RepositoriesList;