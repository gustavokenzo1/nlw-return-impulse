import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NLWLogo from "../NLWLogo";
import useDarkMode from "../../hook/useDarkMode";
import { EnvelopeSimple, MoonStars, Sun } from "phosphor-react";
import gmail1 from "../../assets/gmail1.png";
import gmail2 from "../../assets/gmail2.png";
import menu from "../../assets/menu.png";
import step from "../../assets/step.png";
import final from "../../assets/final.png";
import admin from "../../assets/admin.png";
import user from "../../assets/user.png";
import { Loading } from "../WidgetForm/Loading";
import { api } from "../../libs/api";

export default function Intro({ children }: any) {
  const [colorTheme, setTheme] = useDarkMode();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });

    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  function handleDarkModeToggle() {
    localStorage.setItem("theme", colorTheme === "dark" ? "light" : "dark");
    setTheme(colorTheme);
  }

  async function handleCreateOrganization() {
    if (!email) {
      alert("Por favor, informe seu email.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/organizations", {
        email,
      });

      if (response.status === 201) {
        setLoading(false);
        alert("Cadastro realizado com sucesso!");
        setEmail("");
      } else {
        setLoading(false);
        alert("Erro ao cadastrar, tente novamente.");
      }
    } catch (error) {
      setLoading(false);
      alert("Erro ao cadastrar, tente novamente.");
    }
  }

  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-800 w-full h-screen text-zinc-800 dark:text-zinc-100 flex flex-col items-center p-4 font-rubik transition-all">
        <div className="flex flex-col items-center md:flex-row w-full h-full">
          {children}
          <div className="w-full md:w-1/2 flex items-start md:items-center justify-center flex-col">
            <div
              className="h-1/3 w-3/4 flex flex-col justify-around"
              data-aos="fade-up"
            >
              <h1 className="text-6xl font-medium text-brand-500 flex items-center">
                FeedGet{" "}
                {colorTheme === "light" ? (
                  <button className="w-0" onClick={handleDarkModeToggle}>
                    <Sun size={32} className="cursor-pointer ml-4" />
                  </button>
                ) : (
                  <button className="w-0" onClick={handleDarkModeToggle}>
                    <MoonStars size={32} className="cursor-pointer ml-4" />
                  </button>
                )}
              </h1>
              <h2 className="text-3xl font-medium mt-10 mb-10">
                Um Widget de coleta de Feedbacks.
              </h2>
              <div className="flex flex-row md:flex-col gap-8 justify-between">
                <div className="flex items-start flex-col xl:flex-row xl:items-center xl:gap-4">
                  <h2 className="text-xl font-medium xl:text-xl">
                    Desenvolvido durante a
                  </h2>
                  <a
                    href="https://lp.rocketseat.com.br/nlw-return"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:mt-5"
                  >
                    <NLWLogo mode={colorTheme} />
                  </a>
                </div>
                <div className="flex items-start flex-col xl:flex-row xl:items-center xl:gap-4">
                  <h2 className="text-xl font-medium xl:text-xl">
                    Na trilha Impulse
                  </h2>
                  <img
                    width="50"
                    src="https://global-uploads.webflow.com/61d83a2ebb0ae01ab96e841a/624f50452beec9ad261dcad8_logo-impulso-nlw.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div
              className="flex bg-[#373a49] rounded-xl p-2 flex-col shadow-2xl mt-10"
              data-aos="zoom-in"
            >
              <div className="flex">
                <span className="bg-red-500 w-4 h-4 rounded-full m-1"></span>
                <span className="bg-yellow-500 w-4 h-4 rounded-full m-1"></span>
                <span className="bg-green-500 w-4 h-4 rounded-full m-1"></span>
              </div>
              <h1 className="text-2xl font-medium ml-8 mt-10 text-zinc-200">
                Fácil Uso
              </h1>
              <h1 className="text-xl font-medium ml-8 mt-2 text-zinc-200">
                Clone o repositório e, em seguida:
              </h1>
              <div className="m-5">
                <h2 className="text-xl font-medium text-zinc-200 m-4">
                  <span className="text-[#ff79c6]">import </span>
                  &#123; FeedGet &#125;
                  <span className="text-[#ff79c6]"> from </span>
                  <span className="text-[#ffb86c]"> 'FeedGet' </span>
                </h2>
                <h2 className="text-xl font-medium text-zinc-200 m-4">
                  <span className="text-[#ff79c6]">export function </span>
                  <span className="text-[#50fa7b]"> App </span>( ) &#123;
                </h2>
                <h2 className="text-xl font-medium text-[#6272a4] m-4 ml-8">
                  // Recomendável guardar em variável de ambiente
                </h2>
                <h2 className="text-xl font-medium text-zinc-200 m-4 ml-8">
                  <span className="text-[#ff79c6]">const </span>
                  <span className="text-[##f8f8f2]"> API_KEY = "exemplo"</span>
                </h2>
                <h2 className="text-xl font-medium text-zinc-200 m-4 ml-8">
                  <span className="text-[#ff79c6]">return </span>
                  &#60; <span className="text-[#8be9fd]">FeedGet </span>
                  <span className="text-[#50fa7b]"> apiKey</span>
                  <span className="text-[#f8f8f2]">=&#123;API_KEY&#125; </span>
                  /&#62;
                </h2>
                <h2 className="text-xl font-medium text-zinc-200 ml-4">
                  &#125;
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium mt-2 text-zinc-800 dark:text-zinc-200 text-center pl-8 pr-8">
          Para obter uma chave para a API, basta informar o e-mail da sua
          aplicação, levando em conta que:
        </h1>
        <h1 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 text-center mt-4">
          1. Esse e-mail será usado para receber todas as notificações, então é
          recomendável criar um apenas para isso
        </h1>
        <h1 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 text-center mt-4 mb-16">
          2. Precisa utilizar o serviço do Gmail (podendo ser e-mail
          corporativo, institucional, etc...)
        </h1>
        <div className="w-full">
          <div
            className="text-xl font-medium ml-6 mt-8 text-zinc-200 mb-5 flex flex-col gap-2 items-center"
            data-aos="fade-up"
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail da aplicação"
              autoComplete="off"
              type="email"
              value={email}
              className="min-w-[100px] w-1/3 min-h-[30px] text-sm placeholder-zinc-400 text-zinc-800 dark:text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
            />
            <button
              onClick={handleCreateOrganization}
              className="text-zinc-100 self-center p-2 w-1/3 mt-4 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >
              {loading ? <Loading /> : "Criar minha Organização"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-screen p-2 flex items-center flex-col justify-center mt-36 lg:mt-0 mb-36 text-zinc-800 dark:text-zinc-100">
        <h1 className="text-base md:text-xl lg:text-2xl mb-32">
          Apenas 3 simples passos:
        </h1>
        <div className="w-3/4 flex items-center justify-around flex-col lg:flex-row">
          <div className="m-5" data-aos="fade-up">
            <img
              src={menu}
              className="rounded-xl hover:-translate-y-5 transition-all duration-300 shadow-2xl"
            />
            <h1 className="text-base text-center md:text-xl lg:text-xl mt-5">
              1. Escolher um tipo de feedback
            </h1>
          </div>
          <div className="m-5" data-aos="fade-up" data-aos-delay="500">
            <img
              src={step}
              className="rounded-xl hover:-translate-y-5 transition-all duration-300 shadow-2xl"
            />
            <h1 className="text-base md:text-xl text-center lg:text-xl mt-5">
              2. Escrever o feedback
            </h1>
          </div>
          <div className="m-5" data-aos="fade-up" data-aos-delay="1000">
            <img
              src={final}
              className="rounded-xl hover:-translate-y-5 transition-all duration-300 shadow-2xl"
            />
            <h1 className="text-base md:text-xl text-center lg:text-xl mt-5">
              3. Enviar o feedback
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full p-2 flex mt-32 lg:mt-0 mb-32 text-zinc-800 dark:text-zinc-100">
        <div className="flex flex-col justify-around">
          <div className="self-center flex flex-col lg:flex-row h-1/3 mt-10 items-center w-3/4 gap-4">
            <div className="flex flex-col">
              <h1 className="text-base md:text-xl lg:text-2xl">
                Quando um Feedback é enviado, um e-mail também é enviado
                automaticamente para o administrador.
              </h1>
              <h1 className="text-base md:text-xl lg:text-2xl mt-5 lg:mt-10">
                Caso o usuário esteja logado, um e-mail também será enviado para
                ele.
              </h1>
            </div>
            <img
              src={gmail1}
              className="lg:w-1/2 rounded-xl shadow-2xl"
              data-aos="fade-left"
            />
          </div>
          <div className="self-center flex flex-col lg:flex-row-reverse h-1/3 mt-32 lg:mt-20 items-center w-3/4 gap-4">
            <div className="flex flex-col">
              <h1 className="text-base md:text-xl lg:text-2xl text-right">
                Um administrador pode marcar um Feedback como lido.
              </h1>
              <h1 className="text-base md:text-xl lg:text-2xl mt-5 lg:mt-10 text-right">
                Ao fazer isso, um e-mail será enviado para o usuário,
                avisando-o.
              </h1>
            </div>
            <img
              src={gmail2}
              className="lg:w-1/2 rounded-xl shadow-2xl"
              data-aos="fade-right"
            />
          </div>
        </div>
      </div>
      <div className="w-full p-2 flex mt-32 lg:mt-0 mb-32 text-zinc-800 dark:text-zinc-100 items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-base md:text-xl lg:text-2xl mb-32">
            Deixe tanto o administrador, quanto os usuários, acompanharem os
            Feedbacks
          </h1>
          <h1 className="text-base md:text-xl lg:text-2xl mb-10">
            Painel de Usuário:
          </h1>
          <img
            src={user}
            className="lg:w-3/4 rounded-xl shadow-2xl"
            data-aos="zoom-in"
          />
          <h1 className="text-base md:text-xl lg:text-2xl mb-10 mt-32">
            Painel de Administrador:
          </h1>
          <img
            src={admin}
            className="lg:w-3/4 rounded-xl shadow-2xl"
            data-aos="zoom-in"
          />
        </div>
      </div>
    </>
  );
}
