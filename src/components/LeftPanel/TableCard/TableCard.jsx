import styles from './TableCard.module.css';
import NotebookCard from '../NotebookCard/NotebookCard.jsx';
import axios from 'axios';
import {useContext, useState} from 'react';
import {PopoverContext} from '../../../context/popover.context.js';
import OptionsButton from '../Buttons/OptionsButton/OptionsButton.jsx';
import AddNewButton from '../Buttons/AddNewButton/AddNewButton.jsx';
import {UserContext} from '../../../context/user.context.js';
import {TabsContext} from '../../../context/tabs.context.js';

function TableCard({table, tables, notebooks, notes, setTables, setNotebooks, setNotes}) {

    const {userId, user, setUser} = useContext(UserContext);
    const {tabs, setTabs, selectedTabIndex, setSelectedTabIndex} = useContext(TabsContext);
    const {setPopoverType, setPopoverData} = useContext(PopoverContext);

    const addNewNotebook = async () => {
        try {
            const tableId = table.id;
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
            title: table.title,
            saveNewTitle: saveNewTitle
        });
    };

    const saveNewTitle = async () => {
        const newTitle = document.getElementById('renameTitleInput').value;
        const tableId = table.id;
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
        setPopoverData({
            title: table.title,
            deleteItem: deleteTable,
            item: 'table'
        });
    };

    const deleteTable = async () => {
        const tableId = table.id;
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

    const renderOptionsBtn = () => {
        if (table.access !== 'PERSONAL') {
            return (
                <OptionsButton
                    openOptionsPopover={openTableOptionsPopover}
                />
            );
        }
    };

    return (
        <div className={styles.tableCard}>
            <div className={styles.tableHead}>
                <span>{table.title}</span>
                <div className={styles.tableCardButtons}>
                    {renderOptionsBtn()}
                    <AddNewButton
                        addNewItem={addNewNotebook}
                        item={'notebook'}
                    />
                </div>
            </div>
            {notebooks.map((notebook, index) => {
                    if (notebook.tableId === table.id) {
                        return (
                            <NotebookCard
                                key={index}
                                notebook={notebook}
                                tables={tables}
                                notebooks={notebooks}
                                notes={notes}
                                setTables={setTables}
                                setNotebooks={setNotebooks}
                                setNotes={setNotes}
                            />
                        );
                    }
                }
            )}
        </div>
    );
}

export default TableCard;