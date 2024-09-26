import emptyImg from "@/assets/suggestions/illustration-empty.svg";
import styled from "styled-components";
import AddButton from "./UI/AddButton";
const NotFound = () => {
  return (
    <NotFoundWrapper>
      <img src={emptyImg} alt="Not found illustration" />
      <h3>There is no feedback yet.</h3>
      <p>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <AddButton />
    </NotFoundWrapper>
  );
};

const NotFoundWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 110px 24px;
  background: var(--primary-color);
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  @media (max-width: 767.98px) {
    padding: 76px 24px;
  }
  img {
    margin-bottom: 52px;
    @media (max-width: 767.98px) {
      margin-bottom: 40px;
    }
  }
  h3 {
    font-size: var(--h1-size);
    line-height: var(--h1-line);
    letter-spacing: var(--h1-spacing);
    font-weight: bold;
    margin-bottom: 16px;
    @media (max-width: 767.98px) {
      font-size: var(--h3-size);
      line-height: var(--h3-line);
      letter-spacing: var(--h3-spacing);
      margin-bottom: 14px;
    }
  }
  p {
    font-weight: 400;
    font-size: var(--body1-size);
    line-height: var(--body1-line);
    color: var(--text-secondary);
    max-width: 410px;
    margin-bottom: 48px;
    text-align: center;
    @media (max-width: 767.98px) {
      font-size: var(--body3-size);
      line-height: var(--body3-line);
      margin-bottom: 24px;
    }
  }
`;

export default NotFound;
