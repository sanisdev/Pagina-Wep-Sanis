import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";


import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "primereact/resources/themes/saga-blue/theme.css"; // Tema de PrimeReact
import "primereact/resources/primereact.min.css"; // Estilos principales de PrimeReact
import 'primeicons/primeicons.css';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
			<App />
		</PrimeReactProvider>
	</React.StrictMode>
);
