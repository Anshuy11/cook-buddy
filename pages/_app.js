import "@/styles/globals.css";
import useAnonAuth from "@/hooks/useAnonAuth";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  useAnonAuth()
  return(
 
  <Layout>
    <Component {...pageProps} />

  </Layout> 
  );
}
