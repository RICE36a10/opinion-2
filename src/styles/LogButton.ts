import styled from "styled-components";

export const LogButton = styled.button`
  background: var(--primary-color);
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: var(--border-radius);
  padding: 0 20px;
  font-weight: 700;
  font-size: var(--h4-size);
  line-height: var(--h4-line);
  color: var(--text-primary);
  margin-left: 10px;
  border: 1px solid #8e8e8e;
  &:hover {
    box-shadow: inset 0 0 0 150px rgba(0, 0, 0, 0.1);
  }
`;
