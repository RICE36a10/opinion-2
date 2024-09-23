import Board from "./Board";
import CategoryFilter from "./CategoryFilter";
import Roadmap from "./Roadmap";
import styled from "styled-components";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LogIn from "../LogIn";
import LogOut from "../LogOut";
const SidebarWrapper = styled.aside<WrapperProps>`
  width: 255px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (min-width: 767.98px) and (max-width: 1024px) {
    flex-direction: unset;
    gap: 10px;
    width: 100%;
  }
  @media (max-width: 767.98px) {
    width: 270px;
    max-width: 100%;
    background: var(--bg-main);
    height: calc(100vh - 71px);
    align-items: flex-end;
    padding: 24px;
    transform: ${({ $isOpen }) => !$isOpen && `translateX(100%)`};
    transition: transform 0.4s ease-in-out;
    position: fixed;
    top: 71px;
    z-index: 99999;
    right: 0;
  }
`;
interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
}
interface WrapperProps {
  $isOpen: boolean;
}
const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ isMobile, isOpen }, ref) => {
    const { user } = useSelector((state: RootState) => {
      return state.User;
    });
    return (
      <SidebarWrapper ref={ref} $isOpen={isOpen}>
        {isMobile && !user && <LogIn isMenu />}
        {!isMobile && <Board />}
        <CategoryFilter />
        <Roadmap />
        {isMobile && user && <LogOut />}
      </SidebarWrapper>
    );
  }
);

export default Sidebar;
