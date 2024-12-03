import styles from './TableCard.module.css';
import NotebookCard from '../NotebookCard/NotebookCard.jsx';
import axios from 'axios';
import {useContext} from 'react';
import {PopoverContext} from '../../../context/popover.context.js';
import OptionsButton from '../Buttons/OptionsButton/OptionsButton.jsx';
import AddNewButton from '../Buttons/AddNewButton/AddNewButton.jsx';
import {UserContext} from '../../../context/user.context.js';

function TableCard({title, tables, access, setTables, tableId, notebooks, setNotebooks, notes, setNotes}) {

    const {userId} = useContext(UserContext);
    
    const {
        setPopoverType,
        setPopoverData,
    } = useContext(PopoverContext);

    const addNewNotebook = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/notebooks/create-notebook', {
                userId,
                tableId
            });
            const newNotebook = response.data;
            newNotebook.tableId = tableId;
            setNotebooks(prevNotebooks => [...prevNotebooks, newNotebook]);
        } catch (error) {
            console.error(error);
        }
    };

    //e|---------POPOVERS---------|

    const openTableOptionsPopover = (e) => {
        setPopoverType('options');
        setPopoverData({
            openRename: openRename,
            openAgreementOnDelete: openAgreementOnDeleteTable,
            position: e
        });
    };

    //w|------RENAME------|

    const openRename = () => {
        setPopoverType('rename');
        setPopoverData({
            title: title,
            saveNewTitle: saveNewTitle
        });
    };

    const saveNewTitle = async () => {
        const newTitle = document.getElementById('renameTitleInput').value;
        const currentTable = tables.find(table => table.id === tableId);
        try {
            const response = await axios.put('http://localhost:3000/api/tables/rename-table', {
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

    //w|------DELETE------|

    const openAgreementOnDeleteTable = () => {
        setPopoverType('delete');
        // setIdForPopover(tableId);
        setPopoverData({
            title: title,
            deleteItem: deleteTable,
            item: 'table'
        });
    };

    const deleteTable = async () => {
        try {
            const response = await axios.delete('http://localhost:3000/api/tables/delete-table', {
                params: {
                    tableId: tableId
                }
            });
            setTables(prevTables => prevTables.filter((item) => item.id !== tableId));
            setPopoverType(null);
        } catch (error) {
            console.error(error);
        }
    };

    //e|---------RENDER---------|

    //w|------OPTIONS BUTTON------|

    const renderOptionsBtn = (access) => {
        if (access !== 'PERSONAL') {
            return (
                <OptionsButton
                    openOptionsPopover={openTableOptionsPopover}
                />
            );
        }
    };

    //w|------NOTEBOOKS------|

    const renderNotebooks = (notebooks) => {
        if (notebooks.length > 0) {
            return (
                notebooks.filter((notebook) => notebook.tableId === tableId).map((notebook, index) => {
                        return (
                            <NotebookCard
                                key={index}
                                notebookId={notebook.id}
                                title={notebook.title}
                                notebooks={notebooks}
                                setNotebooks={setNotebooks}
                                notes={notes.filter(note => note.notebookId === notebook.id)}
                                setNotes={setNotes}
                            />
                        );
                    }
                )
            );
        }
    };

    return (
        <div className={styles.tableCard}>
            <div className={styles.tableHead}>
                <span>{title}</span>
                <div className={styles.tableCardButtons}>
                    {renderOptionsBtn(access)}
                    <AddNewButton
                        addNewItem={addNewNotebook}
                        item={'notebook'}
                    />
                </div>
            </div>
            {renderNotebooks(notebooks)}
        </div>
    );
}

export default TableCard;