import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./app/App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const clientIdValue: string = process.env.REACT_APP_GOOGLE_KEY as string;
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientIdValue}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
