import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [ShowPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Usando la variable de entorno REACT_APP_API_URL
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });

      // Si la respuesta es exitosa, guarda el token y redirige al home
      const { token, user } = response.data;
      localStorage.setItem("token", token); // Guardar token en localStorage
      navigate("/home"); // Redirigir a la página de inicio (ajusta según sea necesario)
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <main className="h-screen w-full flex flex-row">
      <aside
        className="debug w-6/12 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://img.freepik.com/free-vector/hand-drawn-monocolor-design-cd-cover_23-2148889668.jpg?t=st=1731706480~exp=1731710080~hmac=d32cceed35a56d6904171c639c04dd069b4fb69db7a8dea82777b82b152bfa4a&w=826)',
        }}
      ></aside>
      <aside className="debug w-6/12 flex flex-col justify-center items-center bg-[#e3a4f3]">
        <div className=" flex flex-col w-2/4 h-3/5 justify-center items-center gap-11 bg-slate-50 rounded-lg shadow-2xl">
          <a className="text-2xl font-bold text-[#d13e84]">Logeo</a>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <div className=" justify-between flex flex-col  h-40">
            <div>
              <label className="text-gray-400 ">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 text-sm rounded-lg focus:outline-[#d13e84] focus:ring-yellow-300 block w-full p-2.5"
                placeholder="Tu email"
                required
              />
            </div>

            <div>
              <label className="text-gray-400 ">Contraseña</label>
              <div className="flex flex-row items-center">
                <input
                  type={ShowPwd ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-200 focus:outline-[#d13e84] rounded-lg block w-full p-2.5"
                  placeholder="•••••••••"
                  required
                />
                <div
                  className="pl-2 text-gray-400 hover:text-[#d13e84]"
                  onClick={() => setShowPwd(!ShowPwd)}
                >
                  {ShowPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="hover:text-[#d13e84] hover:scale-105 hover:cursor-pointer text-gray-500">
              ¿Olvidaste tu contraseña?
            </span>
            <span className="hover:text-[#d13e84] hover:scale-105 hover:cursor-pointer text-gray-500">
              <Link to="/register">Registrarse</Link>
            </span>
          </div>

          <div
            onClick={handleLogin}
            className="bg-[#d13e84] pl-4 pr-4 pt-2 pb-2 rounded-lg hover:scale-105 hover:cursor-pointer hover:shadow-none text-white font-bold text-lg shadow-md"
          >
            Ingresar
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Login;

