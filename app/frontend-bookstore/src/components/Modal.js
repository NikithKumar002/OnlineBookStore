export default function Modal({ title, onClose, children }) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={header}>
          <h3>{title}</h3>
          <button onClick={onClose}>✖</button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modal = {
  background: "#fff",
  padding: 20,
  width: 420,
  borderRadius: 6,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
};
