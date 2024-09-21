import styled from "styled-components";
import { CommonInputStyle } from "./CommonInput";
export const Input = styled.input<{ $isError: boolean }>`
  ${CommonInputStyle}
  min-height: 48px;
  width: 100%;
  border: ${({ $isError }) =>
    $isError ? `1px solid var(--error-color)` : `none`};

  padding: 12px 24px;
  &:focus {
    border: 1px solid
      ${({ $isError }) =>
        $isError ? `var(--error-color)` : `var(--link-color)`};
  }
  @media (max-width: 767.98px) {
    padding: 16px;
  }
`;
