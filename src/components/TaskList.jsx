function TaskList({
  tasks,
  onToggle,
  onDelete,
  editingIndex,
  editingValue,
  onStartEdit,
  onEditChange,
  onSaveEdit,
  onCancelEdit
}) {
  return (
    <div className="list-block">
      <div className="list-heading">
        <h3>Today</h3>
        <span>{tasks.length} items</span>
      </div>
      <ul>
        {tasks.map((task) => {
          const isEditing = editingIndex === task.id;
          const isDone = task.done;
          return (
            <li key={task.id ?? task.title} className={task.done ? "done" : ""}>
              <div className="task-row">
                <label className="task-label">
                  <span
                    onClick={() => onToggle(task.id)}
                    className="check-indicator"
                    aria-hidden
                  />
                  <span className="task-content">
                    <input
                      type="text"
                      className={`task-input ${isEditing ? "editing" : ""}`}
                      value={isEditing ? editingValue : task.title}
                      readOnly={!isEditing}
                      autoFocus={isEditing}
                      onChange={(event) => {
                        if (isEditing) onEditChange(event.target.value);
                      }}
                      onClick={() => {
                        if (!isEditing) onToggle(task.id);
                      }}
                      onFocus={(event) => {
                        if (isEditing) {
                          event.target.select();
                        }
                      }}
                      onBlur={() => {
                        if (isEditing) onSaveEdit();
                      }}
                      onKeyDown={(event) => {
                        if (!isEditing) return;
                        if (event.key === "Enter") {
                          event.preventDefault();
                          onSaveEdit();
                        } else if (event.key === "Escape") {
                          event.preventDefault();
                          onCancelEdit();
                        }
                      }}
                    />
                  </span>
                </label>
                <div className="action-buttons">
                  <button
                    className={`edit-button ${isEditing ? "confirm" : ""}`}
                    type="button"
                    aria-label={
                      isEditing ? `Confirm ${task.title}` : `Edit ${task.title}`
                    }
                    onClick={() => {
                      if (isEditing) {
                        onSaveEdit();
                      } else {
                        onStartEdit(task.id);
                      }
                    }}
                    disabled={isDone && !isEditing}
                  >
                    {isEditing ? "✓" : "✎"}
                  </button>
                  <button
                    className="remove-button"
                    type="button"
                    aria-label={`Remove ${task.title}`}
                    onClick={() => onDelete(task.id)}
                  >
                    <span aria-hidden>&times;</span>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TaskList;
