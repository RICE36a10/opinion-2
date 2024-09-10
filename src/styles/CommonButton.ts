import styled from "styled-components";

export const CommonButton = styled.button`
  min-height: 44px;
  border-radius: var(--border-radius);
  padding: 12px 24px;
  font-weight: 700;
  color: #f2f4fe;
  font-size: var(--h4-size);
  line-height: var(--h4-line);
  @media (max-width: 767.98px) {
    min-height: 40px;
    font-size: var(--body3-size);
    line-height: var(--body3-line);
    padding: 10px 16px;
  }
`;
