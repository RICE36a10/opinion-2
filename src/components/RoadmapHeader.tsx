import styled from "styled-components";
import Breadcrumb from "./UI/Breadcrumb";
import AddButton from "./UI/AddButton";
import LogIn from "./LogIn";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const RoadmapHeader = () => {
  const { user } = useSelector((state: RootState) => {
    return state.User;
  });
  return (
    <HeaderWrapper>
      <Wrapper>
        <Breadcrumb white />
        <Title>Roadmap</Title>
      </Wrapper>
      {user ? <AddButton /> : <LogIn />}
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 114px;
  padding: 27px 40px 27px 32px;
  background: #373f68;
  border-radius: var(--border-radius);
  @media (max-width: 1024px) {
    padding-right: 32px;
  }
  @media (max-width: 767.98px) {
    min-height: 100px;
    padding: 26px 24px;
    border-radius: unset;
    gap: 8px;
  }
`;
const Title = styled.h1`
  font-size: var(--h1-size);
  line-height: var(--h1-line);
  letter-spacing: var(--h1-spacing);
  color: var(--primary-color);
  margin-top: 4px;
  @media (max-width: 767.98px) {
    font-size: var(--h3-size);
    line-height: var(--h3-line);
    letter-spacing: var(--h3-spacing);
  }
`;
const Wrapper = styled.div``;
export default RoadmapHeader;
