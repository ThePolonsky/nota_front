import styles from './TableCard.module.css';
import NotebookCard from '../NotebookCard/NotebookCard.jsx';
import axios from 'axios';
import {useEffect, useState} from 'react';

function TableCard({title, id, userId}) {

    const [notebooks, setNotebooks] = useState([]);

    useEffect(() => {

    }, []);

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

    return (
        <div className={styles.personalTable}>
            <div className={styles.personalHead}>
                <span>{title}</span>
                <button className={styles.addNewPersonalNotebook} onClick={addNewNotebook}>
                    <img src="/public/littlePlusIcon.svg" alt="add new private notebook"/>
                </button>
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