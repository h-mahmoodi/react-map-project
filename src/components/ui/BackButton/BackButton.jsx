import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <Button type="back" onClick={clickHandler}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
