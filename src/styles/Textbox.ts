import styled from "styled-components";

export const Textbox = styled.textarea<{ isError: boolean }>`
  min-height: 80px;
  border-radius: 5px;
  background: var(--bg-main);
  border: ${({ isError }) =>
    isError ? `1px solid var(--error-color)` : `none`};
  font-weight: 400;
  font-size: var(--body2-size);
  line-height: var(--body2-line);
  color: var(--text-primary);
  transition: var(--transition);
  padding: 16px 24px;
  flex: 1;
  outline: none;
  resize: none;
  &::placeholder {
    color: #8c92b3;
  }
  &:hover,
  &:focus {
    ${({ isError }) => (isError ? `var(--error-color)` : `var(--link-color)`)};
  }
`;
