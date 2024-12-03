import styles from './OptionsButton.module.css';

function OptionsButton({openOptionsPopover}) {


    return (
        <button className={styles.optionsBtn} onClick={(e) => openOptionsPopover(e)}>
            <img src="/public/optionsIcon.svg" alt="options button"/>
        </button>
    );
}

export default OptionsButton;