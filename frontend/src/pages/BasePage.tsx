import React from "react";

import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";

type BasePageProps = {
  pageName: string;
  children: React.ReactNode;
}

export const BasePage: React.FC<BasePageProps> = ({ pageName, children }) => {
  return (
    <div className="min-h-screen container mx-auto m-0 font-sans text-base antialiased font-normal leading-default text-slate-500">
      <Header />
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <Breadcrumb pageName={pageName} />
        <div className="content px-2 mx-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default BasePage;
