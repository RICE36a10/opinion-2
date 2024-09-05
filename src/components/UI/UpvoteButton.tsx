import styled from "styled-components";
import React, { useState } from "react";
import { updateProductUpvote } from "@/api/services/feedback";
import useAsync from "@/utils/hooks/useAsync";
const UpvoteButton: React.FC<{ vote: number; productId: string }> = ({
  vote,
  productId,
}) => {
  const [upvote, setUpvote] = useState(false);
  // const [hasUserUpvote, setHasUserUpvote] = useState(false);
  // const { execute: executeUpdateProductUpvote } = useAsync(
  //   updateProductUpvote,
  //   {}
  // );

  const toggleClick = () => {
    setUpvote((prev) => !prev);
    // executeUpdateProductUpvote(productId, upvote, hasUserUpvote);
    // setHasUserUpvote(true);
  };

  return (
    <Button title="Vote" onClick={toggleClick} Upvote={upvote}>
      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 6l4-4 4 4"
          stroke="#4661E6"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
        />
      </svg>
      {vote}
    </Button>
  );
};
const Button = styled.button<{ Upvote: boolean }>`
  background: ${({ Upvote }) => (Upvote ? `var(--link-color)` : `#f2f4f7`)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--border-radius);
  padding: 8px;
  height: 53px;
  min-width: 40px;
  color: ${({ Upvote }) =>
    Upvote ? `var(--primary-color)` : `var(--text-primary)`};
  font-weight: bold;
  font-size: var(--body3-size);
  line-height: var(--body3-line);
  letter-spacing: -0.18px;
  transition: var(--transition);
  @media (max-width: 767.98px) {
    flex-direction: row;
    height: 32px;
    min-width: 70px;
    gap: 10px;
  }
  svg path {
    stroke: ${({ Upvote }) =>
      Upvote ? `var(--primary-color)` : `var(--link-color)`};
  }
  &:hover {
    ${({ Upvote }) =>
      !Upvote &&
      `background: var(--hover-color);
`}
  }
`;
export default UpvoteButton;
