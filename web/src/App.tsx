import Intro from "./components/Intro";
import { FeedGet } from "./FeedGet";

export function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  return (
    <Intro>
      <FeedGet apiKey={API_KEY} />
    </Intro>
  );
}
