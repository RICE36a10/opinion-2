import Sidebar from "@/components/Sidebar/Sidebar";
import styled from "styled-components";
import FeedbackContainer from "@/components/FeedbackContainer";
import Board from "@/components/Sidebar/Board";
import { useState, useEffect, useRef, useCallback } from "react";
import Overlay from "@/components/UI/Overlay";
import Header from "@/components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    const isCurrentlyMobile = window.innerWidth < 768;
    if (isMobile !== isCurrentlyMobile) {
      setIsMobile(isCurrentlyMobile);
    }
  }, [isMobile]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      sidebarRef.current &&
      headerRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      !headerRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("click", handleClickOutside);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClickOutside]);

  const handleClose = () => {
    setIsOpen(false);
  };
  // Handle Sort

  return (
    <div>
      <Container>
        {isMobile && (
            <Board isOpen={isOpen} setIsOpen={setIsOpen} ref={headerRef} />
        )}
        <Sidebar ref={sidebarRef} isMobile={isMobile} isOpen={isOpen} />
        <ContentWrapper>
          <Header isMobile={isMobile} />
          <FeedbackContainer />
        </ContentWrapper>
        {isOpen && <Overlay />}
      </Container>
      <p style={{textAlign: 'center', color: 'white' }}>
        Made With <FontAwesomeIcon icon={faHeart} style={{color:'red',}} /> By Yash
      </p>

    </div>
  );
};

const Container = styled.div`
  max-width: 1158px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 24px 100px;
  display: flex;
  gap: 30px;
  //background-color: #ffa100;
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
  }
  @media (max-width: 767.98px) {
    padding: 0;
    gap: 0;
  }
`;
const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default Home;
