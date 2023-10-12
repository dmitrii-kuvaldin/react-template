import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import styles from "./layout.module.css";

function Main(): JSX.Element {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className={styles.footer}>Здесь будет футер</footer>
    </>
  );
}

export default Main;
