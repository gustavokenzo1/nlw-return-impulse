import { useEffect } from "react";
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

export default function Intro({ children }: any) {
  const [colorTheme, setTheme] = useDarkMode();

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

  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-800 w-full h-screen text-zinc-800 dark:text-zinc-100 flex flex-col items-center p-4 font-rubik transition-all">
        <div className="flex flex-col items-center md:flex-row w-full h-full">
          {children}
          <div className="w-100 xl:w-1/2 flex items-center justify-center flex-col">
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
              <div className="flex items-start flex-col xl:flex-row xl:items-center xl:gap-4">
                <h2 className="text-2xl font-medium xl:text-xl">
                  Desenvolvido durante a
                </h2>
                <a
                  href="https://lp.rocketseat.com.br/nlw-return"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5"
                >
                  <NLWLogo mode={colorTheme} />
                </a>
              </div>
              <div className="flex items-start flex-col xl:flex-row xl:items-center xl:gap-4">
                <h2 className="text-2xl font-medium xl:text-xl">
                  Na trilha Impulse
                </h2>
                <img
                  width="50"
                  src="https://global-uploads.webflow.com/61d83a2ebb0ae01ab96e841a/624f50452beec9ad261dcad8_logo-impulso-nlw.svg"
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center">
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
                <h2 className="text-xl font-medium text-zinc-200 m-4 ml-8">
                  <span className="text-[#ff79c6]">return </span>
                  &#60; <span className="text-[#8be9fd]">FeedGet </span>
                  /&#62;
                </h2>
                <h2 className="text-xl font-medium text-zinc-200 ml-4">
                  &#125;
                </h2>
              </div>
              <h1 className="text-xl font-medium ml-8 mt-2 mr-8 text-zinc-200">
                Para fazer a integração com a API, contate-nos em:
              </h1>
              <div className="text-xl font-medium ml-8 mt-2 text-zinc-200 mb-5 flex gap-2 items-center">
                <EnvelopeSimple size={32} />
                <h1>
                  <a
                    href="
                mailto:feedget.impulse@gmail.com
                "
                    className="text-zinc-200 hover:text-brand-300 transition-all"
                  >
                    feedget.impulse@gmail.com
                  </a>
                </h1>
              </div>
            </div>
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
