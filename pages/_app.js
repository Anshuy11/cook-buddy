import Layout from "@/components/Layout";
import "@/styles/globals.css";
import useAnonAuth from "@/hooks/useAnonAuth";

export default function App({ Component, pageProps }) {
  useAnonAuth()
  return(
 
  <Layout>
    <Component {...pageProps} />

  </Layout> 
  );
}
