import "primeicons/primeicons.css";
import * as Constants from "../constants";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import SvgIcon1 from "../assets/home/palapas.svg";
import SvgIcon3 from "../assets/home/canchas.svg";
import SvgBar from "../assets/home/bar.svg";

import IconSvg from "../components/IconSvg";

import "../css/Menubar.css";

const Navbar = () => {
	const Navigate = useNavigate();
	

	const start = (
		<img
			alt="logo"
			src={Constants.LOGO_MesaConstante}
			className="h-[50px] w-[50px] md:h-[40px] md:w[40px] "
			height="60"
			width="60"
			onClick={() => Navigate("/")}
		></img>
	);
	const end = (
		<div className="flex align-items-center gap-2">
			<a
				href="https://www.facebook.com/sanissaltillo"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="pi pi-facebook mr-2"></i>
			</a>

			<a
				href="https://www.instagram.com/sanissaltillo/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="pi pi-instagram mr-2"></i>
			</a>
		</div>
	);

	// const handleDownloadEstatutos = () => {
	//   const link = document.createElement("a");
	//   link.href = `${window.location.origin}../../public/ESTATUTOS.pdf`; // Ruta al archivo PDF
	//   link.download = "ESTATUTOS.pdf"; // Nombre del archivo a descargar
	//   document.body.appendChild(link);
	//   link.click();
	//   document.body.removeChild(link);
	// };

	const handleDownloadEstatutos = () => {
		// using JavaScript method to get PDF file
		fetch("../../ESTATUTOS.pdf").then((response) => {
			response.blob().then((blob) => {
				// Creating new object of PDF file
				const fileURL = window.URL.createObjectURL(blob);

				// Setting various property values
				let alink = document.createElement("a");
				alink.href = fileURL;
				alink.download = "ESTATUTOS.pdf";
				alink.click();
			});
		});
	};

	const handleDownloadReglamento = () => {
		fetch("../../REGLAMENTOINTERNO.pdf").then((response) => {
			response.blob().then((blob) => {
				// Creating new object of PDF file
				const fileURL = window.URL.createObjectURL(blob);

				// Setting various property values
				let alink = document.createElement("a");
				alink.href = fileURL;
				alink.download = "REGLAMENTOINTERNO.pdf";
				alink.click();
			});
		});
	};

	const items: MenuItem[] = [
		{
			label: "INICIO",
			icon: "pi pi-home",
			command: () => Navigate("/"),
		},
		{
			label: "BOLETÍN",
			icon: "pi pi-megaphone",
			command: () => Navigate("Ads"),
		},
		{
			label: "RESERVACIONES",
			icon: "pi pi-calendar",

			items: [
				// {
				//   label: "Inicio",
				//   icon: "pi pi-plus",
				//   className: "bg-slate-100 md:bg-white ",
				//   url: "https://clubdeportivosanisidro.martennis.com/web/login?redirect=https%3A%2F%2Fclubdeportivosanisidro.martennis.com%2Fwebsite%2Fcalendar",
				// },
				{
					label: "Palapas y Salones",
					icon: (
						<IconSvg
							src={SvgIcon1}
							alt="Palapas"
							ancho="1.5rem"
							largo="1.5rem"
						/>
					),
					className: "bg-slate-100 md:bg-white",
					// command: () => Navigate(`/Login/${false}` )
					command: () => Navigate("Tournaments"),
				},
				// {
				// 	label: "Salones",
				// 	icon: (
				// 		<IconSvg
				// 			src={SvgIcon2}
				// 			alt="Salones"
				// 			ancho="1.5rem"
				// 			largo="1.5rem"
				// 		/>
				// 	),
				// 	className: "bg-slate-100 md:bg-white",
				// 	command: () => Navigate("Tournaments"),
				// },

				{
					label: "Canchas",
					icon: (
						<IconSvg
							src={SvgIcon3}
							alt="Canchas"
							ancho="1.5rem"
							largo="1.5rem"
						/>
					),
					className: "bg-slate-100 md:bg-white",
					url: "https://clubdeportivosanisidro.martennis.com/web/login?redirect=https%3A%2F%2Fclubdeportivosanisidro.martennis.com%2Fwebsite%2Fcalendar",
				},
				{
					label: "Bar",
					icon: (
						<IconSvg
							src={SvgBar}
							alt="Bar"
							ancho="1.5rem"
							largo="1.5rem"
						/>
					),
					className: "bg-slate-100 md:bg-white",
					command: () => Navigate("Tournaments"),
				},
				{
					label: "Caballeros",
					icon: "pi pi-mars",
					className: "bg-slate-100 md:bg-white",
					items: [
						{
							label: "Cortes de Cabello",
							icon: "pi pi-plus",
							className: "bg-slate-100  md:bg-white",
							command: () => Navigate("Gentlemen"),
						},
					],
				},
				{
					label: "Damas",
					icon: "pi pi-venus",
					className: "bg-slate-100 md:bg-white",
					items: [
						{
							label: "Masajes",
							icon: "pi pi-plus",
							className: "bg-slate-100  md:bg-white",
							command: () => Navigate("Ladies"),
						},
						{
							label: "Salón",
							icon: "pi pi-plus",
							className: "bg-slate-100  md:bg-white",
							command: () => Navigate("Ladies"),
						},
					],
				},
				{
					label: "Adeudos",
					icon: "pi pi-wallet",
					// (
					// 	<IconSvg
					// 		src={SvgIcon2}
					// 		alt="Salones"
					// 		ancho="1.5rem"
					// 		largo="1.5rem"
					// 	/>
					// ),
					className: "bg-slate-100 md:bg-white",
					command: () => Navigate("Tournaments"),
					// command: () => Navigate(`/Login/${true}` )
					
				},
			],
		},
		{
			label: "MENÚS",
			icon: "pi pi-book",
			// icon: menu,
			url: "https://menusanis.com/",
		},
		{
			label: "PAGOS",
			icon: "pi pi-credit-card",
			url: "https://fcaplicaciones.mx/sanis",
			// command: () => Navigate("Payments"),
		},
		{
			label: "TORNEOS",
			icon: "pi pi-trophy",
			command: () => Navigate("Tournaments"),
		},

		{
			label: "CONTACTO",
			icon: "pi pi-phone",
			command: () => Navigate("Contact"),
		},
		{
			label: "PATROCINADORES",
			icon: "pi pi-crown",
			command: () => Navigate("About_Us"),
		},
		{
			label: "Más",
			icon: "pi pi-plus",
			items: [
				{
					label: "Bolsa de Trabajo",
					icon: "pi pi-plus",
					className: "bg-slate-100 ",
					url: "https://www.facebook.com/profile.php?id=61557952883021&locale=es_LA",
				},
				{
					label: "Estatutos",
					icon: "pi pi-plus",
					className: "bg-slate-100 ",
					command: handleDownloadEstatutos,
				},
				{
					label: "Reglamento",
					icon: "pi pi-plus",
					className: "bg-slate-100 ",
					command: handleDownloadReglamento,
				},
				{
					label:"Trabajadores",
					icon: "pi pi-user",
					className:"bg-slate-100",
					command:() => Navigate("LoginComunicacion")
				},
				// {
				// 	label:"Lista de Invitados",
				// 	icon: "pi pi-user",
				// 	className:"bg-slate-100",
				// 	command:() => Navigate("Invitados")
				// }
			],
		},
	];

	return (
		<div
			className="fixed w-full top-0 left-0 z-50 bg-[#000717] "
			style={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			<div className="absolute inset-0 bg-cover bg-center w-full"></div>
			<div className="relative z-10 w-full ">
				<Menubar
					// className=" w-full"
					model={items}
					start={start}
					end={end}
					style={{
						display: "flex",
						justifyContent: "center",
						// backgroundImage: `url(${backgroundImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundColor: "rgba(255, 255, 255, 0.8)",
						backdropFilter: "blur(10px)",
					}}
					menuIcon={
						<i className="pi pi-align-justify custom-menu-icon" />
					}
				/>
			</div>
		</div>
	);
};

export default Navbar;
