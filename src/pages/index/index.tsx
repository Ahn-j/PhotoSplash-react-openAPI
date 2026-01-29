import styles from "./styles/index.module.scss";
import axios from "axios";
import CommonHeader from "@/components/common/header/CommonHeader";
import CommonSearchBar from "@/components/common/searchBar/CommonSearchBar";
import CommonNavi from "@/components/common/navigation/CommonNavi";
import CommonFooter from "@/components/common/footer/CommonFooter";
import Card from "./components/Card";
import DetailDialog from "@/components/common/dialog/DetailDialog";
import type { CardDTO } from "./types/card";
import { useMemo, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { imageData } from "@/recoil/selectors/imageSelectors";
import Loading from "./components/Loading";
import { Link } from "react-router-dom";
import CommonBreadcrumbs from "@/components/common/breadcrumbs/CommonBreadcrumbs";

function Index() {
  const imgSelector = useRecoilValueLoadable(imageData);
  console.log("imgSelector : ", imgSelector);
  const [imgData, setImgData] = useState<CardDTO>();

  const [open, setOpne] = useState<boolean>(false);

  console.log("imgData : ", imgData);

  //   //recoil 이전에 통신으로 사용
  //   //이후 recoil 사용함으로 제거

  // useEffect(() => {
  //   // useEffect 자체는 클린함수 또는 아무것도 반환하지않는 함수만 내부에 사용가능
  //   //따라서 getData와같이 프로미트를 반환하는 함수는 외부에 사용한후 useEffect에서 부를수 없다
  //   //그래서 useEffect안에 작성한후 부르는식으로 사용해야함

  //   const getData = async () => {
  //     //오픈 API 호출
  //     const APT_URL = "https://api.unsplash.com/search/photos";
  //     const API_KEY = "tVh0EeQNCrjVcJzidvEpTJmG7CZSq0PtZHIvuoW1tPI";
  //     const PER_PAGE = 30;

  //     const searchValue = "Korea";
  //     const pageValue = 100;

  //     try {
  //       const res = await axios.get(
  //         `${APT_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`
  //       );

  //       if (res.status === 200) {
  //         console.log("200 : ", res.data.results);
  //         setImgUrls(res.data.results);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getData();
  // }, []);

  const CARD_LIST = useMemo(() => {
    if (imgSelector.state === "hasValue") {
      const result = imgSelector.contents.results.map((card: CardDTO) => {
        return (
          <Card
            data={card}
            key={card.id}
            handleDialog={setOpne}
            handleSetData={setImgData}
          />
        );
      });
      return result;
    } else {
      return (
        <div>
          <Loading />
        </div>
      );
    }
  }, [imgSelector]);

  return (
    <>
      {open && <DetailDialog data={imgData} handleChange={setOpne} />}
      <div className={styles.page}>
        {/* 공통 헤더 UI 부분 */}
        <CommonHeader />
        {/* breadcrumbs */}
        <CommonBreadcrumbs />
        {/* 공통 네비게이션 UI 부분 */}
        <CommonNavi />
        <div className={styles.page__contents}>
          <div className={styles.page__contents__introBox}>
            <div className={styles.wrapper}>
              <span className={styles.wrapper__title}>PhotoSplash</span>
              <span className={styles.wrapper__desc}>
                abcdefghigklmnopqrstuvwxyz
              </span>
              {/* 검색창 UI 부분 */}
              <CommonSearchBar />
            </div>
          </div>
          <div className={styles.page__contents__imageBox}>{CARD_LIST}</div>
        </div>
        {/* 공통 푸터 UI 부분 */}
        <CommonFooter />
      </div>
    </>
  );
}

export default Index;
