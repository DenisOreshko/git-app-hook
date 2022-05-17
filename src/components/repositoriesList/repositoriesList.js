import { Component } from 'react';
import RepositoryCard from '../repositoryCard/repositoryCard';
import GitHubService from '../../services/GitHubService';
import './repositoriesList.css';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import RepositoriesNotFoundPage from '../repositoriesNotFound/repositoriesNotFound';
import DisconnectedPage from '../disconnectedPage/disconnectedPage';

class RepositoriesList extends Component{

    state = {
        username: null,
        pageNumber: 1,
        repositories:[],
        public_repos: null,
        loading:false,
        error: false,
        disconnected: false,
        showRepSpinner: false
    }

    gitHubService = new GitHubService();

    componentDidMount(){
        this.setState({
            username: this.props.username,
        })
        this.updateRepositories(this.state.pageNumber);
    }    

    componentDidUpdate(prevProps,prevState) {
        if(prevProps.username !== this.props.username) {
            this.updateRepositories();
        }
        if(prevProps.set_page !== this.props.set_page) {
            this.updateRepositories();
        }
    }

    onError = (error) => {
        if(error.status === 0){
            this.setState({
                loading:false,
                error:false,
                disconnected:true
            })
        }else{
            this.setState({
                loading:false,
                error:true,
                disconnected:false
            })
        }        
    } 

    onRepositoriesLoaded = (repositories) => {
        this.setState({
            repositories,
            loading:false,
            error:false,
            disconnected:false,
            showRepSpinner:true
        })
    }

    onLoadingSpinner = () =>{
        this.setState({
          loading:true,
          disconnected:false
        });
    }

    onRequest = (username, offset, pageNumber) => {
        this.gitHubService
            .getRepositories(username, offset, pageNumber)
            .then(this.onRepositoriesLoaded)
            .catch(this.onError);
    }

    updateRepositories = () => {        
        const {username, public_repos, set_page} = this.props;
        if(public_repos === 0){
            this.setState({
                public_repos: 0
            })
            return;
        }

        this.onLoadingSpinner();

        this.onRequest(username, 4, set_page);
    }

    render() {
        const {repositories, public_repos, loading, error, disconnected, showRepSpinner} = this.state;
        const disconnectedPage = disconnected ? <DisconnectedPage/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = (showRepSpinner && loading && !disconnected) ? <SpinnerForRepositories/>:null;
        const emptyRepositoriesPage = (public_repos === 0) ? <RepositoriesNotFoundPage/> : null;
        const content = !(disconnected || error || (public_repos === 0)) ? <View repositories={repositories} 
                                                                                 onPage={this.onPage} 
                                                                                 public_repos={this.props.public_repos}/> : null;     

        return (
            <div className='rep'>
                {disconnectedPage}
                {errorMessage}
                {spinner}
                {emptyRepositoriesPage}
                {content}
            </div>
        )
    }    
}

const SpinnerForRepositories = () => {
    return (
        <div className="spinner-rep">
            <Spinner/>
        </div>
    )
}

const View = ({repositories}) => {

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