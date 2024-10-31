// import { Accordion, AccordionTab } from "primereact/accordion";
// import { Card } from "primereact/card";
import * as Constants from "../../constants";

import styled from "styled-components";

const BackgroundDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  background-image: url(${Constants.building});

  @media (max-width: 768px) {
    background-image: url(${Constants.building});
  }

  @media (max-width: 480px) {
    background-image: url(${Constants.blmobile});
  }
`;

const About_Us = () => {
  // const scrollableTabs = [
  //   // { label: "", icon: start },
  //   {
  //     title: "EGP EVALUACION Y GESTION DE PROYECTOS SA DE CV",
  //     content: (
  //       <p>
  //         20% DE DESCUENTO EN AVALUOS PARTICULARES <br /> CONTACTO: 8448691922 /
  //         egpsaltillo@hotmail.com /vrps.arq@gmail.com <br />
  //         <br /> UBICACION: JESUS VALDEZ SANCHEZ 1090 INT 18, COLONIA TOPOCHICO"
  //       </p>
  //     ),
  //   },

  //   {
  //     title: "DEPIER S DE RL DE CV ",
  //     content: (
  //       <p>
  //         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
  //         reiciendis cumque tenetur blanditiis repellendus! Qui soluta provident
  //         quis delectus libero assumenda tenetur quidem! Tempore hic repellendus
  //         repudiandae vero enim omnis.
  //       </p>
  //     ),
  //   },
  //   {
  //     title: "ELECTRICIDAD E ILUMINACION JM",
  //     content: (
  //       <p>
  //         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ipsa
  //         praesentium molestias deleniti eos accusamus velit optio, enim neque
  //         eius, sint labore cum ab voluptatibus expedita excepturi, autem
  //         dolores? At!
  //       </p>
  //     ),
  //   },
  //   {
  //     title: "SAMIRAM INSTALACION & ENGINEERING sa de cv",
  //     content: (
  //       <p>
  //         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
  //         placeat nesciunt iure nulla nostrum numquam optio ipsa obcaecati
  //         tenetur beatae! Nulla consequuntur cupiditate, a rem labore aspernatur
  //         in. Sit, blanditiis?
  //       </p>
  //     ),
  //   },
  // ];

  return (

    <BackgroundDiv></BackgroundDiv>
//      <div className="flex flex-col pt-20 xl:px-80">
//       <div className='bg-white bg-clip-border'>
//       <h2 >CONOCE NUESTROS NEGOCIOS PARTICIPANTES</h2>
//       </div> 

//        <div className="card  justify-center align-middle bg-gray-900 bg-opacity-75 shadow-lg rounded-t-md p-4">
//         <Card
//           title="CONOCE NUESTROS NEGOCIOS PARTICIPANTES"
//           className="lg:h-10  bg-[#000717] text-white "
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             fontSize: "24px",
//           }}
//         ></Card>
//       </div>
//       <Accordion activeIndex={0} className="bg-gray-900 bg-opacity-75 shadow-lg rounded-b-md p-4">
//         <AccordionTab header="Ropa(Uniformes) y Calzado" >
//           <Accordion activeIndex={0}>
//             <AccordionTab header="DMARCOS ZAPATERIAS">
//               <p className="m-0">
//                 Toda la tienda con un 15% de descuento pagando en efectivo o
//                 tarjeta <br></br> <br />
//                 Contacto: 8444017926 / contacto@dmarcos.com <br></br><br />
//                 Ubicación: matriz. Blvd José Musa de León 1419 col Los Pinos{" "}
//                 <br></br><br />
//                 Sucursal: Victoria 240 esquina con Acuña Zona Centro <br></br><br />
//                 Sucursal: Allende 217 esquina con Aldama Zona Centro
//               </p>
//             </AccordionTab>
//             <AccordionTab header="LA BOTA FINA">
//               <p className="m-0">
//                 Boleado de calzado por cada 5 pares para bolear, regalamos el 6º{" "}
//                 <br />
//                 Contacto: 8441041130 <br />
//                 Ubicación: Blvd Ortiz de Montellano antes de llegar a Rufino
//                 Tamayo (a 2 cuadras del club)
//               </p>
//             </AccordionTab>
//             <AccordionTab header="RENHER UNIFORMES">
//               <p className="m-0">
//                 IVA con logo incluido <br></br>
//                 Contacto: 8442130660 / ventas2@renher.com.mx <br></br>
//                 Ubicación: Huesca 386 colonia Portal de Aragón
//               </p>
//             </AccordionTab>
//           </Accordion>
//         </AccordionTab>
//         <AccordionTab header="Servicios de Ingenieria,Electricidad y Productos Industriales"> 
        
//            <Accordion activeIndex={0}>
//             <AccordionTab header="EGP EVALUACION Y GESTION DE PROYECTOS SA DE CV">
//               <p className="m-0">
//                 Toda la tienda con un 15% de descuento pagando en efectivo o
//                 tarjeta <br></br>
//                 Contacto: 8444017926 / contacto@dmarcos.com <br></br>
//                 Ubicación: matriz. Blvd José Musa de León 1419 col Los Pinos{" "}
//                 <br></br>
//                 Sucursal: Victoria 240 esquina con Acuña Zona Centro <br></br>
//                 Sucursal: Allende 217 esquina con Aldama Zona Centro
//               </p>
//             </AccordionTab>
//             <AccordionTab header="DEPIER S DE RL DE CV">
//               <p className="m-0">
//                 Descuento en kit de paneles solares dependiendo la cantidad{" "}
//                 <br></br>
//                 Contacto: 8441002595 y 8448690056 / cmedrano@aggregatum.com
//                 mmmartinez@aggregatum.com <br></br>
//                 Ubicación: Dr. Miguel Farías 185 L 3 col. Doctores, Saltillo,
//                 Coahuila
//               </p>
//             </AccordionTab>
//             <AccordionTab header="ELECTRICIDAD E ILUMINACION JM">
//               <p className="m-0">
//                 5% de descuento sobre precio de lista <br></br>
//                 Contacto: 844 122 0220 / jesusjimenez@electricidadjm.com.mx{" "}
//                 <br></br>
//                 Ubicación: Blvd Fundadores 3674-3 col. Valle de las Flores{" "}
//                 <br></br>
//                 Jesús Ignacio Jiménez López
//               </p>
//             </AccordionTab>
//             <AccordionTab header="SAMIRAM INSTALACION & ENGINEERING sa de cv">
//               <p className="m-0">
//                 Se dará en la evaluación del servicio, previa cotización.{" "}
//                 <br></br>
//                 Contacto: 8443313638 / carlos.erales@outlook.com <br></br>
//                 Ubicación: Estrella Polar #112 fracc. La Estrella
//               </p>
//             </AccordionTab>
//             <AccordionTab header="SEA SOLUCIONES EN AUTOMATIZACION S.A. DE C.V.">
//               <p className="m-0">
//                 5% de descuento en cotización <br></br>
//                 Contacto: 8441229300 / calefaccion-radiante@seasal.com.mx{" "}
//                 <br></br>
//                 Ubicación: Calle Tercera #435 fracc. La Aurora, Saltillo,
//                 Coahuila
//               </p>
//             </AccordionTab>
//           </Accordion>
//         </AccordionTab>
//         <AccordionTab header="SERVICIOS DE INGENIERIA, ELECTRICIDAD Y PRODUCTOS INDUSTRIALES">
//           <Accordion activeIndex={0}>
//             <AccordionTab header="TUBOS VALCON SA DE CV">
//               <p className="m-0">
//                 Toda la tienda con un 15% de descuento pagando en efectivo o
//                 tarjeta <br></br>
//                 Contacto: 8444017926 / contacto@dmarcos.com <br></br>
//                 Ubicación: matriz. Blvd José Musa de León 1419 col Los Pinos{" "}
//                 <br></br>
//                 Sucursal: Victoria 240 esquina con Acuña Zona Centro <br></br>
//                 Sucursal: Allende 217 esquina con Aldama Zona Centro
//               </p>
//             </AccordionTab>
//             <AccordionTab header="FERGU SERVICIOS AGROAMBIENTALES">
//               <p className="m-0">
//                 Boleado de calzado por cada 5 pares para bolear, regalamos el 6º{" "}
//                 <br />
//                 Contacto: 8441041130 <br />
//                 Ubicación: Blvd Ortiz de Montellano antes de llegar a Rufino
//                 Tamayo (a 2 cuadras del club)
//               </p>
//             </AccordionTab>
//             <AccordionTab header="STIHL SALTILLO">
//               <p className="m-0">
//                 IVA con logo incluido <br></br>
//                 Contacto: 8442130660 / ventas2@renher.com.mx <br></br>
//                 Ubicación: Huesca 386 colonia Portal de Aragón
//               </p>
//             </AccordionTab>
//             <AccordionTab header="SOFTPEI INGENIERIA EN SISTEMAS">
//               <p className="m-0">
//                 20% de descuento en las licencias de: DocPEI, QualiTypei,
//                 SellPEI y Sistema de Gestión Empresarial MC <br></br>
//                 Contacto: 8443426107 / ventas@softpei.com <br></br>
//                 Ubicación: Calle F 151, Balcones de Morelos, C.P. 25010
//               </p>
//             </AccordionTab>
//           </Accordion>
//         </AccordionTab>
//         <AccordionTab header="SEGUROS, BIENES RAICES Y FINANZAS">
//           <Accordion activeIndex={0}>
//             <AccordionTab header="MARK SEGUROS">
//               <p className="m-0">
//                 En seguro de gastos médicos hasta un 10% de descuento y en
//                 seguro de autos hasta el 50% de descuento. <br></br>
//                 Contáctanos: 844 427 17 49 / direccion@marksaltillo.com{" "}
//                 <br></br>
//                 Dirección: Calle El Abra 253, Col. Real de Peña, C.P. 25256,
//                 Saltillo, Coahuila.
//               </p>
//             </AccordionTab>
//             <AccordionTab header="ICARMA">
//               <p className="m-0">
//                 10% EN SEGUROS DE AUTOMOVILES, GASTOS MEDICOS Y VIDA CONTACTO:
//                 8441314649 / icarma_consultores@hotmail.com UBICACION: BLVD.
//                 RUFINO TAMAYO 216-A COL. SAN ISIDRO
//               </p>
//             </AccordionTab>
//             <AccordionTab header="REMAX REGIO">
//               <p className="m-0">
//                 10% de descuento en la comisión de venta inmobiliaria en el área
//                 metropolitana de Saltillo y Monterrey. <br></br>
//                 Contacto: 8444270888 / jrdiazmoreno@yahoo.com <br></br>
//                 Ubicación: Camino al Mirador 5401, Altos Jardines del Paseo,
//                 Monterrey, Nuevo León.
//               </p>
//             </AccordionTab>
//             <AccordionTab header="MS CONSULTING GROUP">
//               <p className="m-0">
//                 Contabilidad de personas físicas con descuento del 10%.{" "}
//                 <br></br>
//                 Contacto: 8441834244 / cpivanmedellinhotmail.com <br></br>
//                 Ubicación: Santa Susana 139 int 2, Fracc. El Rosario, C.P.
//                 25297.
//               </p>
//             </AccordionTab>
//           </Accordion>
//         </AccordionTab>
//         <AccordionTab header="RESTAURANTES Y PASTELERIA">
//           <Accordion activeIndex={0}>
//             <AccordionTab header="CHEF MOM PASTELERIA">
//               <p className="m-0">
//                 10% de descuento en la compra de pastel grande de tres leches,
//                 mazapán, borracho de piña. <br></br>
//                 Contacto: 844 444 25 67 y 844 277 3998 /
//                 georgettemasso@gmail.com <br></br>
//                 Ubicación: De la Mancha 351, Fracc. Portal del Quijote.
//               </p>
//             </AccordionTab>
//             <AccordionTab header="RESTAURANTE LAS ESCOLLERAS">
//               <p className="m-0">
//                 10% de descuento en pedidos para llevar, mostrando número de
//                 acción del club y token de lunes a viernes. <br></br>
//                 Contacto: 8444550639 / josedehoyosS@lasescolleras.com.mx{" "}
//                 <br></br>
//                 Ubicación: Periférico Luis Echeverría 319-1, Colonia
//                 Latinoamérica.
//               </p>
//             </AccordionTab>
//             <AccordionTab header="TORTAS BERNAL">
//               <p className="m-0">
//                 Lunes y martes: torta o hamburguesa + refresco de 500 ml por
//                 $90. <br></br>
//                 Martes y miércoles: 2 tortas o 2 hamburguesas + 2 papas + 2
//                 refrescos de 500 ml por $200. <br></br>
//                 Miércoles: ensalada 2 x 1 1/2 por $157. <br></br>
//                 Contacto: 8444883839 / tortas.bernal.ramos@gmail.com <br></br>
//                 Ubicación: Matamoros 112-3, Plaza Los Ángeles, Ramos Arizpe.
//               </p>
//             </AccordionTab>
//           </Accordion>
//         </AccordionTab>
//         <AccordionTab header="PUBLICIDAD, MERCADOTECNIA Y PRODUCTOS PROMOCIONALES	">
//           <Accordion activeIndex={0}>
//             <AccordionTab header="12.10 MARKETING">
//               <p className="m-0">
//                 Página web para venta en línea incluye: dominio, hosting, diseño
//                 profesional de la página, tienda en línea, carrito de compras
//                 para 15 productos iniciales (los productos extras se cobran por
//                 separado) $12,500 más IVA. Aplican restricciones. Pregunta por
//                 nuestros paquetes de redes sociales. Promociones especiales para
//                 socios SANIS. <br></br>
//                 <br />
//                 Contacto: 844 869 0722 / contacto@docediez.com <br></br> <br />
//                 Ubicación: Perugia 1170, Col. Cumbres.
//               </p>
//             </AccordionTab>
//             <AccordionTab header="ENLACE PUBLICIDAD">
//               <p className="m-0">
//                 15% de descuento en los dos catálogos virtuales. <br></br>{" "}
//                 <br />
//                 Contacto: 8444193032 / enlacepublicidad@prodigy.net.mx <br></br>{" "}
//                 <br />
//                 Ubicación: Calle Viesca 686, Zona Centro.
//               </p>
//             </AccordionTab>
//             <AccordionTab header="CARUMA">
//               <p className="m-0">
//                 Planes mensuales: creación de contenido (diseño gráfico, video y
//                 foto) 10% de descuento. Planeación y administración de redes
//                 sociales 10%. Planeación y administración de Google Ads 10%.{" "}
//                 <br></br>
//                 <br />
//                 Contacto: 8448806599 / carlosruymartinez@gmail.com <br></br>
//                 <br />
//                 Ubicación: Periférico Luis Echeverría 2252, Col. Ciudad Satélite
//                 Norte.
//               </p>
//             </AccordionTab>
//             <AccordionTab header="SEÑALES NACIONALES">
//               <p className="m-0">
//                 Lonas, tarjetas de presentación y tabloides. Precio especial en
//                 productos marcados. <br></br>
//                 <br />
//                 Contacto: 8442853585 / señalesnacionales@outlook.com <br></br>
//                 <br />
//                 Ubicación: Xiconténcatl 488 Sur.
//               </p>
//             </AccordionTab>
//           </Accordion>
//         </AccordionTab>
//         <AccordionTab header="EDUCACION">
//         <Accordion activeIndex={0}>
//             <AccordionTab header="CENTRO KUMON">
//               <p className="m-0">
//               50% DE DESCUENTO EN INSCRIPCIÓN PARA LAS MATERIAS DE MATEMÁTICAS, INGLÉS Y LECTURA. <br /> <br />
//               CONTACTO: 8441811564 / plazacristal@ikumon.com.mx <br /> <br />
// UBICACIÓN: BLVD. EULALIO GUTIÉRREZ 323 LOC. 19

//               </p>
//             </AccordionTab>
          
//           </Accordion>
//         </AccordionTab>
//       </Accordion> 
//      </div>
  );
};

export default About_Us;
