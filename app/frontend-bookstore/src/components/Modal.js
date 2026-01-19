export default function Modal({ title, onClose, onSwitch, children }) {
  const footer = title === "New User Registration" ? <>
        <p style={p_styles}> 
          Already have an account? 
          <a href="/" onClick={(e) => { e.preventDefault(); onSwitch("User Login"); }}>SignIn</a>
        </p>
  </> : title === "User Login" ? <>
        <p style={p_styles}> 
          Don't have an account? 
          <a href="/" onClick={(e) => { e.preventDefault(); onSwitch("New User Registration"); }}>SignUp</a>
        </p>
  </> : null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={header}>
          <h3 style={title === "User Login" ? login_h3_styles : h3_styles}>{title}</h3>
          <button onClick={onClose}>✖</button>
        </div>
        <div>{children}{footer}</div>
      </div>
    </div>
  );
}
const login_h3_styles = {
  margin: 0,
  padding: 0,
  textAlign: "center",
  paddingLeft: "90px",
};
const h3_styles = {
  margin: 0,
  padding: 0,
  textAlign: "center"
};
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
  width: 280,
  borderRadius: 6,
  maxHeight: 550,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
};


const p_styles = {
    fontSize: "12px",
    marginTop: "10px",
}
