import {useState, useEffect, useRef, useContext} from 'react';  
import {Link, useParams} from 'react-router-dom';
import {LoginContext} from '../../context/index.js';
import iconGitHub from '../../resources/img/icon/icon_github.svg';
import searchIcon from '../../resources/img/icon/search.svg';
import './header.css';


const Header = (props) => {

    const [search, setSearch] = useState('');
    const {loginContext, setLoginContext} = useContext(LoginContext);
    const inputRef = useRef(null);

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
    
    useEffect(()=>{        
        inputRef.current.focus();      
    },[])

    useEffect(()=>{   
        setSearch(loginContext)
    },[loginContext])

    return(
            <header className="header">
                <Link to="/"><img src={iconGitHub} alt="icon_github"/></Link>
                <form>
                    <img src={searchIcon} alt="icon"/>
                    <input  
                            ref={inputRef}
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