function Composer({ value, onChange, onAdd }) {
  return (
    <div className="composer">
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Add a reminder..."
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onAdd();
          }
        }}
      />
      <button onClick={onAdd} type="button">
        Add
      </button>
    </div>
  );
}

export default Composer;
