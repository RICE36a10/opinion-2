import React from "react";
import styled from "styled-components";
import { CommonButton } from "@/styles/CommonButton";
import { Link, useLocation } from "react-router-dom";
import { SingleRequest } from "@/types/request";
const EditButton: React.FC<{ feedback: SingleRequest }> = ({ feedback }) => {
  const location = useLocation().pathname;
  return (
    <Link to={`${location}/edit`} state={{ data: feedback, path: location }}>
      <Button title="Edit Feedback">Edit Feedback</Button>
    </Link>
  );
};
const Button = styled(CommonButton)`
  background: var(--link-color);
  &:hover {
    background: #7c91f9;
  }
`;
export default EditButton;
