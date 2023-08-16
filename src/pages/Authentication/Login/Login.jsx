import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

const Login = () => {
  // const { loginUserEmail } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { authLogin, user } = useAuth();

  const [isLoading, setIsloading] = useState(false);

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

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setIsloading(true);
    authLogin(email, password)
      .then((result) => {
        form.reset();
        setIsloading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setIsloading(false);
        notify();
      });
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [navigate, user?.email]);

  return (
    <section className="h-screen bg-authBg bg-no-repeat bg-cover bg-whiteSemi w-full px-6">
      <div className="w-full h-full px-6 flex items-center justify-center overflow-hidden ">
        <div className="">
          <div className="text-center mb-10">
            <h4 className="text-3xl text-primaryColor">Welcome back!</h4>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-black font-bold mt-2">
              Login to continue
            </h1>
          </div>

          <div className=" w-full max-w-[30rem] py-12 px-10 rounded-lg bg-whiteHigh shadow-sm mx-auto">
            <form
              className="flex flex-col w-full gap-4 "
              onSubmit={handleLogin}
            >
              <div>
                <p className="text-sm text-fadeColor font-bold mb-2">
                  Your E-mail
                </p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="input bg-transparent border border-fadeReg focus:outline-none w-full"
                />
              </div>
              <div>
                <p className="text-sm text-fadeColor font-bold mb-2">
                  Password
                </p>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="input bg-transparent border border-fadeReg focus:outline-none w-full"
                  autoComplete="off"
                />
              </div>
              {/* <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  placeholder="Password"
                  className=" bg-whiteLow "
                />
                <p className="text-blackSemi">Remeber me</p>
              </div> */}
              <button
                className="btn normal-case mt-4 mb-6 rounded-full bg-primaryMain text-whiteHigh border-0 hover:bg-primaryMain"
                type="submit"
                disabled={isLoading}
              >
                {/* <img className="w-12" src={loginBtn} alt="login button" /> */}
                Login
              </button>

              <div className="text-center">
                <Link
                  to="/forget-password"
                  className="text-lg text-primaryMain underline"
                >
                  Forget Password?
                </Link>
              </div>
              {/* {isError && <p>{error}</p>} */}
            </form>
          </div>
        </div>
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
    </section>
  );
};

export default Login;
