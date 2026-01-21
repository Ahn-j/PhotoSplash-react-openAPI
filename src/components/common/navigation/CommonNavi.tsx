import { useEffect, useState } from "react";
import styles from "./CommonNavi.module.scss";
import data from "./navi.json";
import { Link, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/atoms/pageState";
import { searchState } from "@/recoil/atoms/searchState";

interface Navi {
  index: number;
  path: string;
  label: string;
  searchValue: string;
  isActive: boolean;
}

function CommonNavi() {
  const location = useLocation();
  console.log("location : ", location);
  const [navi, setNavi] = useState<Navi[]>(data);
  const setPage = useSetRecoilState(pageState);
  const setSearch = useSetRecoilState(searchState);

  useEffect(() => {
    navi.forEach((nav: Navi) => {
      nav.isActive = false;

      if (
        nav.path === location.pathname ||
        location.pathname.includes(nav.path)
      ) {
        nav.isActive = true;
        console.log(">>> : ", nav);
        setSearch(nav.searchValue);
        setPage(1);
      }
    });

    setNavi((preV) => [...preV]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <nav className={styles.navigation}>
      {navi.map((v) => (
        <Link
          to={v.path}
          className={
            v.isActive
              ? `${styles.navigation__menu} ${styles.active}`
              : `${styles.navigation__menu} ${styles.inactive}`
          }
          key={v.index}
        >
          <span className={styles.navigation__menu__label}>{v.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default CommonNavi;
