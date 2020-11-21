import React from "react";

function JumbotronSmall({ children }) {
  return (
    <div
      style={{
        height: 50,
        clear: "both",
        paddingTop: 25,
        textAlign: "center",
        marginBottom: 0,
      }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default JumbotronSmall;
