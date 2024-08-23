import React from "react";
import Dropdown from "./Dropdown";
import ArrowDown from "@/assets/shared/icon-arrow-down-white.svg";
import ArrowUp from "@/assets/shared/icon-arrow-up-white.svg";
import styled from "styled-components";
const SortContainer = styled.div`
  margin-left: 38px;
  margin-right: auto;
`;
const SortButton = styled.button``;
const SortFeedbacks = () => {
  return (
    <SortContainer>
      <SortButton>
        Sort by:<span className="option">Most Upvotes</span>
        <img src={ArrowDown} />
      </SortButton>
      {/* <Dropdown
        options={[
          "MostUpvotes",
          "Least Upvotes",
          "Most Comments",
          "Least Comments",
        ]}
      /> */}
    </SortContainer>
  );
};

export default SortFeedbacks;
