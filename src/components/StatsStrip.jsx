function StatsStrip({ active, completed }) {
  return (
    <div className="stat-grid below-panel">
      <div className="stat-card">
        <span>Active tasks</span>
        <strong>{active}</strong>
      </div>
      <div className="stat-card">
        <span>Completed</span>
        <strong>{completed}</strong>
      </div>
    </div>
  );
}

export default StatsStrip;
