import { useRouter } from "next/router";
import { NavBar } from "../components/NavBar";
import AuthWrapper from "../components/AuthWrapper";
import "../styles/globals.css";

function LayoutWrapper(props) {
  return (
    <div className="pb-24">
      <div className="mb-12">
        <NavBar />
      </div>
      <div className="w-8/12 m-auto">
        {props.children}
      </div>
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.asPath.startsWith('/profile')) {
    return (
      <AuthWrapper>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </AuthWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  );
}

export default MyApp;
