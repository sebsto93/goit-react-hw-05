import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        exact
        to="/"
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.active : styles.navLinkHome}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.active : styles.navLinkMovies}`
        }
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
