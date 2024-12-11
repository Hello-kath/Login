import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../axiosInstance";

function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await API.get(`/verify-email/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(
          error.response?.data?.error || "Error al verificar el correo"
        );
      }
    };
    verifyEmail(); 
  }, [token]);

  return (
    <>
      <main className="w-screen h-screen bg-[#f0eaee] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-1/3 h-40 text-center text-3xl">
          <div className="mb-4">
            {message}  {/* Aquí aparece el mensaje */}
          </div>
          <img  
            src="https://i.pinimg.com/736x/77/a7/3e/77a73ec9b018c740ce22aba9fee0e6b9.jpg" /* direcion d eimagen  */
            alt="Descripción de la imagen"
            className="w-full h-auto max-w-xs rounded-lg"  
          />
        </div>
      </main>
    </>
  );
  
}

export default VerifyEmail;
