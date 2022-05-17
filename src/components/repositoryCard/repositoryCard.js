import { useState } from 'react';
import './repositoryCard.css';

// class RepositoryCard extends Component {    
//     state = {
//         showAllDescription: false
//     }

//     showAllDescriptionToggle = () => {  
//         this.setState(({showAllDescription})=>({
//             showAllDescription: !showAllDescription
//         }))      
//     }
    
//     hidePartDescription = (describe, limit , atext) => {
//         if(describe.length > limit){
//             describe = "" + describe.slice(0, limit);
//             atext = ' ...more';
//         }
//         return {describe, atext};
//     }

//     showAllDescription = (describe, limit, atext) => {
//         if(describe.length > limit){
//             atext = '  hide';
//         }        
//         return {describe, atext}
//     }

//     //hide or show more Description character limit
//     transformDescription = (description, showAllDescription, limit) => {
//         if(description !== null){           
//             if(showAllDescription){
//                 return this.showAllDescription(description, limit, null);
//             }else{
//                 return this.hidePartDescription(description, limit, null);             
//             }
//         }        
//         return {describe:null, atext:null};      
//     }

//     render(){
//         const {name, html_url,description} = this.props;
//         const {showAllDescription} = this.state;       
//         const {describe, atext} = this.transformDescription(description, showAllDescription, 180);        

//         return (
//             <div className="repositories-card">
//                     <a href={html_url} target="_blank" rel="noreferrer">{name}</a>
//                     <span className="repository-info">
//                         {describe} <a href="#0" className='showMore' onClick={this.showAllDescriptionToggle}>{atext}</a>
//                     </span>                    
//             </div>
//         )
//     }
    
// }

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
            if(showState){
                return showAllDescription(description, limit, null);
            }else{
                return hidePartDescription(description, limit, null);             
            }
        }        
        return {describe:null, atext:null};      
    }


    const {name, html_url,description} = props;
    const {describe, atext} = transformDescription(description, showState, 180);

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