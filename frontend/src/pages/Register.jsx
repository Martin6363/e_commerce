import { useTheme } from "@emotion/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import axios from "../api/axios";
import ModalVerify from "../components/Register_Modal/ModalVerify";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState([]);
  const [emailExist, setEmailExist] = useState('');
  const theme = useTheme();
  const [t] = useTranslation("global");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError
  } = useForm();
  const ref = useRef();
  const [showPassword, setShowPassword] = useState();


  const handleRegister = async (value) => {
    try {
      const res = await axios.post('/register', value);
      console.log(res.data.data);
      setUser(res.data);
      setShowModal(true);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message.includes('Email already exists')) {
          setError('email', { type: 'manual', message: 'Email already exists' });
        }
      } else {
        console.error('Registration failed:', error);
      }
    }
  };

  function handleShowPassword () {
    setShowPassword(!showPassword);
  }

  return (
    <>
    {showModal ? (
      <ModalVerify user={user}/>
    ) : (
      <section>
        <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto lg:py-0">
          <div
            className={`w-full rounded-lg shadow border mt-10 mb-2 sm:max-w-md xl:p-0 ${
              theme.palette.mode == "dark" ? "bg-gray-900" : "bg-slate-300"
            }`}
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl flex items-center gap-2">
                  <Link to={"/login"}>
                    <IconButton>
                        <FaArrowLeftLong />
                    </IconButton>
                  </Link>
                {t("register.title")}
              </h1>
              <form
                ref={ref}
                onSubmit={handleSubmit(handleRegister)}
                className="space-y- md:space-y-2 flex flex-col gap-3"
                action="#"
              >
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    {t("register.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`sm:text-sm outline-none rounded-lg block w-full p-2.5 ${
                      errors.name &&
                      "border-2 border-transparent border-b-rose-500"
                    } ${
                      theme.palette.mode == "dark"
                        ? "bg-gray-700"
                        : "bg-slate-100"
                    }`}
                    placeholder={t("register.name")}
                    {...register("name", { required: t("register.errors.name_required") })}
                  />
                  {errors.name && (
                    <div className="flex absolute top-[58px]">
                      <span className="text-red-500 text-[13px] m-1 p-2">
                        {errors.name?.message}
                      </span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    {t("register.email")}
                  </label>
                  <input
                    type="text"
                    id="email"
                    className={`outline-none sm:text-sm rounded-lg block w-full p-2.5 ${
                      errors.email &&
                      "border-2 border-transparent border-b-rose-500"
                    } ${
                      theme.palette.mode == "dark"
                        ? "bg-gray-700"
                        : "bg-slate-100"
                    }`}
                    {...register("email", {
                      required: t("register.errors.email_required"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("register.errors.email_invalid"),
                      },
                    })}
                    placeholder={t("register.email")}
                  />
                  {errors.email && (
                    <div className="flex absolute top-[58px]">
                      <span className="text-red-500 text-[13px] m-1 p-2">
                        {errors.email?.message}
                      </span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
                  >
                    {t("register.password")}
                  </label>
                  <input
                    type={`${ showPassword ? 'text' : 'password' }`}
                    id="password"
                    placeholder="••••••••"
                    className={`outline-none sm:text-sm rounded-lg block w-full p-2.5 ${
                      errors.password &&
                      "border-2 border-transparent border-b-rose-500"
                    } ${
                      theme.palette.mode == "dark"
                        ? "bg-gray-700"
                        : "bg-slate-100"
                    }`}
                    {...register("password", {
                      required: t("register.errors.password_required"),
                      minLength: {
                        value: 8,
                        message: t("register.errors.password_min_length"),
                      },
                      maxLength: {
                        value: 16,
                        message: t("register.errors.password_max_length"),
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="flex absolute top-[58px]">
                      <span className="text-red-500 text-[13px] m-1 p-2">
                        {errors.password?.message}
                      </span>
                    </div>
                  )}
                  <IconButton onClick={handleShowPassword} sx={{ position: "absolute", top: 30, right: 5, bottom: 0, fontSize: 20 }}>
                      {showPassword ? <FaEye/> : <IoEyeOff/> }
                  </IconButton>
                </div>
                <div className="relative">
                  <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium"
                  >
                    {t("register.confirm_password")}
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="••••••••"
                    className={`outline-none sm:text-sm rounded-lg block w-full p-2.5 ${
                      errors.confirm_password &&
                      "border-2 border-transparent border-b-rose-500"
                    } ${
                      theme.palette.mode == "dark"
                        ? "bg-gray-700"
                        : "bg-slate-100"
                    }`}
                    {...register("confirm_password", {
                      required: t("register.errors.confirm_password_required"),
                      validate: (value) =>
                        value === watch('password') || t("register.errors.password_mismatch"),
                    })}
                  />
                  {errors.confirm_password && (
                    <div className="flex absolute top-[58px]">
                      <span className="text-red-500 text-[13px] m-1 p-2">
                        {errors.confirm_password?.message}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between pt-5">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember">{t("register.remember_me")}</label>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {t("register.forgot_password")}
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-purple-700 hover:bg-purple-600  focus:outline-none focus:bg-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {t("register.sign_up")}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  If you have an account{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {t("register.sign_in")}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    )

    }
    </>
  );
};

export default Register;
