import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import User from "../user/user.js";
import RepositoriesList from "../repositoriesList/repositoriesList";
import PropTypes from 'prop-types';
import FlexContainer from "../flexContainer/flexContainer";

const Content = ({user}) =>{
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
                    <RepositoriesList username={user.login} public_repos={user.public_repos} />
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