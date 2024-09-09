import React from "react";
import Dropdown from "./UI/Dropdown";
import ArrowDown from "@/assets/shared/icon-arrow-down-white.svg";
import ArrowUp from "@/assets/shared/icon-arrow-up-white.svg";
import { useState } from "react";
import styled from "styled-components";
import { sortOptions } from "@/types/request";
import { sortByOrder } from "@/types/request";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const SortFeedbacks = () => {
  const options: sortOptions = [
    { name: "Most Upvotes", id: sortByOrder.DESC_UPVOTES },
    { name: "Least Upvotes", id: sortByOrder.ASC_UPVOTES },
    { name: "Most Comments", id: sortByOrder.DESC_COMMENTS },
    { name: "Least Comments", id: sortByOrder.ASC_COMMENTS },
  ];
  const { sortBy: selectedOption } = useSelector(
    (state: RootState) => state.Filter
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <SortContainer>
      <SortButton onClick={toggleDropdown}>
        <span className="sort-text">Sort by :</span>{" "}
        <span className={isOpen ? "opacity" : ""}>{selectedOption.name}</span>
        {isOpen ? <img src={ArrowUp} /> : <img src={ArrowDown} />}
      </SortButton>
      {isOpen && (
        <Dropdown
          options={options}
          closeDropdown={closeDropdown}
          selectedOption={selectedOption}
          type="sortByOrder"
        />
      )}
    </SortContainer>
  );
};

const SortContainer = styled.div`
  margin-left: 38px;
  margin-right: auto;
  position: relative;
  width: 255px;
  @media (max-width: 1024px) {
    width: 200px;
  }
  @media (max-width: 767.98px) {
    margin-left: 0;
  }
`;
const SortButton = styled.button`
  color: #f2f4fe;
  font-size: var(--h4-size);
  line-height: var(--h4-line);
  font-weight: 700;
  .sort-text {
    opacity: 0.75;
    font-weight: 400;
  }
  img {
    margin-left: 9px;
  }

  .opacity {
    opacity: 0.75;
  }
`;

export default SortFeedbacks;
