// src/App.js
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  return (
    <main className="h-screen w-full flex flex-row">
      <aside className="debug w-6/12 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/hand-drawn-blogger-illustrated_23-2149083970.jpg?t=st=1731706338~exp=1731709938~hmac=b9c363b6b175a47c79d5fa07df5969a687eec3c9aee3b24757fd6ddb35e735f6&w=996)' }}>
      </aside>
      <aside className="debug w-6/12 flex flex-col justify-center items-center bg-[#f3d3e8]">
        <div className="flex flex-col w-2/4 h-3/5 justify-center items-center gap-11 bg-slate-50 rounded-lg shadow-2xl">
          <a className="text-2xl font-bold text-[#d24d84]">Registro</a>
          <div className="justify-between flex flex-col h-60">
            <div>
              <label className="text-gray-400">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                className="bg-gray-200 text-sm rounded-lg focus:outline-[#d24d84] focus:ring-yellow-300 block w-full p-2.5"
                placeholder="Aquí su nombre de usuario"
                required
              />
            </div>

            <div>
              <label className="text-gray-400">Correo electrónico</label>
              <input
                type="email"
                id="email"
                className="bg-gray-200 text-sm rounded-lg focus:outline-[#d24d84] focus:ring-yellow-300 block w-full p-2.5"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div>
              <label className="text-gray-400">Contraseña</label>
              <div className="flex flex-row items-center">
                <input
                  type={showPwd ? "text" : "password"}
                  id="password"
                  className="bg-gray-200 focus:outline-[#d24d84] rounded-lg block w-full p-2.5"
                  placeholder="•••••••••"
                  required
                />
                <div
                  className="pl-2 text-gray-400 hover:text-[#d24d84]"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>
            </div>

            <div>
              <label className="text-gray-400">Confirmar contraseña</label>
              <div className="flex flex-row items-center">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  id="confirm_password"
                  className="bg-gray-200 focus:outline-[#d24d84] rounded-lg block w-full p-2.5"
                  placeholder="•••••••••"
                  required
                />
                <div
                  className="pl-2 text-gray-400 hover:text-[#d24d84]"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                >
                  {showConfirmPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="hover:text-[#d24d84] hover:scale-105 hover:cursor-pointer text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-[#d24d84]">Inicia sesión</Link>
            </span>
          </div>

          <div className="bg-[#d24d84] pl-4 pr-4 pt-2 pb-2 rounded-lg hover:scale-105 hover:cursor-pointer hover:shadow-none text-white font-bold text-lg shadow-md">
            Registrarse
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Register;
