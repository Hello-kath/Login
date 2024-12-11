import React, { useEffect, useState } from "react";
import instance from "../axiosInstance";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Iconos de Font Awesome
import LogoutButton from "./Salir"

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal
  const [selectedUser, setSelectedUser] = useState(null); // Almacena el usuario seleccionado para editar
  const [updatedUsername, setUpdatedUsername] = useState(""); // Almacena el nuevo nombre de usuario
  const [updatedEmail, setUpdatedEmail] = useState(""); // Almacena el nuevo correo

  useEffect(() => {
    // Obtener lista de usuarios
    instance
      .get("/usuarios")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        setError(
          error.response ? error.response.data.error : "Error de conexión"
        );
      });
  }, []);

  const handleDelete = (id) => {
    instance
      .delete(`/eliminar/${id}`)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== id));
        alert(response.data.message);
      })
      .catch((error) => {
        alert(
          error.response
            ? error.response.data.error
            : "Error al eliminar usuario"
        );
      });
  };

  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    setSelectedUser(user);
    setUpdatedUsername(user.username);
    setUpdatedEmail(user.email);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    instance
      .put(`/editar/${selectedUser.id}`, {
        username: updatedUsername,
        email: updatedEmail,
      })
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id
              ? { ...user, username: updatedUsername, email: updatedEmail }
              : user
          )
        );
        setIsModalOpen(false);
        alert(response.data.message);
      })
      .catch((error) => {
        alert(
          error.response
            ? error.response.data.error
            : "Error al actualizar el usuario"
        );
      });
  };

  return (
    <main className="h-screen w-full flex justify-center items-center flex-col bg-cover bg-center px-4">
      <LogoutButton className={"absolute top-0 right-0 m-4 flex gap-4 text-purple-500"}/>
      {/* Contenedor para el texto de bienvenida */}
      <div className="flex flex-col justify-center items-center bg-[#ebe0f1] bg-opacity-75 px-4 mt-2 rounded-lg shadow-ms w-full max-w-4xl h-32 mb-6">
        <h1 className="text-4xl font-bold text-[#d13e84] mb-4">¡Bienvenido!</h1>
        <p className="text-xl text-[#444] text-center">
          Aquí puedes gestionar a los usuarios registrados
        </p>
      </div>

      {/* Contenedor para el GIF y la lista de usuarios centrado */}
      <div className="flex justify-center items-start w-full mx-6 space-x-6">
        {/* Contenedor para el GIF */}
        {/* Contenedor para el Video */}
        <div className="w-1/3 shadow-ms rounded-lg overflow-hidden">
          <video
            autoPlay   // Reproduce el video automáticamente
            muted      // Mute el sonido (si es necesario)
            loop       // Hace que el video se repita infinitamente
            src="/gatito.mp4" // Asegúrate de que este archivo esté en la carpeta pública de tu aplicación
            alt="Video de gatito"
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          >
            <p>Tu navegador no soporta la reproducción de videos.</p> {/* Mensaje alternativo si el video no puede ser cargado */}
          </video>
        </div>

        {/* Contenedor para la lista de usuarios */}
        <div className="w-2/3  text-white py-2 px-4 rounded-md h-16 shadow-lg  border-2 border-pink-500">
          <h2 className="text-3xl font-bold text-[#d13e84] mb-6">
            Usuarios Registrados
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <ul className="space-y-6">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center p-8 bg-white rounded-md shadow-lg hover:shadow-2xl transition-all"
              >
                <div>
                  <span className="text-xl font-semibold text-black">
                    {user.username}
                  </span>{" "}
                  -<span className="text-sm text-black">{user.email}</span>
                </div>
                <div className="flex space-x-6">
                  {/* Botón de editar */}
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-pink-400 hover:text-yellow-500"
                  >
                    <FaEdit size={20} />
                  </button>
                  {/* Botón de eliminar */}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-purple-500 hover:text-red-600"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-[#d13e84] mb-4">
              Editar Usuario
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={updatedUsername}
                onChange={(e) => setUpdatedUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-pink-500 rounded-md text-white hover:bg-pink-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
