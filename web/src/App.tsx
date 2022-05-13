import Intro from "./components/Intro";
import { FeedGet } from "./FeedGet";

export function App() {
  return (
    <>
      <Intro>
        <FeedGet />
      </Intro>
    </>
  );
}
