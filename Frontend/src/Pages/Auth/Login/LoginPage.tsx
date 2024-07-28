import env from "@env";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { emailValidator, isValid } from "@/Utils";
import { FormEvent } from "react";
import { useInput } from "@/Hooks";
import { authStore } from "@/Stores";
import { Button, Input } from "@/Components/UI";
import authServices from "@/Services/AuthServices";

const LoginPage = () => {
  const emailInput = useInput(
    (value) =>
      (typeof value === "string" && emailValidator(value)) || value === env.VITE_ADMIN_EMAIL
  );
  const passwordInput = useInput((value) => isValid(value));

  const { setTokens } = authStore();

  const errors = [
    emailInput.hasError,
    passwordInput.hasError,
    !emailInput.value,
    !passwordInput.value,
  ];

  const login = (e: FormEvent) => {
    e.preventDefault();

    if (errors.some((error) => error)) {
      toast.error("Please fill all fields correctly");
      return;
    }

    authServices
      .login({ email: emailInput.value as string, password: passwordInput.value as string })
      .then(({ data }) => {
        setTokens(data);
        toast.success("Login successful");
      })
      .catch(() => {
        toast.error("Invalid credentials");
      });
  };
  return (
    <div>
      <form onSubmit={(e) => login(e)} className="flex gap-5 flex-col">
        <Input autoComplete="username" label="Email" {...emailInput} />
        <Input
          autoComplete="current-password"
          label="Password"
          type="password"
          {...passwordInput}
        />
        <Button className="w-full">Login</Button>
      </form>
      <div className="flex flex-col justify-center items-center mt-5">
        <p>Don't have an account?</p>
        <Link to={"/auth/register"}>
          <Button btnType="secondary" className="bg-transparent shadow-lg">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
