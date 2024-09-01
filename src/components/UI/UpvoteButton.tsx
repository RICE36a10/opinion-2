import styled from "styled-components";
import { useState } from "react";
const UpvoteButton = () => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const toggleClick = () => {
    setIsUpvoted(!isUpvoted);
  };
  return (
    <Button title="Vote" onClick={toggleClick} Upvote={isUpvoted}>
      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 6l4-4 4 4"
          stroke="#4661E6"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
        />
      </svg>
      112
    </Button>
  );
};
const Button = styled.button<{ Upvote: boolean }>`
  background: ${({ Upvote }) => (Upvote ? `var(--link-color)` : `#f2f4f7`)};
  display: flex;
  flex-direction: column;
  align-items: center;
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
