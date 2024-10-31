import { Card } from "primereact/card";
import React, { useState } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import emailjs from "emailjs-com";
import { InputText } from "primereact/inputtext";

const Contact = () => {
	const [name, setName] = useState("");
	const [fromEmail, setFromEmail] = useState("");
	const [message, setMessage] = useState("");
	const [responseMessage, setResponseMessage] = useState("");
	// const form = useRef<HTMLFormElement>(null);

	// const sendEmail = (e: React.FormEvent) => {
	//   e.preventDefault();

	//   if (form.current) {
	//     emailjs
	//       .sendForm(
	//         "YOUR_SERVICE_ID",
	//         "YOUR_TEMPLATE_ID",
	//         form.current,
	//         "YOUR_PUBLIC_KEY"
	//       )
	//       .then(
	//         () => {
	//           console.log("SUCCESS!");
	//         },
	//         (error) => {
	//           console.log("FAILED...", error.text);
	//         }
	//       );
	//   }
	// };

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const serviceId = "service_b32g94c";
		const templadeId = "template_8zbz7ce";
		const publicKey = "hGam2tqH6zHvV1RHl";

		try {
			const templateParams = {
				from_name: name,
				email: fromEmail,
				message: message,
			};

			emailjs
				.send(serviceId, templadeId, templateParams, publicKey)
				.then((response) => {
					console.log("Email send succesfully!", response);
					setName("");
					setFromEmail("");
					setMessage("");
					setResponseMessage("¡Correo enviado con éxito!");
				});
		} catch (error) {
			console.error("Error al enviar el correo:", error);
			setResponseMessage(
				"¡Ups! Algo salió mal. Inténtalo de nuevo más tarde."
			);
		}
	};

	return (
		<div className="flex pt-16   justify-center">
			<div className="flex flex-col space-y-10">
				<div className="flex flex-col py-5 md:flex-row md:space-x-5 w-full space-y-5 md:space-y-0 sm:space-y-5">
					<div className="flex flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-10 md:align-middle md:justify-center md:items-center ">
						<div className="flex flex-col md:flex-grow bg-[#000717] bg-opacity-75 shadow-lg rounded-lg p-4  ">
							<Card title="Contactanos en nuestras redes Sociales">
								<div className="flex flex-col  pl-5 space-y-4">
									<div className="flex flex-row space-x-5">
										<a
											href="https://wa.me/8442866561"
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="flex flex-row text-center align-middle space-x-2 items-center">
												<i className="pi pi-whatsapp mr-2 text-2xl text-green-600"></i>
												<label htmlFor="">
													8442866561
												</label>
											</div>
										</a>
										<a
											href="tel:+528444157150"
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="flex flex-row text-center align-middle space-x-2 items-center">
												<i className="pi pi-phone mr-2 text-2xl text-black"></i>

												<label htmlFor="">
													8444157150
												</label>
											</div>
										</a>
									</div>
									<a
										href="https://www.facebook.com/sanissaltillo"
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="flex flex-row text-center align-middle space-x-2 items-center">
											<i className="pi pi-facebook mr-2 text-2xl text-blue-600"></i>
											<label htmlFor="">
												Club Deportivo San Isidro A.C.{" "}
											</label>
										</div>
									</a>

									<a
										href="https://www.instagram.com/sanissaltillo/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="flex flex-row text-center align-middle space-x-2 items-center">
											<i className="pi pi-instagram mr-2 text-2xl text-pink-500"></i>
											<label htmlFor="">
												@sanissaltillo
											</label>
										</div>
									</a>
									<a
										href="mailto:comunicacion@sanis.mx"
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="flex flex-row text-center align-middle space-x-2 items-center">
											<i className="pi pi-envelope mr-2 text-2xl text-pink-500"></i>
											<label htmlFor="">
												comunicacion@sanis.mx
											</label>
										</div>
									</a>
								</div>
							</Card>
						</div>
						<div className="flex flex-col md:flex-grow bg-[#000717] bg-opacity-75 shadow-lg rounded-lg p-4 ">
							<div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
								<h1
									className="text-2xl  mb-4"
									style={{ color: "black" }}
								>
									Envianos un correo y con tus dudas
								</h1>
								<form onSubmit={handleSubmit}>
									<div className="mb-4">
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-700"
										>
											Nombre
										</label>
										<InputText
											id="name"
											name="name"
											required
											className="border-solid border-2 border-sky-500 text-black"
											onChange={(e) =>
												setName(e.target.value)
											}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label
											htmlFor="email"
											style={{ color: "black" }}
										>
											Correo Electrónico
										</label>
										<InputText
											id="email"
											name="email"
											aria-describedby="username-help"
											className="border-solid border-2 border-sky-500 text-black"
											onChange={(e) =>
												setFromEmail(e.target.value)
											}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label
											htmlFor="message"
											style={{ color: "black" }}
										>
											Mensaje
										</label>
										<textarea
											id="message"
											name="message"
											required
											className="border-solid border-2 border-sky-500 text-black bg-white"
											rows={4}
											onChange={(e) =>
												setMessage(e.target.value)
											}
										></textarea>
									</div>
									<div className="pt-2">
										<Button
											type="submit"
											label="Enviar"
											style={{
												backgroundColor: "skyblue",
											}}
										/>
									</div>
								</form>
								{responseMessage && (
									<p className="mt-4 text-green-600">
										{responseMessage}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
				{/* <h2>Deja tu duda en nuestro buzón y nosotros responderemos en la brevedad posible</h2> */}

				<div className="flex flex-col md:flex-grow pb-4 flex-grow">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.138166091684!2d-100.97673809999995!3d25.46706149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868812cbc033ea7f%3A0x851edfeed7176588!2sClub%20Deportivo%20San%20Isidro!5e0!3m2!1ses-419!2smx!4v1717875566091!5m2!1ses-419!2smx"
						//}   width="600"
						height="320"
						style={{ border: 0 }}
						allowFullScreen={false}
						loading="lazy"
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default Contact;
