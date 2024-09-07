/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { upvoteFeedback } from "@/services/feedback";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Modal from "./Modal";
const UpvoteButton: React.FC<{
  vote: number;
  id: string;
  upvotedBy: string[];
}> = ({ vote, id, upvotedBy }) => {
  const { user } = useSelector((state: RootState) => {
    return state.User;
  });
  const [upvotedUsers, setUpvotedUsers] = useState(upvotedBy);
  const [voteCount, setVoteCount] = useState(vote);
  const [isOpen, setIsOpen] = useState(false);
  const isUpvoted = user?.uid ? upvotedUsers.includes(user.uid) : false;
  const [upvote, setUpvote] = useState(isUpvoted);

  const updateUpvotedUsers = (flag: boolean) => {
    if (user) {
      const hasUpvoted = flag;
      if (hasUpvoted) {
        setUpvotedUsers(upvotedUsers.filter((uid) => uid !== user.uid));
      } else {
        setUpvotedUsers([...upvotedUsers, user.uid]);
      }
    }
  };
  const onClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    setUpvote(isUpvoted);
    setVoteCount(voteCount);
  }, [isUpvoted, user]);
  const toggleClick = async () => {
    if (user) {
      try {
        const result = await upvoteFeedback(id, user.uid);
        const hasUpvoted = result?.hasUpvoted;
        setUpvote(!hasUpvoted);
        setVoteCount(hasUpvoted ? (prev) => prev - 1 : (prev) => prev + 1);
        updateUpvotedUsers(hasUpvoted);
      } catch (error) {
        console.error("Error upvoting feedback:", error);
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {" "}
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
      <Modal isOpen={isOpen} onClose={onClose} />
    </>
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
