import { lazy, ReactNode, Suspense } from "react";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import { getUserRole } from "../utils/authUtils";
import AdminNavbar from "./AdminNavBar";

const Home = lazy(() => import("../pages/home"));
const About_Us = lazy(() => import("../pages/about"));
const Ads = lazy(() => import("../pages/ads"));
const Contact = lazy(() => import("../pages/contact"));
const Tournaments = lazy(() => import("../pages/tournaments"));
const Gentlemen = lazy(() => import("../pages/gentlemen"));
const LoginComunicacion = lazy(() => import("../pages/loginComunicacion"));
const Panel = lazy(() => import("../pages/panel"));
const Palapas = lazy(() => import("../pages/reservations/palapas"));
const Salones = lazy(() => import("../pages/reservations/salones"));
const Login = lazy(() => import("../pages/login"));
const Index = lazy(() => import("../pages/reservations/index"));
const Reservacion = lazy(() => import("../pages/reservations/reservacion"));
const PanelReservations = lazy(() => import("../pages/panelReservations"));
const Invitados = lazy(() => import("../pages/invitados"));
const ChangeInitialPassword = lazy(
	() => import("../pages/changeInitialPassword")
);
const ResumenReservacion = lazy(() => import("../pages/detallesReservacion"));
const AccountAdmin = lazy(() => import("../pages/accountAdmin"));
const ResetPassword = lazy(() => import("../pages/resetPassword"));
import { PalapaProvider } from "../context/PalapaContext";

interface PrivateRouteProps {
	children: ReactNode;
	allowedRoles?: string[]; // Opcional para soportar rutas públicas
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
	allowedRoles,
}) => {
	const token = localStorage.getItem("authToken");

	if (!token) {
		return <Navigate to="/Login" />;
	}

	try {
		const decodedToken = JSON.parse(atob(token.split(".")[1]));
		const { role, exp } = decodedToken;

		// Verificar si el token ha expirado
		const currentTime = Math.floor(Date.now() / 1000); // Convertir a segundos
		if (exp && currentTime > exp) {
			localStorage.removeItem("authToken"); // Opcional, para limpiar el token caducado
			return <Navigate to="/Login" />;
		}

		// Verificar si el rol está permitido
		if (allowedRoles && !allowedRoles.includes(role)) {
			// Redirección personalizada basada en el rol
			switch (role) {
				case "admin":
					return <Navigate to="/PanelResevaciones" />;
				case "empleado":
					return <Navigate to="/Invitados" />;
				default:
					return <Navigate to="/unauthorized" />;
			}
		}

		return <>{children}</>;
	} catch (error) {
		console.error("Error decodificando el token:", error);
		return <Navigate to="/Login" />;
	}
};

const Layout = () => {
	const location = useLocation();
	const noNavbarRoutes = [
		"/LoginComunicacion",
		"/panel",
		"/Panel",
		"/Invitados",
	];
	const showNavbar =
		!noNavbarRoutes.includes(location.pathname) &&
		!noNavbarRoutes.includes(location.state?.from);
	const role = getUserRole();

	return (
		<>
			<div className="flex flex-col min-h-screen">
				{showNavbar &&
					(role === "superadmin" ? <AdminNavbar /> : <Navbar />)}
				<div className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/About_Us" element={<About_Us />} />
						<Route path="/Ads" element={<Ads />} />
						<Route path="/Contact" element={<Contact />} />
						<Route path="/Tournaments" element={<Tournaments />} />
						<Route path="/Gentlemen" element={<Gentlemen />} />
						<Route
							path="/LoginComunicacion"
							element={<LoginComunicacion />}
						/>
						<Route path="/Salones" element={<Salones />} />
						<Route path="/Login" element={<Login />} />
						<Route path="/index" element={<Index />} />
						<Route
							path="/ResetPassword"
							element={<ResetPassword />}
						/>
						<Route
							path="/ChangeInitialPassword"
							element={<ChangeInitialPassword />}
						/>
						<Route
							path="/Palapas"
							element={
								<PrivateRoute>
									<PalapaProvider>
										<Palapas />
									</PalapaProvider>
								</PrivateRoute>
							}
						/>
						<Route
							path="/reservacion"
							element={
								<PrivateRoute>
									<PalapaProvider>
										<Reservacion />
									</PalapaProvider>
								</PrivateRoute>
							}
						/>
						<Route
							path="/resumenReservacion"
							element={
								<PrivateRoute>
									<PalapaProvider>
										<ResumenReservacion />
									</PalapaProvider>
								</PrivateRoute>
							}
						/>
						<Route
							path="/PanelResevaciones"
							element={
								<PrivateRoute allowedRoles={["admin", "superadmin"]}>
									<PanelReservations />
								</PrivateRoute>
							}
						/>
						<Route
							path="/Invitados"
							element={
								<PrivateRoute allowedRoles={["empleado", "superadmin"]}>
									<Invitados />
								</PrivateRoute>
							}
						/>
						<Route
							path="/AccountAdmin"
							element={
								<PrivateRoute allowedRoles={["superadmin"]}>
									<AccountAdmin />
								</PrivateRoute>
							}
						/>
						<Route
							path="/Panel"
							element={
								<PrivateRouteComuni>
									<Panel />
								</PrivateRouteComuni>
							}
						/>
						<Route
							path="/unauthorized"
							element={<div>No tienes acceso a esta página</div>}
						/>
					</Routes>
				</div>
				{showNavbar && <Footer />}
			</div>
		</>
	);
};

const PrivateRouteComuni: React.FC<PrivateRouteProps> = ({ children }) => {
	const token = localStorage.getItem("token");
	return token ? <>{children}</> : <Navigate to="/LoginComunicacion" />;
};

const Router = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Layout />
			</Suspense>
		</BrowserRouter>
	);
};

export default Router;
