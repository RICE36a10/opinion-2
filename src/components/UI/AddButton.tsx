import styled from "styled-components";
import { CommonButton } from "@/styles/CommonButton";
import { Link, useLocation } from "react-router-dom";
const Button = styled(CommonButton)`
    background: white;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #859398, #283048);  /* Chrome 10-25, Safari 5.1-6 */
    transition: background-color 0.3s, color 0.7s, scale 1s;
    color: #3a4374;
    border: 4px white;
    
    //background: var(--button-color);
  &:hover {
      
      //background: linear-gradient(to right, #859398, #283048); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    //background: #c75af6;
      scale: 1.03;
      background-color: #b761ba;
      color: white;
  }
`;
const AddButton = () => {
  const location = useLocation();
  return (
    <Link to="/feedbacks/add" state={{ from: location.pathname }}>
      <Button title="Add Feedback">+ Add Feedback</Button>
    </Link>
  );
};

export default AddButton;
