import styled from "styled-components";
import { LogButton } from "@/styles/LogButton";
import { logOutUser } from "@/redux/actions/user";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const LogOutBtn = styled(LogButton)`

  background: white;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #859398, #283048);  /* Chrome 10-25, Safari 5.1-6 */
  transition: background-color 0.3s, color 0.7s, scale 1s;
  color: #3a4374;
  //background: var(--button-color);
  &:hover {

    //background: linear-gradient(to right, #859398, #283048); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    //background: #c75af6;
    scale: 1.03;
    background-color: #701274;
    //background-color: #de1212;
    color: white;
  }
  
  
  @media (max-width: 767.98px) {
    margin-left: 0;
    width: 100%;
  }
`;

const LogOut = () => {
  const dispatch: AppDispatch = useDispatch();
  const logOut = () => {
    dispatch(logOutUser());
  };
  return <LogOutBtn onClick={logOut}>Sign Out</LogOutBtn>;
};

export default LogOut;
