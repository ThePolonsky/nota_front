import styles from './Popover.module.css';
import {useContext, useEffect, useState} from 'react';
import {PopoverContext} from '../../context/popover.context.js';
import OptionsPopover from './OptionsPopover/OptionsPopover.jsx';
import DeletePopover from './DeletePopover/DeletePopover.jsx';
import RenamePopover from './RenamePopover/RenamePopover.jsx';
import UserPopover from './UserPopover/UserPopover.jsx';

const Popover = () => {
    const {
        popoverData,
        popoverType,
        setPopoverType,
        popoverPosition,
        setPopoverPosition
    } = useContext(PopoverContext);

    const positionOnClick = (position) => {
        return {left: `${position.pageX}px`, top: `${position.pageY}px`};
    };

    const pos = {
        center: {left: '50%', top: '50%', transform: 'translate(-50%, -50%)'},
        click: positionOnClick,
        userBtn: {right: '0', top: '40px'}
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (popoverType !== null) {
            setIsOpen(true);
            setPosition();
        } else {
            setIsOpen(false);
        }
    }, [popoverType]);

    const handleClose = () => {
        setIsOpen(false);
        setPopoverType(null);
    };

    const setPosition = () => {
        switch (popoverType) {
            case 'options': {
                setPopoverPosition(pos.click(popoverData.position));
            }
                break;
            case 'rename': {
                setPopoverPosition(pos.center);
            }
                break;
            case 'delete': {
                setPopoverPosition(pos.center);
            }
            break;
            case 'user': {
                setPopoverPosition(pos.userBtn);
            }
        }
    };

    const PopoverContainer = () => {
        return (
            <>
                <div className={styles.popoverContainer} style={popoverPosition}>
                    {popoverContent(popoverData)}
                </div>
                <div className={styles.popoverAnchor} onClick={handleClose}></div>
            </>
        );
    };

    const popoverContent = (popoverData) => {
        switch (popoverType) {
            case 'options': {
                const {openRename, openAgreementOnDelete} = popoverData;
                return (
                    <OptionsPopover
                        openRename={openRename}
                        openAgreementOnDelete={openAgreementOnDelete}
                    />
                );
            }
            case 'rename': {
                const {title, saveNewTitle} = popoverData;
                return (
                    <RenamePopover
                        title={title}
                        saveNewTitle={saveNewTitle}
                        handleClose={handleClose}
                    />
                );
            }
            case 'delete': {
                const {title, deleteItem, item} = popoverData;
                return (
                    <DeletePopover
                        title={title}
                        deleteItem={deleteItem}
                        handleClose={handleClose}
                        item={item}
                    />
                );
            }
            case 'user': {
                // const {user, addAccount, SignOut} = popoverData;
                const {user} = popoverData;
                return (
                    <UserPopover
                        user={user}
                    />
                );
            }
        }
    };

    return (
        <>
            {isOpen && (<PopoverContainer>
                </PopoverContainer>
            )}
        </>
    );
};

export default Popover;