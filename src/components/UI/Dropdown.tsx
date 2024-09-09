import React from "react";
import styled from "styled-components";
import CheckIcon from "@/assets/shared/icon-check.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setSortBy } from "@/redux/slices/filterSlice";
import { sortByOrder } from "@/types/request";
const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 62px;
  border-radius: var(--border-radius);
  background: var(--primary-color);
  box-shadow: var(--box-shadow);
  width: 100%;
`;
const Option = styled.button`
  padding: 12px 24px;
  text-align: left;
  font-weight: 400;
  color: var(--text-secondary);
  font-size: var(--body1-size);
  line-height: var(--body1-line);
  transition: var(--transition);
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    color: var(--button-color);
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid rgb(58, 67, 116, 0.15);
  }
`;
interface DropdownProps {
  options: { name: string; id: string }[];
  closeDropdown: () => void;
  selectedOption: { name: string; id: sortByOrder };
  type: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  closeDropdown,
  selectedOption,
  type,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DropdownWrapper>
      {options.map((option) => (
        <Option
          onClick={() => {
            closeDropdown();
            if (type === "sortByOrder") {
              dispatch(setSortBy(option));
            }
          }}
        >
          {option.name}
          {option.name === selectedOption.name && (
            <img src={CheckIcon} alt="Check" />
          )}
        </Option>
      ))}
    </DropdownWrapper>
  );
};

export default Dropdown;
