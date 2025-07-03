import Footer from "./Footer";
import Navbar from "./Navbar";

const AppLayout = ({
  isAuth = false,
  children,
}: {
  isAuth?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="font-inter flex flex-col bg-bgcolor min-h-[100dvh] w-full items-center justify-center p-4 md:p-10">
      {!isAuth && <Navbar />}
      <div className="flex-1 flex items-center justify-center w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
