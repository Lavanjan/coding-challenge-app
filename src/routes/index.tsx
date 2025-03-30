import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import ChallengePage from "../pages/challenges";
import { ReactNode } from "react";
import Navbar from "../components/organisms/navbar";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/challenge/:id"
          element={
            <MainLayout>
              <ChallengePage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
