import {Outlet} from 'react-router-dom';
import {UserContext} from '../context/user.context.js';
import {useState} from 'react';

export function Layout() {

    const [userId, setUserId] = useState(null);

    return (
        <UserContext.Provider value={{userId, setUserId}}>
            <Outlet/>
        </UserContext.Provider>
    );
}