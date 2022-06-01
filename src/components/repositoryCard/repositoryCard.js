import { useState } from 'react';
import './repositoryCard.css';

const RepositoryCard = (props) => {

    const [showState,setShowState] = useState(false);

    const showAllDescriptionToggle = () => {  
        setShowState(showState => !showState)      
    }

    const hidePartDescription = (describe, limit , atext) => {
        if(describe.length > limit){
            describe = "" + describe.slice(0, limit);
            atext = ' ...more';
        }
        return {describe, atext};
    }

    const showAllDescription = (describe, limit, atext) => {
        if(describe.length > limit){
            atext = '  hide';
        }        
        return {describe, atext}
    }

    //hide or show more Description character limit
    const transformDescription = (description, showState, limit) => {
        if(description !== null){  
            return showState ? showAllDescription(description, limit, null) : hidePartDescription(description, limit, null);      
        }        
        return {describe:null, atext:null};      
    }

    const {name, html_url,description} = props;
    const {describe, atext} = transformDescription(description, showState, 180);//limit no hide part 180

    return(
        <div className="repositories-card">
                    <a href={html_url} target="_blank" rel="noreferrer">{name}</a>
                    <span className="repository-info">
                        {describe} <a href="#0" className='showMore' onClick={showAllDescriptionToggle}>{atext}</a>
                    </span>                    
        </div>
    )
}

export default RepositoryCard;