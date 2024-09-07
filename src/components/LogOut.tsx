import styled from "styled-components";
import { LogButton } from "@/styles/LogButton";
import { logOutUser } from "@/redux/actions/user";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const LogOutBtn = styled(LogButton)`
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
