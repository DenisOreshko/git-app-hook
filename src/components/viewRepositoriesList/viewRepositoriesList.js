import RepositoryCard from "../repositoryCard/repositoryCard";
import './viewRepositoriesList.css';
const ViewRepositoriesList = ({repositories}) => {
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
export default ViewRepositoriesList;