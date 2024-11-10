import styles from './Popover.module.css';
import {useContext, useEffect, useState} from 'react';
import {PopoverContext} from '../../context/popover.context.js';

const Popover = () => {
    const {
        popoverType,
        popoverContent,
        setPopoverType,
        popoverPosition
    } = useContext(PopoverContext);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (popoverType !== null) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    },[popoverType]);

    const handleClose = () => {
        setIsOpen(false);
        setPopoverType(null);
    };

    const PopoverContent = ({children}) => (
        <>
            <div className={styles.popoverContent} style={popoverPosition}>
                {children}
            </div>
            <div className={styles.popoverAnchor} onClick={handleClose}></div>
        </>
    );

    return (
        <>
            {isOpen && (<PopoverContent>
                    {popoverContent}
                </PopoverContent>
            )}
        </>
    );
};

export default Popover;