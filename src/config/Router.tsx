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
const Adeudos = lazy(() => import("../pages/adeudos"));
const ChangeInitialPassword = lazy(() => import("../pages/changeInitialPassword"));
const ResumenReservacion = lazy(() => import("../pages/detallesReservacion"));
const AccountAdmin= lazy(() => import("../pages/accountAdmin"));
const ResetPassword= lazy(() => import("../pages/resetPassword"));

interface PrivateRouteProps {
	children: ReactNode;
}

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
			{showNavbar && ( role === "superadmin" ? <AdminNavbar /> : <Navbar />)}
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
						<Route path="/Palapas" element={<Palapas />} />
						<Route path="/Salones" element={<Salones />} />
						<Route path="/Login/:isAdeudo" element={<Login />} />
						<Route path="/index" element={<Index />} />
						<Route
							path="/reservacion/:idPalapa"
							element={<Reservacion />}
						/>
						<Route
							path="/PanelResevaciones"
							element={<PanelReservations />}
						/>
						<Route path="/Invitados" element={<Invitados />} />
						<Route path="/Adeudos" element={<Adeudos />} />
						<Route
							path="/resumenReservacion"
							element={<ResumenReservacion />}
						/>
						<Route
							path="/ChangeInitialPassword"
							element={<ChangeInitialPassword />}
						/>
						<Route
							path="/ResetPassword"
							element={<ResetPassword />}
						/>
						<Route
							path="/AccountAdmin"
							element={<AccountAdmin />}
						/>
						<Route
							path="/Panel"
							element={
								<PrivateRoute>
									<Panel />
								</PrivateRoute>
							}
						/>
					</Routes>
				</div>
				{showNavbar && <Footer />}
			</div>
			
		</>
	);
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
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
