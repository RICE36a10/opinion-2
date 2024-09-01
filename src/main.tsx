import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="611929867291-nda4vmcff71hlutkh9hth5mi9eef4idg.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
});
