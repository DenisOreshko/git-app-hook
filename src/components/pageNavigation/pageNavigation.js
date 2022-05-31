import { useEffect, useState } from 'react';
import PaginatedItems from '../paginatedItems/paginatedItems';

const PageNavigation = (props) =>{
    const [public_repos, setPublicRepos] = useState(null);

    console.log('PageNavigation render');

    useEffect(() => {
        
        setPublicRepos(props.public_repos);
    },[props.public_repos]);

    const onPage = (pageNumber) => {
        props.onPage(pageNumber);         
    }

    return (
        <PaginatedItems itemsPerPage={4} onClickedPage={onPage} public_repos={public_repos} userLogin={props.userLogin}/>
    ) 
}

export default PageNavigation;