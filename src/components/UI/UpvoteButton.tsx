import styled from "styled-components";
import React, { useState } from "react";
import { upvoteFeedback } from "@/services/feedback";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const UpvoteButton: React.FC<{ vote: number; id: string }> = ({ vote, id }) => {
  const { user } = useSelector((state: RootState) => {
    return state.User;
  });
  const [upvote, setUpvote] = useState(false);
  const [voteCount, setVoteCount] = useState(vote);
  const toggleClick = async () => {
    if (user) {
      try {
        const result = await upvoteFeedback(id, user.uid);
        if (result?.success) {
          setUpvote((prev) => !prev);
          setVoteCount(result.upvoteCount);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("User not logged in");
      // Show login modal or redirect to login page.
    }
  };

  return (
    <Button title="Vote" onClick={toggleClick} upvoteProp={upvote}>
      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 6l4-4 4 4"
          stroke="#4661E6"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
        />
      </svg>
      {voteCount}
    </Button>
  );
};
const Button = styled.button<{ upvoteProp: boolean }>`
  background: ${({ upvoteProp }) =>
    upvoteProp ? `var(--link-color)` : `#f2f4f7`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--border-radius);
  padding: 8px;
  height: 53px;
  min-width: 40px;
  color: ${({ upvoteProp }) =>
    upvoteProp ? `var(--primary-color)` : `var(--text-primary)`};
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
    stroke: ${({ upvoteProp }) =>
      upvoteProp ? `var(--primary-color)` : `var(--link-color)`};
  }
  &:hover {
    ${({ upvoteProp }) =>
      !upvoteProp &&
      `background: var(--hover-color);
`}
  }
`;
export default UpvoteButton;
