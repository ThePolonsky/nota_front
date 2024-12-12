import styles from './User.module.css';
import {useContext, useState} from 'react';
import {PopoverContext} from '../../../../context/popover.context.js';
import {UserContext} from '../../../../context/user.context.js';

function User({userName}) {

    const {user} = useContext(UserContext);
    const {popoverType, setPopoverType, setPopoverData} = useContext(PopoverContext);


    const openUserPopover = () => {
        setPopoverType('user');
        setPopoverData({
            user: user
        });
    };
    
    return (
        <div className={styles.userSection}>
            <div className={styles.userBtn} onClick={openUserPopover}>
                <span className={styles.userName}>{userName}</span>
                {/*<img className={styles.userAvatar} src="#" alt="User avatar"/>*/}
                <div className={styles.userAvatar}></div>
            </div>
        </div>

    );
}

export default User;