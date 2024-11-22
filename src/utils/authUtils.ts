import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../interfaces/interfaces";

export const getUserRole = (): string | null => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
  
    try {
      const decoded: JwtPayload = jwtDecode(token); // Usamos jwt-decode para interpretar el token
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Token has expired");
        localStorage.removeItem("token"); // Opcional: Limpia el token si está expirado
        return null;
      }
  
      return decoded.role || null; // Retorna el rol si existe
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };