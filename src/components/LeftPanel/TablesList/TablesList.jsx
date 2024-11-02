import styles from './TablesList.module.css';
import TableCard from '../TableCard/TableCard.jsx';

function TablesList({tables, userId}) {



    return (
        <div className={styles.tablesList}>
            {tables.length > 0 ? (
                <>
                    {tables.map(table => (
                        <TableCard
                            key={`${table.id}`}
                            id={table.id}
                            title={table.title}
                            userId={userId}
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