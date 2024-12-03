import {Outlet} from 'react-router-dom';
import {UserContext} from '../context/user.context.js';
import {useState} from 'react';

export function Layout() {

    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);

    return (
        <UserContext.Provider value={{userId, setUserId, userName, setUserName}}>
            <Outlet

            />
        </UserContext.Provider>
    );
}