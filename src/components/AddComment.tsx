import React, { useState } from "react";
import styled from "styled-components";

const AddComment = () => {
  const [commentText, setCommentText] = useState("");
  const [isError, setIsError] = useState(false);

  return (
    <AddCommentWrapper>
      <SectionTitle>Add Comment</SectionTitle>
    </AddCommentWrapper>
  );
};

const AddCommentWrapper = styled.section`
  background: var(--primary-color);
  padding: 24px 34px;
  border-radius: var(--border-radius);
`;
const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: var(--h3-size);
  line-height: var(--h3-line);
  letter-spacing: var(--h3-spacing);
  color: var(--text-primary);
  margin-bottom: 24px;
`;

export default AddComment;
