import styles from './OptionsModule.module.css';

function OptionsModule({className}) {


    return (
        <div className={className}>
            <div className={styles.optionsModule}>
                <button className={styles.renameTableBtn}>
                    <span>Rename</span>
                </button>
                <button className={styles.deleteTableBtn}>
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
}

export default OptionsModule;