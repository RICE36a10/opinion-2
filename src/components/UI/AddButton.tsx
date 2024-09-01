import React from "react";
import styled from "styled-components";
const Button = styled.button`
  width: 158px;
  min-height: 44px;
  border-radius: var(--border-radius);
  background: var(--button-color);
  font-weight: 700;
  color: #f2f4fe;
  font-size: var(--h4-size);
  line-height: var(--h4-line);
  &:hover {
    background: #c75af6;
  }
  @media (max-width: 767.98px) {
    min-height: 40px;
    width: 134px;
  }
`;
const AddButton = () => {
  return <Button title="Add Feedback">+ Add Feedback</Button>;
};

export default AddButton;
