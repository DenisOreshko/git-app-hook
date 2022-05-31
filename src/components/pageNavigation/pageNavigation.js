import { useEffect, useState } from 'react';
import PaginatedItems from '../paginatedItems/paginatedItems';

const PageNavigation = (props) =>{
    const [public_repos, setPublicRepos] = useState(null);

    useEffect(() => {
        
        setPublicRepos(props.public_repos);
    },[props.public_repos]);

    const onPage = (pageNumber) => {
        props.onPage(pageNumber);         
    }

    return (
        <PaginatedItems userLogin={props.userLogin} itemsPerPage={4} onClickedPage={onPage} public_repos={public_repos} />
    ) 
}

export default PageNavigation;