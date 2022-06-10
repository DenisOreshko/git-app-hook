import { useHttp } from "../hooks/http.hook";

const  useGitHubService = () => {
    const {loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://api.github.com';
    const _baseOffset = 4;
    const _basePageNumber = 1;
    
    const getUser = async (username) =>{
        const res = await request(`${_apiBase}/users/${username}`);
        return _transformUser(res);
    }

    const getRepositories = async (username, offset = _baseOffset, pageNumber = _basePageNumber) =>{
        const res = await request(`${_apiBase}/users/${username}/repos?per_page=${offset}&page=${pageNumber}`);
        return res.map(_transformRepository);
    }

    const getRateLimitRemaining = async () => {
        const res = await request(`${_apiBase}/rate_limit`);
        return  res.rate.reset;       
    }

    const _transformUser = (res) => {
        return {
            avatar_url: res.avatar_url,
            name: res.name,
            html_url: res.html_url,
            login: res.login,
            followers: res.followers,
            following: res.following,
            public_repos:res.public_repos
        }
    }

    const _transformRepository = (res) => {
        return {
            id: res.id,
            name:res.name,
            html_url:res.html_url,
            description: res.description
        }
    }

    return {loading, 
            error,
            clearError, 
            process,
            setProcess, 
            getUser, 
            getRepositories, 
            getRateLimitRemaining}
}

export default useGitHubService;
