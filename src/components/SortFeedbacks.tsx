import Dropdown from "./UI/Dropdown";
import ArrowDown from "@/assets/shared/icon-arrow-down-white.svg";
import ArrowUp from "@/assets/shared/icon-arrow-up-white.svg";
import { useState } from "react";
import styled from "styled-components";
import { sortOptions } from "@/utils/constants/Options";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const SortFeedbacks = () => {
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
          options={sortOptions}
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
