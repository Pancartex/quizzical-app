import React from "react";

export default function AnswerLi(props) {
  const styles = {
    backgroundColor: props.isSelected ? "#94D7A2" : "#fff",
  };

  return <li style={styles}>{props.name}</li>;
}
