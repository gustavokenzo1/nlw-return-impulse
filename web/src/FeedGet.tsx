import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Modal from "./components/Modal";
import { Widget } from "./components/Widget";
import AuthProvider from "./context/auth";

interface Props {
  apiKey: string;
}

export function FeedGet({ apiKey }: Props) {
  const [modal, setModal] = useState(false);

  return (
    <AuthProvider>
      <div className="flex fixed z-10 justify-center items-center">
        <AnimatePresence exitBeforeEnter>
          {modal && <Modal setModal={setModal} modal={modal} apiKey={apiKey} />}
        </AnimatePresence>

        <Widget setModal={setModal} modal={modal} apiKey={apiKey} />
      </div>
    </AuthProvider>
  );
}
