import React from "react";
import styled from "styled-components";
import { CommonButton } from "@/styles/CommonButton";
const EditButton = () => {
  return <Button title="Edit Feedback">Edit Feedback</Button>;
};
const Button = styled(CommonButton)`
  background: var(--link-color);
  &:hover {
    background: #7c91f9;
  }
`;
export default EditButton;
