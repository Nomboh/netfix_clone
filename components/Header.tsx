import React, { useEffect } from "react";
import style from "../styles/Header.module.css";
import { FaBell, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

function Header() {
  const [isScroll, setIsScroll] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { logOut } = useAuth();
  const handleLogout = async () => {
    await logOut();
  };
  return (
    <header className={`${style.header} ${isScroll && style.transparent}`}>
      <div className={style.container}>
        <div className={style.left}>
          <img className={style.logo} src="https://rb.gy/ulxxee" alt="logo" />

          <ul className={style.list}>
            <li className={` ${style.list_item} ${style.active}`}>Home</li>
            <li className={style.list_item}>Tv shows</li>
            <li className={style.list_item}>New $ Popular</li>
            <li className={style.list_item}>Movies</li>
            <li className={style.list_item}>My List</li>
          </ul>
        </div>
        <div className={style.right}>
          <FaSearch className={style.head_icon} />
          <p className={style.children}>Childern</p>
          <FaBell className={style.head_icon} />
          <Link href={"/account"}>
            <img
              src="https://rb.gy/g1pwyx"
              alt=""
              className={style.avatar}
              onClick={handleLogout}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
