import React from "react";
import styled from "styled-components";
import CheckIcon from "@/assets/shared/icon-check.svg";
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
  options: string[];
  setOption: React.Dispatch<React.SetStateAction<string>>;
  closeDropdown: () => void;
  selectedOption: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  setOption,
  closeDropdown,
  selectedOption,
}) => {
  const handleClick = (option: string) => {
    setOption(option);
    closeDropdown();
  };

  return (
    <DropdownWrapper>
      {options.map((option) => (
        <Option onClick={() => handleClick(option)}>
          {option}
          {option === selectedOption && <img src={CheckIcon} alt="Check" />}
        </Option>
      ))}
    </DropdownWrapper>
  );
};

export default Dropdown;
