import React from "react";
import Header from "./Header";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
`;
const FeedbackContainer = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default FeedbackContainer;
