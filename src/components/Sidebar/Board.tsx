import styled from "styled-components";
import bgHeader from "@/assets/suggestions/desktop/background-header.png";
import burger from "@/assets/shared/mobile/icon-hamburger.svg";
import close from "@/assets/shared/mobile/icon-close.svg";
import React, { forwardRef } from "react";
export const BoardCard = styled.div`
  //background: url(${bgHeader});
    background-color: #8BC6EC;
    background-image: linear-gradient(135deg, #8BC6EC 0%, #222676 100%);
    background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 62px 24px 24px;
  border-radius: 10px;
  color: var(--primary-color);
  h1 {
    font-size: var(--h1-size);
    letter-spacing: var(--h1-spacing);
    line-height: var(--h1-line);
    font-weight: 700;
  }
  p {
    font-size: var(--body2-size);
    font-weight: 500;
    opacity: 0.5;
  }
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    h1 {
      font-size: var(--h2-size);
      letter-spacing: var(--h2-spacing);
      line-height: var(--h2-line);
    }
  }
  @media (max-width: 767.98px) {
    border-radius: unset;
    padding: 16px 24px;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 99999;
    h1 {
      font-size: 15px;
      letter-spacing: -0.19px;
      line-height: var(--h4-line);
    }
    p {
      font-size: var(--body3-size);
      line-height: var(--body3-line);
    }
  }
`;
export const NavButton = styled.button`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  @media (min-width: 768px) {
    display: none;
  }
`;
interface BoardProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const Board = forwardRef<HTMLDivElement, BoardProps>(
  ({ isOpen, setIsOpen }, ref) => {
    const handleToggle = () => {
      if (isOpen !== undefined && setIsOpen) {
        setIsOpen((prev) => !prev);
      }
    };
    return (
      <BoardCard ref={ref}>
        <h1>OpinionOasis</h1>
        <p>Listings</p>
        <NavButton onClick={handleToggle}>
          {isOpen ? (
            <img src={close} alt="close" />
          ) : (
            <img src={burger} alt="hamburger" />
          )}
        </NavButton>
      </BoardCard>
    );
  }
);

export default Board;
