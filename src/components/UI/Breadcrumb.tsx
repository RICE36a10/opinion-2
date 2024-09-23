import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import leftArrow from "@/assets/shared/icon-arrow-left.svg";
const Breadcrumb: React.FC<{ url?: string }> = ({ url }) => {
  const directUrl = url ? `${window.location.origin}${url}` : "/";
  return (
    <Wrapper>
      <img src={leftArrow} alt="Left Arrow" />
      <Link to={directUrl}>Go Back</Link>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  a {
    font-weight: bold;
    font-size: var(--h4-size);
    line-height: var(--h4-line);
    color: var(--text-secondary);
    @media (max-width: 767.98px) {
      font-size: var(--body3-size);
      line-height: var(--body3-line);
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;
export default Breadcrumb;
