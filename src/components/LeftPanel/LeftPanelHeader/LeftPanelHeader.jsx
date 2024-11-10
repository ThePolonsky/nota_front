import styles from './LeftPanelHeader.module.css';
import axios from 'axios';

function LeftPanelHeader({setTables, userId}) {

    const createTable = async (userId) => {
        try {
            const response = await axios.post('http://localhost:3000/api/tables', {
                userId
            });

            if (response.status !== 200) {
                throw new Error('Ошибка при создании таблицы');
            }

            const createdTable = response.data;
            console.log('Таблица создана успешно:', createdTable);
            return createdTable;
        } catch (error) {
            console.error('Произошла ошибка при создании таблицы:', error);
            throw error;
        }
    };

    const addNewTable = async () => {
        try {
            const newTable = await createTable(userId);
            setTables(prevTables => [...prevTables, newTable]);
        } catch (error) {
            console.error('Не удалось создать таблицу:', error);
        }
    };


    return (
        <div className={styles.leftPanelHeader}>
            <button className={styles.openPanelBtn} onClick={addNewTable}>
                <img src="/public/closePanelIcon.svg" alt="open panel"/>
            </button>
        </div>
    );
}


export default LeftPanelHeader;