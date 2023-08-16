import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";

const Login = () => {
  const { loginUserEmail } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const notify = () =>
    toast.error("Invalid credentials!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUserEmail(email, password)
      .then((result) => {
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        notify();
      });
  };
  return (
    <section className="h-screen bg-login bg-no-repeat bg-cover bg-whiteSemi flex flex-col items-center justify-center w-full">
      <div className="flex flex-col">
        <div className="text-center mb-10">
          <h4 className="text-3xl text-primaryMain">Welcome back!</h4>
          <h1 className="text-5xl text-pureBlackColor font-bold">
            Login to continue
          </h1>
        </div>
        <div className="flex items-center justify-center py-12 px-10 bg-whiteHigh rounded-lg w-[476px]">
          <form className="flex flex-col w-full gap-4 " onSubmit={handleLogin}>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Your E-mail
              </p>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input bg-transparent border border-whiteLow focus:outline-none w-full"
              />
            </div>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Password
              </p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input bg-transparent border border-whiteLow focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                placeholder="Password"
                className=" bg-whiteLow "
              />
              <p className="text-blackSemi">Remeber me</p>
            </div>
            <button
              className="btn normal-case mt-4 mb-6 rounded-full bg-primaryMain text-whiteHigh border-0 hover:bg-primaryMain"
              type="submit"
            >
              {/* <img className="w-12" src={loginBtn} alt="login button" /> */}
              Login
            </button>

            <div className="text-center">
              <Link to="/" className="text-lg text-primaryMain underline">
                Forget Password?
              </Link>
            </div>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
