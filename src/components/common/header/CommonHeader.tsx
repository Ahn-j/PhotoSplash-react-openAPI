// import { useSetRecoilState } from "recoil";
import styles from "./CommonHeader.module.scss";
// import navStyles from "../navigation/CommonNavi.module.scss";
// import { pageState } from "@/recoil/atoms/pageState";
// import { searchState } from "@/recoil/atoms/searchState";
import { useNavigate } from "react-router-dom";

function CommonHeader() {
  const navigate = useNavigate();
  // const setPage = useSetRecoilState(pageState);
  // const setSearch = useSetRecoilState(searchState);

  // 북마크 페이지로 이동
  const moveToPage = (filter: string) => {
    if (filter === "main") {
      navigate("/");
    } else {
      navigate("/bookmark");
    }
  };
  // const handleClick = () => {
  //   //홈으로 변경
  //   navigate("/");
  //   //scss모듈 사용으로 부여된 클래스이름으로 돔 접근해서 엘리먼트 가져오기
  //   //네비게이션에서 클릭했을때의 엘리먼트요소선택
  //   // const el = document.querySelector(
  //   //   `.${navStyles.navigation} .${navStyles.navigation__menu}.${navStyles.active}`
  //   // );
  //   // console.log("el : ", el);
  //   // el.classList.remove(navStyles.active);
  //   // el.classList.add(navStyles.inactive);
  //   setSearch("korea");
  //   setPage(1);
  // };

  return (
    <header className={styles.header}>
      <div
        className={styles.header__logoBox}
        onClick={() => moveToPage("main")}
      >
        <img
          src="src/assets/images/image-logo.png"
          alt=""
          className={styles.header__logoBox__logo}
        />
        <span className={styles.header__logoBox__title}>PhotoSplash</span>
      </div>
      <div className={styles.header__profileBox}>
        <button className={styles.header__profileBox__button}>submit</button>
        <button
          className={styles.header__profileBox__button}
          onClick={() => moveToPage("bookmark")}
        >
          bookMark
        </button>
        <button className={styles.header__profileBox__userName}>
          with 9Diin | 9Diin@YouTube.com
        </button>
      </div>
    </header>
  );
}

export default CommonHeader;
