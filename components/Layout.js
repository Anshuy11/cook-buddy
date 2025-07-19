import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
    <>
    <Header/>
    <div className="m-3 p-2 min-h-screen ">

    <main>{children}</main>
    </div>

    <Footer/>
    </>
)
  };
  
  export default Layout;
  