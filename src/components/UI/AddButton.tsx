import React from "react";
import styled from "styled-components";
import { CommonButton } from "@/styles/CommonButton";
const Button = styled(CommonButton)`
  background: var(--button-color);
  &:hover {
    background: #c75af6;
  }
`;
const AddButton = () => {
  return <Button title="Add Feedback">+ Add Feedback</Button>;
};

export default AddButton;
