import RepositoryCard from "../repositoryCard/repositoryCard";
import './viewRepositoriesList.css';
const ViewRepositoriesList = ({repositories}) => {
    console.log('View repositories List map ' + repositories.length);  
    const elements = repositories.map(item => {
                
                const {id, ...itemProps} = item;
                return (<RepositoryCard key={id} {...itemProps}/>)
            })
    console.log('View repositories List');        
    return (
        <div className="repositories-list">
            {elements}
        </div>
    )
}
export default ViewRepositoriesList;