import {useEffect, useState } from 'react';
import ViewUser from '../viewUser/viewUser';
import './user.css';

const User = (props) => {

    const [user, setUser] = useState({});

    useEffect(()=> {
        onUserLoaded(props.user);
    }, [props.user]);
    
    const followersTransform = (num) =>{
        let thousands = num/1000;
        let hundreds = num%1000 +'';  
        return num > 999 ? `${Math.trunc(thousands)}.${hundreds[0]}k` : num;
    }

    const onUserLoaded = (user) => {
        user.followers = followersTransform(user.followers);
        setUser(user);     
    } 

    return(
        <ViewUser user={user} />         
    )
}

export default User;