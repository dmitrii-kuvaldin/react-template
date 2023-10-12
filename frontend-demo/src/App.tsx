import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { getUser } from "./features/auth/authSlice";
// eslint-disable-next-line import/no-extraneous-dependencies
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { selectAuthChecked } from "./features/auth/selectors";
import AdminCabinet from "./components/main/AdminCabinet";
import Layout from "./components/layouts/Layout";
import Tasks from "./components/Tasks";
import Home from "./components/home/Home";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authChecked = useAppSelector(selectAuthChecked);

  useEffect(() => {
    //забираем пользователя через redux
    dispatch(getUser());
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/admin/tasks" element={<AdminCabinet />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;