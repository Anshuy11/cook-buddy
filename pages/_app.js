import Layout from "@/components/Layout";
import "@/styles/globals.css";
import ThemeContextFunc from '../context/ThemeContext';

export default function App({ Component, pageProps }) {
  return(
    <ThemeContextFunc>
  <Layout>
    <Component {...pageProps} />

  </Layout> 
  </ThemeContextFunc>);
}
