import React from "react";

function Jumbotron({ children }) {
  var bgColors = {
    gray: "#e9ecef",
    yellow: "#f3f3b5",
  };
  return (
    <div
      style={{
        height: 200,
        clear: "both",
        paddingTop: 50,
        textAlign: "center",
        backgroundColor: bgColors.yellow,
      }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
