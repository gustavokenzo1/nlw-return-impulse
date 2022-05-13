import { ArrowLeft } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../libs/api";
import { CloseButton } from "../CloseButton";
import { Loading } from "../WidgetForm/Loading";

interface Props {
  setRegister: (register: boolean) => void;
  setLogin: (login: boolean) => void;
}

export function Register({ setRegister, setLogin }: Props) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  async function handleRegister(data: object) {
    setLoading(true);
    try {
      const response = await api.post("/users", data);

      if (response.status === 201) {
        setLoading(false);
        setLogin(true);
        setRegister(false);
      } else {
        setLoading(false);
        alert("Erro ao criar conta");
      }
    } catch (error) {
      alert(
        "Ocorreu algum erro ao tentar criar sua conta! Verifique se já não existe uma conta com este e-mail."
      );
      setLoading(false);
    }
  }

  return (
    <div>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={() => {
            setRegister(false);
            setLogin(true);
          }}
        >
          <ArrowLeft
            weight="bold"
            className="w-4 h-4 dark:hover:text-zinc-100 hover:text-zinc-800"
          />
        </button>
        <CloseButton />
      </header>
      <h1 className="text-center text-xl leading-6 text-zinc-900 dark:text-zinc-200 mb-4">
        Registrar
      </h1>
      <form
        className="flex flex-col gap-4 justify-center"
        onSubmit={handleSubmit((data) => {
          handleRegister(data);
        })}
      >
        <label className="text-zinc-800 dark:text-zinc-100">Nome</label>
        <input
          placeholder="Seu nome"
          autoComplete="off"
          {...register("name", { required: true })}
          type="text"
          className="min-w-[304px] w-full min-h-[30px] text-sm placeholder-zinc-400 text-zinc-800 dark:text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        />
        <label className="text-zinc-800 dark:text-zinc-100">E-mail</label>
        <input
          placeholder="Seu melhor e-mail"
          autoComplete="off"
          {...register("email", { required: true })}
          type="email"
          className="min-w-[304px] w-full min-h-[30px] text-sm placeholder-zinc-400 text-zinc-800 dark:text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        />
        <label className="text-zinc-800 dark:text-zinc-100">Senha</label>
        <input
          placeholder="Sua senha super secreta"
          autoComplete="off"
          {...register("password", { required: true })}
          type="password"
          className="mb-2 min-w-[304px] w-full min-h-[30px] text-sm placeholder-zinc-400 text-zinc-800 dark:text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        />
        <button
          type="submit"
          className="text-zinc-100 self-center p-2 w-32 mb-4 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
        >
          {loading ? <Loading /> : "Criar conta"}
        </button>
      </form>
      <div className="mb-4">
        <span className="text-sm text-zinc-800 dark:text-zinc-100">
          Já possui uma conta?
          <button
            type="button"
            className="text-zinc-400 hover:text-zinc-100 mx-2 transition-all"
            onClick={() => {
              setRegister(false);
              setLogin(true);
            }}
          >
            Faça login
          </button>
        </span>
      </div>
    </div>
  );
}
