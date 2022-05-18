import { useState } from 'react';  
import iconGitHub from '../../resources/img/icon/icon_github.svg';
import searchIcon from '../../resources/img/icon/search.svg';
import './header.css';


const Header = (props) => {

    const [search, setSearch] = useState('');

    const onUpdateSearch = (e) => {     
        const reg = /%/ig;//remove '%' character from search query. Make erro 400 github api
        const searchQuery = (e.target.value).replace(reg, '');

        setSearch(searchQuery);
    }

    const onPressEnter = (e) => {        
        if(e.key === 'Enter'){            
            e.preventDefault();
            onUpdateSearch(e);            
            props.onSearchUserApp(search);            
        }        
    }

    return(
            <header className="header">
                <img src={iconGitHub} alt="icon_github"/>
                <form>
                    <img src={searchIcon} alt="icon"/>
                    <input  
                            // ref={this.inputRef}
                            type="text" 
                            placeholder="Enter GitHub username"
                            value={search}
                            onChange={onUpdateSearch}
                            onKeyDown={onPressEnter}
                            />   
                </form>
            </header>
    )
}

export default Header;