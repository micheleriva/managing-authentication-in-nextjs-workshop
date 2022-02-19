import { NavBar } from "../components/NavBar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="pb-24">
      <div className="mb-12">
        <NavBar />
      </div>
      <div className="w-8/12 m-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
