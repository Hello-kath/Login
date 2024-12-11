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
      <main className="w-screen h-screen bg-[#0D0D28] flex items-center justify-center">
        <div className="flex items-center justify-center w-1/3 h-24 text-center text-3xl bg-[#1d1f36] rounded-xl">
          {message}
        </div>
      </main>
    </>
  );
}

export default VerifyEmail;
