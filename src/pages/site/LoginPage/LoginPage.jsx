import { useState } from "react";

import styles from "./LoginPage.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  // PRE-FILL FOR DEV PURPOSES
  const { login } = useAuth();
  const [email, setEmail] = useState("hesam@gmail.com");
  const [password, setPassword] = useState("123456");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      await login(email, password);
      navigate("/app");
    }
  };

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className="cta">Login</button>
        </div>
      </form>
    </main>
  );
}
