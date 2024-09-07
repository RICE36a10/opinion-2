import React from "react";
import Dropdown from "./UI/Dropdown";
import ArrowDown from "@/assets/shared/icon-arrow-down-white.svg";
import ArrowUp from "@/assets/shared/icon-arrow-up-white.svg";
import { useState } from "react";
import styled from "styled-components";

const SortFeedbacks = () => {
  const options = [
    { name: "Most Upvotes", id: "descUpvotes" },
    { name: "Least Upvotes", id: "ascUpvotes" },
    { name: "Most Comments", id: "descComments" },
    { name: "Least Comments", id: "ascComments" },
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0].name);

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
        <span className={isOpen ? "opacity" : ""}>{selectedOption}</span>
        {isOpen ? <img src={ArrowUp} /> : <img src={ArrowDown} />}
      </SortButton>
      {isOpen && (
        <Dropdown
          options={options}
          setOption={setSelectedOption}
          closeDropdown={closeDropdown}
          selectedOption={selectedOption}
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
