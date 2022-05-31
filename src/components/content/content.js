import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import User from "../user/user.js";
import RepositoriesList from "../repositoriesList/repositoriesList";
import PageNavigation from "../pageNavigation/pageNavigation";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import FlexContainer from "../flexContainer/flexContainer";

const Content = ({user}) =>{
    
    //page number of the list of repositories
<<<<<<< HEAD
    //const [page, setPage] = useState(0);

    // useEffect(()=>{
    //   console.log('Content useEffect');
    //   setPage(0);
    // },[user.login]); 
=======
    const [page, setPage] = useState(0);

    useEffect(()=>{
      setPage(0); 
    },[user]);

    console.log('render Content page = ' + page);
>>>>>>> 147a7d0cb337d0ae6161c5cc899e6f6040230661

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
                    <RepositoriesList username={user.login} public_repos={user.public_repos} /> {/*pageNumber={page}*/}
                </ErrorBoundary>  
<<<<<<< HEAD
                {/* <ErrorBoundary>
                    <PageNavigation userLogin={user.login} public_repos={user.public_repos} onPage={(page)=> setPage(page)} />
                </ErrorBoundary>  */}
=======
                <ErrorBoundary>
                  <PageNavigation userLogin={user.login} public_repos={user.public_repos} onPage={(page)=> setPage(page)}/>
                </ErrorBoundary> 
>>>>>>> 147a7d0cb337d0ae6161c5cc899e6f6040230661
              </>
            }
      />
    )
  }

RepositoriesList.defaultProps = {pageNumber: 1}; 

Content.propTypes = {
    user: PropTypes.object
}
  export default Content;