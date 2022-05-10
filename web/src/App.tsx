import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Landing from "./components/Landing";
import Modal from "./components/Modal";
import { Widget } from "./components/Widget";
import AuthProvider from "./context/auth";

export function App() {
  const [modal, setModal] = useState(false);

  return (
    <AuthProvider>
      <div className="flex justify-center items-center h-screen">
        <Landing />
        <AnimatePresence exitBeforeEnter>
          {modal && <Modal setModal={setModal} modal={modal} />}
        </AnimatePresence>

        <Widget setModal={setModal} modal={modal} />
      </div>
    </AuthProvider>
  );
}
