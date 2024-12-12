import styles from './TablesList.module.css';
import TableCard from '../TableCard/TableCard.jsx';
import {useContext} from 'react';
import {UserContext} from '../../../context/user.context.js';
import {TabsContext} from '../../../context/tabs.context.js';

function TablesList({ tables, notebooks, notes, setTables, setNotebooks, setNotes }) {

    const { userId, user, setUser } = useContext(UserContext);
    const { tabs, setTabs, selectedTabIndex, setSelectedTabIndex } = useContext(TabsContext);

    return (
        <div className={styles.tablesList}>
            {<>
                {tables.sort((a, b) => {
                    if (a.access === 'PERSONAL' && b.access !== 'PERSONAL') {
                        return -1;
                    } else if (a.access !== 'PERSONAL' && b.access === 'PERSONAL') {
                        return 1;
                    }
                }).map(table => (
                    <TableCard
                        key={`${table.id}`}
                        table={table}
                        tables={tables}
                        notebooks={notebooks}
                        notes={notes}
                        setTables={setTables}
                        setNotebooks={setNotebooks}
                        setNotes={setNotes}
                    />
                ))}
            </>}
        </div>
    );
}

export default TablesList;