import { useNavigate } from "react-router-dom";
import type { LoginPayload } from "../api/auth";
import AppLayout from "../components/AppLayout";
import FormLogin from "../components/FormLogin";
import { useLogin } from "../hooks/authHooks";

const LoginPage = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (data: LoginPayload) => {
    mutate(data, {
      onSuccess: (res) => {
        const { token, ...user } = res.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <AppLayout isAuth>
      <FormLogin onSubmitHandler={onSubmit} isLoading={isPending} />
    </AppLayout>
  );
};

export default LoginPage;
