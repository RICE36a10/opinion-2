import React from "react";
import styled from "styled-components";
import { logoutUser } from "@/redux/slices/userSlice";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { LogButton } from "@/styles/LogButton";
const LogOutBtn = styled(LogButton)`
  @media (max-width: 767.98px) {
    margin-left: 0;
    width: 100%;
  }
`;

const LogOut = () => {
  const dispatch: AppDispatch = useDispatch();
  const logOut = () => {
    googleLogout();
    dispatch(logoutUser());
  };

  return <LogOutBtn onClick={logOut}>Sign Out</LogOutBtn>;
};

export default LogOut;
