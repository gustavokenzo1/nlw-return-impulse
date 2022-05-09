import { ArrowLeft } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth";
import { api } from "../../libs/api";
import { CloseButton } from "../CloseButton";
import { Loading } from "../WidgetForm/Loading";

interface Props {
  setLogin: (login: boolean) => void;
  setRegister: (register: boolean) => void;
}

export function Login({ setLogin, setRegister }: Props) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const { login } = useAuth();

  async function handleLogin(data: object) {
    setLoading(true);
    try {
      const response = await login(data);

      if (response.status === 200) {
        setLoading(false);
        setLogin(false);
        setRegister(false);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        setLoading(false);
        alert(
          "Erro ao fazer login. Verifique suas credenciais e tente novamente."
        );
      }
    } catch (error) {
      setLoading(false);
      alert(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  }

  return (
    <div>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={() => setLogin(false)}
        >
          <ArrowLeft weight="bold" className="w-4 h-4 " />
        </button>
        <CloseButton />
      </header>
      <h1 className="text-center text-xl leading-6 text-zinc-900 dark:text-zinc-200 mb-4">
        Login
      </h1>
      <form
        className="flex flex-col gap-4 justify-center"
        onSubmit={handleSubmit((data) => {
          handleLogin(data);
        })}
      >
        <label className="text-zinc-800 dark:text-zinc-100">E-mail</label>
        <input
          placeholder="Seu e-mail"
          autoComplete="off"
          {...register("email", { required: true })}
          type="email"
          className="min-w-[304px] w-full min-h-[30px] text-sm placeholder-zinc-400 text-zinc-800 dark:text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        />
        <label className="text-zinc-800 dark:text-zinc-100">Senha</label>
        <input
          placeholder="Sua senha"
          autoComplete="off"
          {...register("password", { required: true })}
          type="password"
          className="mb-2 min-w-[304px] w-full min-h-[30px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        />
        <button
          type="submit"
          className="self-center p-2 w-32 mb-4 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
        >
          {loading ? <Loading /> : "Login"}
        </button>
      </form>
      <div className="mb-4">
        <span className="text-sm text-zinc-800 dark:text-zinc-100">
          Ainda não possui uma conta?
          <button
            type="button"
            className="text-zinc-400 hover:text-zinc-100 mx-2 transition-all"
            onClick={() => {
              setLogin(false);
              setRegister(true);
            }}
          >
            Crie uma
          </button>
        </span>
      </div>
    </div>
  );
}
