import { createPortal } from "react-dom";
import styled from "styled-components";
const OverlayWrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: var(--transition);
`;
const Overlay = () => {
  return createPortal(<OverlayWrapper />, document.body);
};

export default Overlay;
