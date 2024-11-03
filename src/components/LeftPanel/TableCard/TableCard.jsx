import styles from './TableCard.module.css';
import NotebookCard from '../NotebookCard/NotebookCard.jsx';
import axios from 'axios';
import OptionsModule from '../OptionsModule/OptionsModule.jsx';
import {useState} from 'react';
import cn from 'classnames';

function TableCard({title, id, userId, notebooks, notes}) {

    const [optionsActive, setOptionsActive] = useState(false);

    const addNewNotebook = async () => {
        const title = 'New note';
        try {
            const response = await axios.post('http://localhost:3000/api/notebooks', {
                userId,
                title
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const activateOptions = () => {
        setOptionsActive(!optionsActive);
        console.log('leave');
    };

    return (
        <div className={styles.Table}>
            <div className={styles.tableHead}>
                <span>{title}</span>
                <div className={styles.tableCardButtons}>
                    <div className={styles.tableOptions} onClick={activateOptions}>
                        <img src="/public/optionsIcon.svg" alt="table options"/>
                        <OptionsModule
                            className={cn(styles.tableOptionsModuleBG, {
                                [styles.active]: optionsActive
                            })}
                            onMouseLeave={activateOptions}
                        />
                    </div>
                    <button className={styles.addNewNotebook} onClick={addNewNotebook}>
                        <img src="/public/littlePlusIcon.svg" alt="add new private notebook"/>
                    </button>

                </div>
            </div>
            {notebooks.filter(notebook => notebook.tableId === id).map((notebook, index) => {
                return (
                    <NotebookCard
                        key={index}
                        id={notebook.notebookId}
                            title={notebook.notebookTitle}
                            notes={notes.filter(note => note.notebookId === notebook.notebookId)}
                        />
                    );
                }
            )}
        </div>
    );
}

export default TableCard;