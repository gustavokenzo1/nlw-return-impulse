import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NLWLogo from "../NLWLogo";
import useDarkMode from "../../hook/useDarkMode";
import { CaretDoubleDown, MoonStars, Sun } from "phosphor-react";
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
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const fourthSectionRef = useRef<HTMLDivElement>(null);
  const fifthSectionRef = useRef<HTMLDivElement>(null);
  const sixthSectionRef = useRef<HTMLDivElement>(null);

  const [currentRef, setCurrentRef] = useState("firstSectionRef");

  function scroll() {
    if (currentRef === "firstSectionRef") {
      secondSectionRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setCurrentRef("secondSectionRef");
    } else if (currentRef === "secondSectionRef") {
      thirdSectionRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setCurrentRef("thirdSectionRef");
    } else if (currentRef === "thirdSectionRef") {
      fourthSectionRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setCurrentRef("fourthSectionRef");
    } else if (currentRef === "fourthSectionRef") {
      fifthSectionRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setCurrentRef("fifthSectionRef");
    } else if (currentRef === "fifthSectionRef") {
      sixthSectionRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setCurrentRef("sixthSectionRef");
    } else if (currentRef === "sixthSectionRef") {
      firstSectionRef.current!.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setCurrentRef("firstSectionRef");
    }
  }

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
        setEmail("");
        setSuccess(true);
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
    <div className="font-rubik text-zinc-800 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 transition-all duration-500">
      {children}
      <section
        ref={firstSectionRef}
        className="lg:px-24 md:px-10 min-h-screen w-full flex flex-col md:flex-row items-start md:items-center justify-center"
      >
        <div
          className="w-3/4 self-center md:w-3/4 h-1/2 md:h-3/4 flex flex-col justify-center m-10"
          data-aos="fade-up"
        >
          <h1 className="text-4xl text-center md:text-left md:text-6xl lg:text-7xl text-brand-300">
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
          <h2 className="my-8 text-center md:text-left text-xl md:text-xl lg:text-2xl">
            Um Widget de coleta de Feedbacks.
          </h2>
          <div className="mt-10 self-center md:self-start flex flex-col sm:flex-row gap-12">
            <div className="text-sm md:text-md lg:text-lg text-zinc-600 dark:text-zinc-300">
              <h2>Desenvolvido durante a</h2>
              <a
                href="https://lp.rocketseat.com.br/nlw-return"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NLWLogo mode={colorTheme} />
              </a>
            </div>
            <div className="text-sm md:text-md lg:text-lg text-zinc-600 dark:text-zinc-300">
              <h2>Na trilha Impulse</h2>
              <img
                width="50"
                src="https://global-uploads.webflow.com/61d83a2ebb0ae01ab96e841a/624f50452beec9ad261dcad8_logo-impulso-nlw.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center md:justify-end justify-center w-full">
          <div
            data-aos="zoom-in"
            className="bg-[#373a49] p-4 w-full md:w-auto rounded-xl mx-5 sm:m-10 md:m-0 lg:m-10"
          >
            <div className="flex pb-4">
              <span className="bg-red-500 w-4 h-4 rounded-full m-1"></span>
              <span className="bg-yellow-500 w-4 h-4 rounded-full m-1"></span>
              <span className="bg-green-500 w-4 h-4 rounded-full m-1"></span>
            </div>
            <h1 className="text-lg md:text-xl lg:text-2xl text-zinc-100">
              Fácil Uso
            </h1>
            <h1 className="text-zinc-100">
              Clone o repositório e, em seguida:
            </h1>
            <div className="m-5">
              <h2 className="text-md md:text-lg lg:text-xl font-medium text-zinc-200 m-4">
                <span className="text-[#ff79c6]">import </span>
                &#123; FeedGet &#125;
                <span className="text-[#ff79c6]"> from </span>
                <span className="text-[#ffb86c]"> 'FeedGet' </span>
              </h2>
              <h2 className="text-md md:text-lg lg:text-xl font-medium text-zinc-200 m-4">
                <span className="text-[#ff79c6]">export function </span>
                <span className="text-[#50fa7b]"> App </span>( ) &#123;
              </h2>
              <h2 className="text-md md:text-lg lg:text-xl font-medium text-[#6272a4] m-4 ml-8">
                // Recomendável guardar em variável de ambiente
              </h2>
              <h2 className="text-md md:text-lg lg:text-xl font-medium text-zinc-200 m-4 ml-8">
                <span className="text-[#ff79c6]">const </span>
                <span className="text-[##f8f8f2]"> API_KEY = "exemplo"</span>
              </h2>
              <h2 className="text-md md:text-lg lg:text-xl font-medium text-zinc-200 m-4 ml-8">
                <span className="text-[#ff79c6]">return </span>
                &#60; <span className="text-[#8be9fd]">FeedGet </span>
                <span className="text-[#50fa7b]"> apiKey</span>
                <span className="text-[#f8f8f2]">=&#123;API_KEY&#125; </span>
                /&#62;
              </h2>
              <h2 className="text-md md:text-lg lg:text-xl font-medium text-zinc-200 ml-4">
                &#125;
              </h2>
            </div>
          </div>
        </div>
        <button
          onClick={() => scroll()}
          className="fixed flex items-center justify-center bottom-6 left-6 animate-pulse hover:animate-none transition-all z-10 bg-brand-300 w-12 h-12 rounded-full cursor-pointer"
        >
          <CaretDoubleDown size={24} color="#fff" />
        </button>
      </section>
      <section
        ref={secondSectionRef}
        className="h-screen w-full flex flex-col items-center justify-center"
      >
        <h1 className="text-lg md:text-xl lg:text-2xl mx-10">
          Para obter uma chave para a API, basta informar o e-mail da sua
          aplicação, levando em conta que:
        </h1>
        <h1 className="text-md md:text-lg lg:text-xl mx-10 mt-10">
          1. Esse e-mail será usado para receber todas as notificações, então é
          recomendável criar um apenas para isso
        </h1>
        <h1 className="text-md md:text-lg lg:text-xl mx-10 mt-2">
          2. Precisa utilizar o serviço do Gmail (podendo ser e-mail
          corporativo, institucional, etc...)
        </h1>
        <div
          className="w-full flex flex-col items-center mt-10"
          data-aos="fade-up"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail da aplicação"
            autoComplete="off"
            type="email"
            value={email}
            className="w-4/5 sm:w-1/3  min-h-[30px] text-sm placeholder-zinc-400 text-zinc-800 dark:text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          />
          {success ? (
            <button className="text-zinc-100 p-2 cursor-default w-4/5 sm:w-1/3 mt-4 bg-green-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm focus:border-none">
              Organização criada com sucesso, cheque seu e-mail!
            </button>
          ) : (
            <button
              onClick={handleCreateOrganization}
              className="text-zinc-100 p-2 w-4/5 sm:w-1/3 mt-4 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >
              {loading ? <Loading /> : "Criar minha Organização"}
            </button>
          )}
        </div>
      </section>
      <section
        ref={thirdSectionRef}
        className="w-full flex items-center flex-col justify-center min-h-screen"
      >
        <h1 className="text-lg md:text-xl lg:text-3xl">
          Apenas 3 simples passos:
        </h1>
        <div className="flex flex-col md:flex-row w-full lg:w-4/5 items-center md:items-start justify-around mt-20">
          <div data-aos="fade-up" className="mx-5">
            <img
              src={menu}
              className="rounded-xl hover:-translate-y-5 transition-all duration-300 shadow-2xl"
            />
            <h1 className="text-center text-md md:text-lg lg:text-xl mt-5 mb-20">
              1. Escolher um tipo de feedback
            </h1>
          </div>
          <div data-aos="fade-up" data-aos-delay="500" className="mx-5">
            <img
              src={step}
              className="rounded-xl hover:-translate-y-5 transition-all duration-300 shadow-2xl"
            />
            <h1 className="text-center text-md md:text-lg lg:text-xl mt-5 mb-20">
              2. Escrever o feedback
            </h1>
          </div>
          <div data-aos="fade-up" data-aos-delay="1000" className="mx-5">
            <img
              src={final}
              className="rounded-xl hover:-translate-y-5 transition-all duration-300 shadow-2xl"
            />
            <h1 className="text-center text-md md:text-lg lg:text-xl mt-5 mb-20">
              3. Enviar o feedback
            </h1>
          </div>
        </div>
      </section>
      <section ref={fourthSectionRef} className="w-full min-h-screen">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center m-5 md:m-10 justify-around ">
            <div className="lg:mr-16">
              <h1 className="text-center text-md md:text-lg lg:text-xl">
                Quando um Feedback é enviado, um e-mail também é enviado
                automaticamente para o administrador.
              </h1>
              <h1 className="text-center text-md md:text-lg lg:text-xl mb-10">
                Caso o usuário esteja logado, um e-mail também será enviado para
                ele.
              </h1>
            </div>
            <img
              src={gmail1}
              className="lg:w-1/2 rounded-xl shadow-2xl"
              data-aos="fade-up"
            />
          </div>
          <div className="flex flex-col lg:flex-row-reverse items-center justify-around m-5 md:m-10">
            <div className="lg:ml-16">
              <h1 className="text-center text-md md:text-lg lg:text-xl">
                Um administrador pode marcar um Feedback como lido.
              </h1>
              <h1 className="text-center text-md md:text-lg lg:text-xl mb-10">
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
      </section>
      <section ref={fifthSectionRef} className="w-full">
        <div className="flex flex-col items-center my-24 mx-5 md:mx-10">
          <h1 className="text-center text-lg md:text-xl lg:text-2xl mb-10">
            Deixe tanto o administrador, quanto os usuários, acompanharem os
            Feedbacks
          </h1>
          <h1 className="text-center text-md md:text-lg lg:text-xl mt-10 mb-5">
            Painel de Usuário:
          </h1>
          <img
            src={user}
            className="lg:w-3/4 rounded-xl shadow-2xl"
            data-aos="zoom-in"
          />
          <h1 ref={sixthSectionRef} className="text-center text-md md:text-lg lg:text-xl mb-5 mt-32">
            Painel de Administrador:
          </h1>
          <img
            src={admin}
            className="lg:w-3/4 rounded-xl shadow-2xl"
            data-aos="zoom-in"
          />
        </div>
      </section>
    </div>
  );
}
