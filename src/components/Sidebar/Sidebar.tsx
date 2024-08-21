import Board from "./Board";
import CategoryFilter from "./CategoryFilter";
import Roadmap from "./Roadmap";
import styled from "styled-components";
import React, { useState } from "react";
const SidebarWrapper = styled.aside`
  width: 255px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: unset;
    gap: 10px;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 270px;
    max-width: 100%;
    background: red;
    height: calc(100vh - 71px);
    align-items: flex-end;
    padding: 24px;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  }
`;
interface SidebarProps {
  isMobile: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  return (
    <SidebarWrapper>
      {!isMobile && <Board />}
      <CategoryFilter />
      <Roadmap />
    </SidebarWrapper>
  );
};

export default Sidebar;
