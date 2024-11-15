import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const [ShowPwd, setShowPwd] = useState(false);

  const [] = useState(false);

  return (
    <main className="h-screen w-full flex flex-row">
      <aside className="debug w-6/12 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/hand-drawn-monocolor-design-cd-cover_23-2148889668.jpg?t=st=1731706480~exp=1731710080~hmac=d32cceed35a56d6904171c639c04dd069b4fb69db7a8dea82777b82b152bfa4a&w=826)' }}>
      </aside>
      <aside className="debug w-6/12 flex flex-col justify-center items-center bg-[#e3a4f3]">
        <div className=" flex flex-col w-2/4 h-3/5 justify-center items-center gap-11 bg-slate-50 rounded-lg shadow-2xl">
          <a className="text-2xl font-bold text-[#d13e84]">Logeo</a>
          <div className=" justify-between flex flex-col  h-40">
            <div>
              <label className="text-gray-400 ">Nombre de usuario</label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-200
                         text-sm rounded-lg
                         focus: outline-[#d13e84]
                         focus:ring-yellow-300
                         block w-full p-2.5"
                placeholder="Aquí su nombre"
                required
              ></input>
            </div>

            <div className="">
              <label className="text-gray-400 ">Contraseña</label>
              <div className="flex flex-row items-center">
                <input
                  type={ShowPwd ? "text" : "password"}
                  id="password"
                  className="bg-gray-200
                         focus: outline-[#d13e84]
                         rounded-lg
                         block w-full p-2.5"
                  placeholder="•••••••••"
                  required
                ></input>
                <div
                  className=" pl-2 text-gray-400 hover:text-[#d13e84]"
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

          <div className="bg-[#d13e84] pl-4 pr-4 pt-2 pb-2 rounded-lg hover:scale-105 hover:cursor-pointer hover:shadow-none text-white font-bold text-lg shadow-md">
          <span className="hover:text-[#d13e84] hover:scale-105 hover:cursor-pointer text-whit-500">
              <Link to="/home">ingresar</Link>
            </span>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Login;
