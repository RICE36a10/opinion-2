import styled from "styled-components";
import { CommonButton } from "@/styles/CommonButton";
import { Link, useLocation } from "react-router-dom";
const Button = styled(CommonButton)`
  background: var(--button-color);
  &:hover {
    background: #c75af6;
  }
`;
const AddButton = () => {
  const location = useLocation();
  return (
    <Link to="/feedback/add" state={{ from: location.pathname }}>
      <Button title="Add Feedback">+ Add Feedback</Button>
    </Link>
  );
};

export default AddButton;
