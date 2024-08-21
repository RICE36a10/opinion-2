import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import styled from "styled-components";
import FeedbackContainer from "@/components/FeedbackContainer";
import Board from "@/components/Sidebar/Board";
import { useState, useEffect } from "react";
const Container = styled.div`
  max-width: 1110px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 40px 0;
  display: flex;
  gap: 30px;
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
  }
  @media (max-width: 768px) {
    padding: 0;
    gap: 0;
  }
`;
const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Container>
      {isMobile && <Board />}
      <Sidebar isMobile={isMobile} />
      <FeedbackContainer />
    </Container>
  );
};

export default Home;
