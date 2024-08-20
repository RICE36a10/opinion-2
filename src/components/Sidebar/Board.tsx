import React from "react";
import styled from "styled-components";
import bgHeader from "@";
export const BoardCard = styled.div`
  background: url(${bgHeader});
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
    opacity: 0.75;
  }
`;
const Board = () => {
  return (
    <BoardCard>
      <h1>Frontend Mentor</h1>
      <p>Feedback Board</p>
    </BoardCard>
  );
};

export default Board;
