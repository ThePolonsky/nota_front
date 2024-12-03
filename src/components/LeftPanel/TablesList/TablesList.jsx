import styles from './TablesList.module.css';
import TableCard from '../TableCard/TableCard.jsx';

function TablesList({tables, setTables, notebooks, setNotebooks, notes, setNotes}) {

    return (
        <div className={styles.tablesList}>
            {tables.length > 0 ? (
                <>
                    {tables.sort((a, b) => {
                        if (a.access === 'PERSONAL' && b.access !== 'PERSONAL') {
                            return -1;
                        } else if (a.access !== 'PERSONAL' && b.access === 'PERSONAL') {
                            return 1;
                        }
                    }).map(table => (
                        <TableCard
                            key={`${table.id}`}
                            tableId={table.id}
                            title={table.title}
                            access={table.access}
                            tables={tables}
                            setTables={setTables}
                            notebooks={notebooks}
                            setNotebooks={setNotebooks}
                            notes={notes}
                            setNotes={setNotes}
                        />
                    ))}
                </>
            ) : (
                <span>No tables :(</span>
            )}
        </div>
    );
}

export default TablesList;