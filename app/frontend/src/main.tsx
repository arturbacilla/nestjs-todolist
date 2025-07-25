import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: uses react boileplate
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider toastOptions={{ defaultOptions: { position: "bottom" } }}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
);
