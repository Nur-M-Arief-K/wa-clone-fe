import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import AuthInput from "./auth-input";
import PulseLoader from "react-spinners/PulseLoader";
import { registerUser } from "../../features/user-slice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    let res = await dispatch(registerUser({ ...data, picture: ""}))
    if (res.payload.user) {
      navigate("/");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-md p-10 rounded-xl dark:bg-dark_bg_2">
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-1 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        <form
          className="mt-6 space-y-3"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <AuthInput
            name="name"
            type="text"
            placeholder="Full name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          { error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null }
          <button
            className="w-full flex justify-center rounded-full tracking-wide
          font-semibold cursor-pointer bg-green_1 text-gray-100 p-4 focus:outline-none hover:bg-green_2 shadow-lg transition ease-in duration-300
          "
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign up"
            )}
          </button>
          <p className="flex items-center justify-center flex-col mt-10 text-center text-md dark:text-dark_text_1">
            <span>have an account ?</span>
            <Link
              to="/login"
              className=" cursor-pointer hover:underline transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
