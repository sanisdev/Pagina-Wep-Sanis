import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState, useEffect, useRef } from "react";

import * as Constants from "../../constants";
import { Aviso } from "../../interfaces/interfaces";
import { obtenerAvisos } from "../../services/api-comunicacion";

const Ads = () => {
	const [avisos, setAvisos] = useState<Aviso[]>([]);
	const [loading, setLoading] = useState(true); // Nuevo estado de carga
	const spinnerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Función para obtener los datos
		const fetchData = async () => {
			try {
				const [avisosData] = await Promise.all([obtenerAvisos()]);
				setAvisos(avisosData);
			} catch (error) {
				console.error("Error al obtener Avisos:", error);
			} finally {
				setLoading(false); // Termina la carga
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (spinnerRef.current && loading) {
			spinnerRef.current.setAttribute("inert", "true");
		} else if (spinnerRef.current) {
			spinnerRef.current.removeAttribute("inert");
		}
	}, [loading]);

	return (
		<div
			className="flex flex-col pb-5 pt-2 space-y-5 align-middle justify-center items-center"
			aria-live="polite"
		>
			{loading ? (
				// Spinner de carga
				<div
					ref={spinnerRef}
					className="flex justify-center items-center h-64"
				>
					<ProgressSpinner
						style={{ width: "50px", height: "50px" }}
						strokeWidth="5"
						fill="var(--surface-ground)"
						animationDuration=".5s"
					/>
				</div>
			) : avisos.length === 0 ? (
				<Card
					className="my-2 shadow-2xl !bg-blue-950  !bg-cover !bg-no-repeat max-w-[90vw] md:max-w-[90vw] md:w-[90vw] p-2 justify-center align-middle items-center animate__animated animate__fadeIn"
				>
					{/* <Card className="my-2 shadow-2xl !bg-blue-800 max-w-[90vw] md:max-w-[90vw] md:w-[90vw] p-2 justify-center align-middle items-center animate__animated animate__fadeIn"> */}
					<div className="flex flex-row align-items-center gap-2 text-white">
						<img
							alt="logo"
							src={Constants.LOGO_MesaConstante}
							className="h-[60px] w-[60px] md:h-[60px] md:w[60px]"
							style={{
								filter: "invert(100%) sepia(100%) hue-rotate(600deg)",
							}}
						/>
						<span className="font-bold text-2xl text-[#FFFD00]">
							Estimado Socio
						</span>
					</div>
					<div>
						<p
							className="text-white p-4 text-center text-5xl break-words whitespace-normal"
							style={{
								overflowWrap: "break-word",
							}}
						>
							De Momento no hay avisos. <br /> Buen día
						</p>
					</div>
					<div className="flex flex-row text-end justify-center md:justify-end pt-2">
						<span className="font-bold text-2xl text-[#FFFD00]">
							Somos Sanis Somos Comunidad
						</span>
					</div>
				</Card>
			) : (
				<ul className="animate__animated animate__fadeIn">
					{avisos.map((aviso, index) => (
						<li key={index}>
							<Card className="my-2 shadow-2xl !bg-blue-950 !bg-cover !bg-no-repeat max-w-[90vw] md:max-w-[90vw] md:w-[90vw] p-2 justify-center align-middle items-center">
								{/* <Card className="my-2 shadow-2xl !bg-blue-950 max-w-[90vw] md:max-w-[90vw] md:w-[90vw] p-2 justify-center align-middle items-center"> */}
								<div className="flex flex-row align-items-center gap-2 text-white">
									<img
										alt="logo"
										src={Constants.LOGO_MesaConstante}
										className="h-[60px] w-[60px] md:h-[60px] md:w[60px]"
										style={{
											filter: "invert(100%) sepia(100%) hue-rotate(600deg)",
										}}
									/>
									<span className="font-bold text-2xl text-[#FFFD00]">
										Estimado Socio
									</span>
								</div>
								<div>
									<p
										className="text-white p-4 text-justify text-2xl break-words whitespace-normal"
										style={{
											overflowWrap: "break-word",
										}}
									>
										{aviso.descripcion}
									</p>
								</div>
								<div className="flex flex-row text-end justify-center md:justify-end pt-2">
									<span className="font-bold text-2xl text-[#FFFD00]">
										Somos Sanis Somos Comunidad
									</span>
								</div>
							</Card>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Ads;
