import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import User from "../user/user.js";
import RepositoriesList from "../repositoriesList/repositoriesList";
import PageNavigation from "../pageNavigation/pageNavigation";
import PropTypes from 'prop-types';
import { useState } from 'react';
import FlexContainer from "../flexContainer/flexContainer";

const Content = ({user}) =>{
    
    //page number of the list of repositories
    const [page, setPage] = useState(0); 
  
    return (
      <FlexContainer 
            avatarColumn = {
                <ErrorBoundary>
                 <User user={user}/> 
               </ErrorBoundary>
            }
            repositoriesColumn = {
              <>
                <ErrorBoundary>
                    {(user.public_repos) ? <div className="reposit-count"><span >Repositories ({user.public_repos})</span></div> : null}
                    <RepositoriesList username={user.login} public_repos={user.public_repos} set_page={page}/> 
                </ErrorBoundary>  
                <ErrorBoundary>
                    <PageNavigation public_repos={user.public_repos} onPage={(page)=> setPage(page)}/>
                </ErrorBoundary> 
              </>
            }
      />
    )
  }

Content.propTypes = {
    user: PropTypes.object
}
  export default Content;