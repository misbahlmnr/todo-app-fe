import { toast } from "react-toastify";
import type { RegisterPayload } from "../api/auth";
import AppLayout from "../components/AppLayout";
import FormRegister from "../components/FormRegister";
import { useRegister } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { mutate, isPending } = useRegister();

  const navigate = useNavigate();

  const onSubmit = (data: RegisterPayload) => {
    mutate(data, {
      onSuccess: (res) => {
        const { message } = res.data;

        toast(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <AppLayout isAuth>
      <FormRegister onSubmitHandler={onSubmit} isLoading={isPending} />
    </AppLayout>
  );
};

export default RegisterPage;
