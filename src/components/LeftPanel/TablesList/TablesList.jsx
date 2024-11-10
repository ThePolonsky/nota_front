import styles from './TablesList.module.css';
import TableCard from '../TableCard/TableCard.jsx';

function TablesList({tables, setTables, userId, notebooks, setNotebooks, notes}) {



    return (
        <div className={styles.tablesList}>
            {tables.length > 0 ? (
                <>
                    {tables.map(table => (
                        <TableCard
                            key={`${table.id}`}
                            tableId={table.id}
                            title={table.title}
                            tables={tables}
                            setTables={setTables}
                            userId={userId}
                            notebooks={notebooks}
                            setNotebooks={setNotebooks}
                            notes={notes}
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