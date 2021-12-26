import styles from "./NotesList.module.css";

function NotesList(props) {
  return (
    <div className={styles.notesList} style={{ marginBottom: 30 }}>
      {props.notes
        .map((note) => (
          <div className="noteCard" key={note.id || note.name}>
            <h2>{note.name}</h2>
            <p>{note.description}</p>
            <p>{note.diceNumber}</p>
            <div className="imageContainer">
              {note.image && <img src={note.image} style={{ width: 400 }} />}
            </div>
            <button onClick={() => props.deleteTodo(note)}>Delete note</button>
          </div>
        ))
        .reverse()}
    </div>
  );
}

export default NotesList;
