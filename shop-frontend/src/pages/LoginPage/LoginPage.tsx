import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cls from "./LoginPage.module.scss";
import classNames from "classnames";
import { API_URL } from "../../config";
import axios from "axios";

interface LoginPageProps {
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setAuthorized }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Хук для навигации (редирект) после успешной авторизации
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { username, password },
        { withCredentials: true } // Для передачи JWT в куках
      );

      // Если логин успешен, меняем состояние и перенаправляем
      setAuthorized(true);
      navigate("/admin"); // Перенаправление в админку
    } catch (error: any) {
      console.error("Ошибка при авторизации:", error);

      // Обрабатываем ошибки (если сервер вернул JSON)
      if (error.response) {
        alert(error.response.data.message || "Ошибка авторизации");
      } else {
        alert("Произошла ошибка при авторизации");
      }
    }
  };

  return (
    <div className={cls.LoginPage}>
      <form className={cls.loginForm} onSubmit={handleSubmit}>
        <div className={cls.row}>
          <div className={cls.labelContainer}>
            <label className={cls.label}>Логин</label>
          </div>
          <input
            className={cls.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className={cls.row}>
          <div className={cls.labelContainer}>
            <label className={cls.label}>Пароль</label>
          </div>
          <input
            className={cls.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div className={cls.row}>
          <button
            className={classNames("", {}, [cls.button, cls.label])}
            type="submit"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
