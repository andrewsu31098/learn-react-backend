import styles from "./NotesInput.module.css";

function NotesInput(props) {
  return (
    <div className={styles.notesInput}>
      <form onSubmit={props.createTodo}>
        <h1>My Notes App</h1>
        <input
          onChange={props.onNameChange}
          placeholder="Note name"
          value={props.formData.name}
        />
        <input
          onChange={props.onDescriptionChange}
          placeholder="Note description"
          value={props.formData.description}
        />
        <input type="submit" value="Submit" />
        <div>
          <input type="file" onChange={props.onFileSubmit} />
        </div>
      </form>
    </div>
  );
}

export default NotesInput;
