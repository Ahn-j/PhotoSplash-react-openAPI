import { searchState } from "@/recoil/atoms/searchState";
import styles from "./CommonSearchBar.module.scss";
import { useSetRecoilState } from "recoil";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { pageState } from "@/recoil/atoms/pageState";
import { useLocation, useNavigate } from "react-router-dom";

function CommonSearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const setSearch = useSetRecoilState(searchState);
  const setPage = useSetRecoilState(pageState);
  const [text, setText] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleClick = () => {
    navigate("/");
    if (text === "") {
      setSearch("korea");
      setPage(1);
    } else {
      setSearch(text);
      setPage(1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log("ev: ", e);
    if (e.key === "Enter") {
      navigate("/");
      if (text === "") {
        setSearch("korea");
        setPage(1);
      } else {
        setSearch(text);
        setPage(1);
      }
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input
          type="text"
          name="name"
          // value={location.pathname === "/" ? "" : text}
          value={text}
          placeholder="검색내용을 입력하세요"
          className={styles.searchBar__search__input}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <img
          src="src/assets/icons/icon-search.svg"
          alt=""
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default CommonSearchBar;
