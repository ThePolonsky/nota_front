import styles from './AddNewButton.module.css';

function AddNewButton({item, addNewItem}) {
    return (
        <button className={styles.addNewItemBtn} onClick={addNewItem}>
            <img src="/public/littlePlusIcon.svg" alt={`add new ${item}`}/>
        </button>
    );
}

export default AddNewButton;