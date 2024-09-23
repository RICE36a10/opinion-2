import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { GlobalStyle } from "./styles/GlobalStyle";
import LoginModal from "./components/UI/Modals/LoginModal";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <LoginModal />
    </>
  );
}

export default App;
