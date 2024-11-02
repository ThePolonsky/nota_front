import styles from './NoteContent.module.css';
import {useState} from 'react';
import ContentEditable from 'react-contenteditable';

function NoteContent({content, setContent, setIsSaved}) {

    const [noteContent, setNoteContent] = useState(content);

    const handleChange = () => {
        setIsSaved(false);
        setNoteContent(document.getElementById('contentEditable').innerHTML);
        setContent(noteContent);
    };

    return (
            <ContentEditable
                className={styles.contentEditable}
                id={'contentEditable'}
                html={noteContent}
                onChange={handleChange}
                tagName="div"
            />
    );
}



export default NoteContent;