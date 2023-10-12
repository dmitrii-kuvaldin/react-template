import { useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks"; //из файла с хуками достаем два типизированных хука для redux
import { logout } from "../../features/auth/authSlice"; //достаем экшн из slice
import { selectUser } from "../../features/auth/selectors"; //
import styles from "./navbar.module.css";

function Navbar(): JSX.Element {
  const dispatch = useAppDispatch(); //диспатч
  const location = useLocation(); //локация из react-router-dom
  const navigate = useNavigate(); //навигация из react-router-dom
  const user = useAppSelector(selectUser); //типизированным useAppSelector достаем юзера

  const handleLogout = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault(); //зачем здесь useCallback?
      const dispatchResult = await dispatch(logout());
      if (logout.fulfilled.match(dispatchResult)) {
        //интересно что за match
        navigate("/auth/login");
      }
    },
    [dispatch, navigate]
  );
  return (
    <nav className={styles.navbar}>
      {!user ? (
        <>
          <NavLink to="/auth/login">Войти</NavLink>
          <NavLink to="/auth/register">Регистрация</NavLink>
        </>
      ) : location.pathname === "/" ? ( //если мы на главной что мы видим в зависимости от роли
        user.role === "ADMIN" ? (
          <NavLink to="/admin/tasks">Задачи всех пользователей</NavLink>
        ) : (
          <NavLink to="/tasks">Задачи текущего пользователя</NavLink>
        )
      ) : (
        <NavLink to="/">На главную</NavLink> //поправил выход на главную
      )}
      {user && (
        <NavLink to="" onClick={handleLogout}>
          Выйти
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
