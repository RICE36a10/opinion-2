import React from "react";
import Icon from "@/assets/suggestions/icon-suggestions.svg";
import styled from "styled-components";
import SortFeedbacks from "./SortFeedbacks";
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background: #373f68;
  border-radius: var(--border-radius);
  padding: 14px 16px 14px 24px;
  min-height: 72px;
`;
const Suggestion = styled.div`
  margin-left: 16px;
  font-size: var(--h3-size);
  line-height: var(--h3-line);
  letter-spacing: var(--h3-spacing);
  font-weight: 700;
  color: var(--primary-color);
`;
const Header = () => {
  return (
    <StyledHeader>
      <img src={Icon} alt="Suggestion icon" />
      <Suggestion>
        <span className="count">6</span> Suggestions
      </Suggestion>
      <SortFeedbacks />
    </StyledHeader>
  );
};

export default Header;
