import React from "react";

const Home = () => {
  return (
    <main className="h-screen w-full flex justify-center items-center flex-col bg-cover bg-center">
  {/* Contenedor para el texto */}
  <div className="flex flex-col justify-center items-center bg-white bg-opacity-75 p-6 rounded-lg shadow-lg w-96 mb-6">
    <h1 className="text-3xl font-bold text-[#0b0803] mb-4">¡Bienvenido!</h1>
  </div>

  {/* Contenedor para el GIF */}
  <div className="flex justify-center items-center w-144">
    <img 
      src="https://i.pinimg.com/originals/e5/e8/30/e5e830f89f89f0259e1d705e14a5de93.gif"
      alt="Fondo animado"
      className="w-80 h-80 object-contain rounded-lg shadow-md"
    />
  </div>
</main>

  );
};

export default Home;
