import "../css/Menubar.css";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

const AdminNavbar = () => {
  const Navigate = useNavigate();

//   const start = (
//     <img
//       alt="logo"
//       src="/logo.png" // Ajusta la ruta del logo
//       className="h-[50px] w-[50px] md:h-[40px] md:w-[40px]"
//       onClick={() => Navigate("/")}
//     />
//   );

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

  const items: MenuItem[] = [
    // {
    //   label: "INICIO",
    //   icon: "pi pi-home",
    //   command: () => Navigate("/"),
    // },
    {
      label: "PANEL DE RESERVACIONES",
      icon: "pi pi-calendar",
      command: () => Navigate("/PanelResevaciones"),
    },
    {
      label: "LISTA DE INVITADOS",
      icon: "pi pi-users",
      command: () => Navigate("/Invitados"),
    },
    {
      label: "ADMINISTRACIÓN DE USUARIOS",
      icon: "pi pi-user-edit",
      command: () => Navigate("/AccountAdmin"),
    },
    {
      label: "SALIR",
      icon: "pi pi-sign-out",
      command: () => {
        localStorage.removeItem("authToken");
        Navigate("/");
      },
    },
  ];

  return (
    <div className="fixed z-50 w-full bg-cover bg-center bg-[#000717]">
      <Menubar
        model={items}
        // start={start}
        end={end}
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        }}
        className="text-[#535bf2]"
        menuIcon={<i className="pi pi-align-justify custom-menu-icon" />}
      />
    </div>
  );
};

export default AdminNavbar;
