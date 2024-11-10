import styles from './TableCard.module.css';
import NotebookCard from '../NotebookCard/NotebookCard.jsx';
import axios from 'axios';
import {useContext} from 'react';
import {PopoverContext} from '../../../context/popover.context.js';
import cn from 'classnames';

function TableCard({title, tables, setTables, tableId, userId, notebooks, setNotebooks, notes}) {
    const {
        setPopoverType,
        setPopoverContent,
        setPopoverPosition,
        setIdForPopover
    } = useContext(PopoverContext);

    const addNewNotebook = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/notebooks', {
                tableId,
                userId
            });
            const newNotebook = response.data;
            newNotebook.table_id = tableId;
            setNotebooks(prevNotebooks => [...prevNotebooks, response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTable = async () => {
        try {
            const response = await axios.delete('http://localhost:3000/api/delete-table', {
                userId,
                tableId
            });
            console.log(response.data);
            setTables(prevTables => prevTables.filter((item) => item.id !== tableId));
            setPopoverType(null);
        } catch (error) {
            console.error(error);
        }
    };

    const closePopover = () => {
        setPopoverType(null);
    };

    const openAgreementOnDelete = () => {
        setPopoverPosition({left: '50%', top: '50%', transform: 'translate(-50%, -50%)'});
        setPopoverType('tableAgreementOnDelete');
        setIdForPopover(tableId);
        setPopoverContent(
            <div className={styles.tableAgreementOnDelete}>
                <span>Delete table &#34;{title}&#34;?</span>
                <div className={styles.tableAgreementOnDeleteButtons}>
                    <button className={cn(styles.popoverBtn, styles.agreementBtn, styles.green)}
                            onClick={deleteTable}>Delete
                    </button>
                    <button className={cn(styles.popoverBtn, styles.agreementBtn, styles.red)}
                            onClick={closePopover}>Cancel
                    </button>
                </div>
            </div>
        );
    };

    const saveNewTitle = async () => {
        const newTitle = document.getElementById('tableRenameTitleInput').value;
        const currentTable = tables.find(table => table.id === tableId);
        try {
            const response = await axios.put('http://localhost:3000/api/update-table-title', {
                tableId,
                newTitle
            });
            console.log(response.data);
            currentTable.title = newTitle;
            setTables(tables);
            setPopoverType(null);
        } catch (error) {
            console.error(error);
        }
    };

    const openRename = () => {
        setPopoverPosition({left: '50%', top: '50%', transform: 'translate(-50%, -50%)'});
        setPopoverType('tableRename');
        setIdForPopover(tableId);
        setPopoverContent(
            <div className={styles.tableRename}>
                <input autoFocus={true} type={'text'} className={styles.tableRenameTitle} id={'tableRenameTitleInput'} defaultValue={title} onKeyDown={(e) => {
                    if (e.key === 'Enter') saveNewTitle();
                    if (e.key === 'Escape') closePopover();
                    console.log(e.key);
                }}></input>
                <div className={styles.tableRenameButtons}>
                    <button className={cn(styles.popoverBtn, styles.agreementBtn, styles.green)}
                            onClick={saveNewTitle}>Save
                    </button>
                    <button className={cn(styles.popoverBtn, styles.agreementBtn, styles.red)}
                            onClick={closePopover}>Cancel
                    </button>
                </div>
            </div>
        );
    };

    const openTableOptionsPopover = (e) => {
        setPopoverPosition({left: `${e.pageX}px`, top: `${e.pageY}px`});
        setPopoverType('tableOptions');
        setPopoverContent(
            <div className={styles.tableOptionsPopover}>
                <button className={styles.popoverBtn} onClick={openRename}>Rename</button>
                <button className={styles.popoverBtn} onClick={openAgreementOnDelete}>Delete</button>
            </div>
        );
    };

    return (
        <div className={styles.Table}>
            <div className={styles.tableHead}>
                <span>{title}</span>
                <div className={styles.tableCardButtons}>
                    <button className={styles.tableOptionsBtn} onClick={(e) => openTableOptionsPopover(e)}>
                        <img src="/public/optionsIcon.svg" alt="table options"/>
                    </button>
                    <button className={styles.addNewNotebook} onClick={addNewNotebook}>
                        <img src="/public/littlePlusIcon.svg" alt="add new private notebook"/>
                    </button>
                </div>
            </div>
            {notebooks.filter(notebook => notebook.table_id === tableId).map((notebook, index) => {
                    return (
                        <NotebookCard
                            key={index}
                            id={notebook.id}
                            title={notebook.title}
                            notes={notes.filter(note => note.id === notebook.id)}
                        />
                    );
                }
            )}
        </div>
    );
}

export default TableCard;