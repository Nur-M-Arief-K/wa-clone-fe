import { Link, useNavigate } from "react-router-dom";
// Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../utils/validation";
// React-redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../features/user-slice";
// Components
import { AuthInput } from "../auth-input";
import PulseLoader from "react-spinners/PulseLoader";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    let res = await dispatch(loginUser({ ...values }));
    if (res?.payload?.user) {
      navigate("/");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-md p-10 rounded-xl dark:bg-dark_bg_2">
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-1 text-3xl font-bold">Welcome back</h2>
        </div>
        <form
          className="mt-6 space-y-3"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            label="Email address *"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            label="Password *"
            register={register}
            error={errors?.password?.message}
          />
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          <button
            className="w-full flex justify-center rounded-full tracking-wide
          font-semibold cursor-pointer bg-green_1 text-gray-100 p-4 focus:outline-none hover:bg-green_2 shadow-lg transition ease-in duration-300
          "
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Login"
            )}
          </button>
          <p className="flex items-center justify-center flex-col mt-10 text-center text-md dark:text-dark_text_1">
            <span>Don't have an account ?</span>
            <Link
              to="/register"
              className=" cursor-pointer hover:underline transition ease-in duration-300"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
