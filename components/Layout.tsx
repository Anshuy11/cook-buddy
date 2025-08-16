import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
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
  