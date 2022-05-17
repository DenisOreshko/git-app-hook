import ServerError from "./ServerError";
class GitHubService{
    _apiBase = 'https://api.github.com';
    _baseOffset = 4;
    _basePageNumber = 1;
    
    getResources = async (url) => {
        
        let res = await fetch(url, {
            headers: {
                accept: 'application/vnd.github.v3+json'
            }
        }).catch((err)=>{
            throw new ServerError(`ERR_INTERNET_DISCONNECTED`, 0);
        });

        if(!res.ok){
            throw new ServerError(`Could not fetch ${url}, status: ${res.status}`, res.status);
        }

        return await res.json();
    }

    getUser = async (username) =>{
        const res = await this.getResources(`${this._apiBase}/users/${username}`);
        return this._transformUser(res);
    }

    getRepositories = async (username, offset = this._baseOffset, pageNumber = this._basePageNumber) =>{
        const res = await this.getResources(`${this._apiBase}/users/${username}/repos?per_page=${offset}&page=${pageNumber}`);
        return res.map(this._transformRepository);
    }

    getRateLimitRemaining = async () => {
        const res = await this.getResources(`${this._apiBase}/rate_limit`);
        return  res.rate.reset;       
    }

    _transformUser = (res) => {
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

    _transformRepository = (res) => {
        return {
            id: res.id,
            name:res.name,
            html_url:res.html_url,
            description: res.description
        }
    }
}

export default GitHubService;