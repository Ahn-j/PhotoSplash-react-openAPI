import CommonHeader from "@/components/common/header/CommonHeader";
import styles from "./styles/index.module.scss";
import type { CardDTO } from "../index/types/card";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import CommonBreadcrumbs from "@/components/common/breadcrumbs/CommonBreadcrumbs";

function Index() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = () => {
      const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"));
      if (getLocalStorage || getLocalStorage !== null) {
        setData(getLocalStorage);
      } else {
        setData([]);
      }
    };
    getData();
  }, []);

  return (
    <div className={styles.page}>
      {/* 공통 헤더 */}
      <CommonHeader />
      {/* breadcrumbs */}
      <CommonBreadcrumbs />
      <div className={styles.page__contents}>
        <main className={styles.page__contents}>
          {data.length === 0 ? (
            <div className={styles.page__contents__nodata}>
              등록된데이터가 없습니다
            </div>
          ) : (
            data.map((item: CardDTO) => {
              return <Card prop={item} key={item.id} />;
            })
          )}
        </main>
      </div>
    </div>
  );
}

export default Index;
