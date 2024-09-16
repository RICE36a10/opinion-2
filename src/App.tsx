import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { GlobalStyle } from "./styles/GlobalStyle";
import Modal from "./components/UI/Modal";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <Modal />
    </>
  );
}

export default App;
