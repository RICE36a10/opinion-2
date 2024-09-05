import React from "react";
import styled from "styled-components";
import { LogButton } from "@/styles/LogButton";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
const LogOutBtn = styled(LogButton)`
  @media (max-width: 767.98px) {
    margin-left: 0;
    width: 100%;
  }
`;

const LogOut = () => {
  const logOut = async () => {
    try {
      signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return <LogOutBtn onClick={logOut}>Sign Out</LogOutBtn>;
};

export default LogOut;
