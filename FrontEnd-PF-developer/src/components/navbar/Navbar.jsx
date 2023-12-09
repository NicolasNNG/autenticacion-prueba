import Link from "next/link";
import style from "./style.module.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const favoritesCount = useSelector((state) => state.allFavoritesBack.length);
  return (
    <nav className={style.nav}>
      <div className={style.buttons}>
        <Link href={"/"}>
          <button className={style.btn}>
            {" "}
            <span></span>
            <p data-text="Home" data-title="Home"></p>
          </button>
        </Link>
        <Link href={"/contact"} className={style.btn}>
          <button className={style.btn}>
            <span></span>
            <p data-text="Contact" data-title="Contact"></p>
          </button>
        </Link>
        <Link href={"/about"} className={style.btn}>
          <button className={style.btn}>
            <span></span>
            <p data-text="About" data-title="About"></p>
          </button>
        </Link>
        <Link href="/favorites">
          <button className={style.btn}>
            <span></span>
            <p
              data-text={`Favorites (${favoritesCount})`}
              data-title="Favorites"
            ></p>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
