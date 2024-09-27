import loadingImg from "@/assets/loading-gear.svg";
import styled from "styled-components";
const Loading = () => {
  return (
    <LoadingStyle>
      {" "}
      <img src={loadingImg} alt="Loading" />
    </LoadingStyle>
  );
};
const LoadingStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;
export default Loading;
