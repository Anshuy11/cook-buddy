import Layout from "@/components/Layout";
import "@/styles/globals.css";
import ThemeContextFunc from '../context/ThemeContext';
import useAnonAuth from "@/hooks/useAnonAuth";

export default function App({ Component, pageProps }) {
  useAnonAuth()
  return(
    <ThemeContextFunc>
  <Layout>
    <Component {...pageProps} />

  </Layout> 
  </ThemeContextFunc>);
}
