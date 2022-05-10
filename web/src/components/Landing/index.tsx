import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ChatTeardropDots,
  Envelope,
  GithubLogo,
  LinkedinLogo,
} from "phosphor-react";

import home from "../../assets/home.png";
import problem from "../../assets/problem.png";
import success from "../../assets/success.png";
import register from "../../assets/register.png";
import login from "../../assets/login.png";
import adminDashboard from "../../assets/adminDashboard.png";
import userDashboard from "../../assets/userDashboard.png";
import gmail1 from "../../assets/gmail1.png";
import gmail2 from "../../assets/gmail2.png";

export default function Landing() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className="self-center flex flex-col items-center w-full text-center h-full font-roboto p-4">
      <h1 className="text-5xl font-bold text-zinc-100 mt-10">FeedGet</h1>
      <h2 className="text-xl text-zinc-100 mt-10 p-10 sm:text-3xl">
        Um Widget de Feedbacks para o seu site
      </h2>
      <div className="flex flex-col items-center">
        <div className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
          <ChatTeardropDots className="w-6 h-6" />

          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
            <span className="pl-2">Feedback</span>
          </span>
        </div>
      </div>
      <h2 className="sm:text-2xl text-md text-zinc-100 sm:mt-10 mt-10">
        Ouça seus usuários em apenas 3 simples passos:
      </h2>
      <div
        className="mt-20 mb-20 flex w-3/4 justify-around items-start flex-col sm:flex-row"
        data-aos="fade-up"
      >
        <div className="p-2" data-aos="fade-up">
          <img src={home} alt="home" className="w-100 h-auto" />
          <h2 className="xl:text-2xl md:text-md sm:text-xs text-zinc-100 sm:mt-10 mt-2">
            1. Selecionar o tipo de feedback
          </h2>
        </div>
        <div className="p-2">
          <img
            src={problem}
            alt="problem"
            className="w-100 object-scale-down h-auto"
          />
          <h2 className="xl:text-2xl md:text-md sm:text-xs text-zinc-100 sm:mt-10 mt-2">
            2. Escrever o feedback
          </h2>
        </div>
        <div className="p-2" data-aos="fade-up">
          <img
            src={success}
            alt="success"
            className="w-100 object-scale-down h-auto"
          />
          <h2 className="xl:text-2xl md:text-md sm:text-xs text-zinc-100 sm:mt-10 mt-2">
            3. Enviar o feedback
          </h2>
        </div>
      </div>
      <h2 className="sm:text-2xl text-md text-zinc-100 sm:mt-20 mt-10">
        Permite a criação de contas para que os usuários possam acompanhar seus
        feedbacks
      </h2>
      <div
        className="mt-10 mb-20 flex justify-between sm:items-start items-center flex-col sm:flex-row"
        data-aos="zoom-in"
      >
        <div className="p-4">
          <img src={register} alt="register" className="w-100 h-auto" />
        </div>
        <div className="p-4">
          <img src={login} alt="login" className="w-100 h-auto p-4" />
        </div>
      </div>
      <h2 className="sm:text-2xl text-md text-zinc-100 sm:mt-20 mt-10">
        Possui painéis de acompanhamento tanto para o usuário como para o
        administrador
      </h2>
      <div className="mt-10 mb-20 flex justify-between sm:items-start items-center flex-col sm:flex-row">
        <div
          className="p-4 flex flex-col justify-center items-center"
          data-aos="fade-up"
        >
          <img
            src={userDashboard}
            alt="userDashboard"
            className="w-3/4 h-auto rounded-xl"
          />
          <h2 className="xl:text-2xl md:text-md sm:text-xs text-zinc-100 sm:mt-10 mt-2">
            Painel do usuário
          </h2>
        </div>
        <div
          className="p-4 flex flex-col justify-center items-center"
          data-aos="fade-up"
        >
          <img
            src={adminDashboard}
            alt="adminDashboard"
            className="w-3/4 h-auto rounded-xl"
          />
          <h2 className="xl:text-2xl md:text-md sm:text-xs text-zinc-100 sm:mt-10 mt-2">
            Painel do administrador
          </h2>
        </div>
      </div>
      <h2 className="sm:text-2xl text-md text-zinc-100 sm:mt-20 mt-10 p-4">
        Envio de e-mails tanto para a equipe como para o usuário, tanto na
        criação do feedback, quanto na resolução do mesmo
      </h2>
      <div className="mt-10 mb-20 flex justify-between items-center flex-col">
        <div className="p-4 flex flex-col justify-center items-center">
          <img src={gmail1} alt="gmail1" className="w-3/4 h-auto rounded-xl" />
          <h2 className="xl:text-2xl md:text-md sm:text-xs text-zinc-100 mt-2">
            E-mail para a equipe
          </h2>
        </div>
        <div className="p-4 flex flex-col justify-center items-center mt-10">
          <img src={gmail2} alt="gmail2" className="w-3/4 h-auto rounded-xl" />
          <h2 className="xl:text-2xl md:text-md sm:text-xs text-zinc-100 mt-2">
            E-mail para o usuário
          </h2>
        </div>
      </div>
      <footer>
        <h2 className="text-zinc-100 text-xl font-bold text-center">Contato</h2>
        <div className="flex gap-8 m-10 items-start sm:items-center justify-center flex-col sm:flex-row">
          <div className="flex flex-row items-center gap-2">
            <a
              href="
              mailto:feedget.impulse@gmail.com
              "
            >
              <Envelope size={32} />
            </a>
            feedget.impulse@gmail.com
          </div>
          <div className="flex flex-row items-center gap-2">
            <a
              href="
              https://github.com/gustavokenzo1
              "
            >
              <GithubLogo size={32} />
            </a>
            gustavokenzo1
          </div>
          <div className="flex flex-row items-center gap-2">
            <a
              href="
              https://www.linkedin.com/in/gustavo-kenzo/
              "
            >
              <LinkedinLogo size={32} />
            </a>
            /in/gustavo-kenzo
          </div>
        </div>
      </footer>
    </div>
  );
}
