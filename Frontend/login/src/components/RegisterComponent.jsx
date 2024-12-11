import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"; // Cambié useHistory por useNavigate
import axios from "axios";

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Cambié useHistory por useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3005/registrar`, // URL del backend
        { username, email, password }
      );

      // Si la respuesta es exitosa, redirigimos al login
      if (response.status === 201) {
        navigate("/login"); // Redirigir al login
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Error al registrar el usuario.");
      } else {
        setError("Hubo un error al conectarse con el servidor.");
      }
    }
  };

  return (
    <main className="h-screen w-full flex flex-row">
      <aside
        className="debug w-6/12 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/hand-drawn-blogger-illustrated_23-2149083970.jpg?t=st=1731706338~exp=1731709938~hmac=b9c363b6b175a47c79d5fa07df5969a687eec3c9aee3b24757fd6ddb35e735f6&w=996)",
        }}
      />
      <aside className="debug w-6/12 flex flex-col justify-center items-center bg-[#f3d3e8]">
        <div className="flex flex-col w-2/4 h-3/5 justify-center items-center gap-6 bg-slate-50 rounded-lg shadow-2xl p-6">
          <a className="text-2xl font-bold text-[#d24d84] mb-6">Registro</a>
          <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                className="bg-gray-200 text-sm rounded-lg focus:outline-[#d24d84] focus:ring-yellow-300 block w-full p-2.5"
                placeholder="Aquí su nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400">Correo electrónico</label>
              <input
                type="email"
                id="email"
                className="bg-gray-200 text-sm rounded-lg focus:outline-[#d24d84] focus:ring-yellow-300 block w-full p-2.5"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400">Contraseña</label>
              <div className="flex flex-row items-center">
                <input
                  type={showPwd ? "text" : "password"}
                  id="password"
                  className="bg-gray-200 focus:outline-[#d24d84] rounded-lg block w-full p-2.5"
                  placeholder="•••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="pl-2 text-gray-400 hover:text-[#d24d84] cursor-pointer"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className="flex flex-col items-center gap-4">
              <span className="text-gray-500">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="text-[#d24d84] hover:text-[#d24d84] hover:underline"
                >
                  Inicia sesión
                </Link>
              </span>
            </div>

            <div
              type="submit"
              className="bg-[#d24d84] mx-auto w-56 px-5 py-3 rounded-lg hover:scale-105 hover:cursor-pointer hover:shadow-none text-white text-center font-bold text-base shadow-md mt-4"
              onClick={handleSubmit}
            >
              Registrarse
            </div>
          </form>
        </div>
      </aside>
    </main>
  );
};

export default Register;
