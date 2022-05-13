import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { Widget } from "./components/Widget";
import AuthProvider, { useAuth } from "./context/auth";

interface Props {
  apiKey: string;
}

export function FeedGet({ apiKey }: Props) {
  const [modal, setModal] = useState(false);

  return (
    <AuthProvider>
      <div className="flex justify-center items-center h-screen">
        <AnimatePresence exitBeforeEnter>
          {modal && <Modal setModal={setModal} modal={modal} apiKey={apiKey} />}
        </AnimatePresence>

        <Widget setModal={setModal} modal={modal} apiKey={apiKey} />
      </div>
    </AuthProvider>
  );
}
