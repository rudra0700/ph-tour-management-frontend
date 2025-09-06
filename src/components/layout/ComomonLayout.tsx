import type {ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";


interface IProps {
    children: ReactNode
}
const ComomonLayout = ({children} : IProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <div className="grow-1"> {children}</div>
            <Footer></Footer>
        </div>
    );
};

export default ComomonLayout;