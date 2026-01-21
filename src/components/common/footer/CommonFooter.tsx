import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import styles from "./CommonFooter.module.scss";
import { imageData } from "@/recoil/selectors/imageSelectors";
import { pageState } from "@/recoil/atoms/pageState";
import { useEffect, useState } from "react";
import { searchState } from "@/recoil/atoms/searchState";

function CommonFooter() {
  const images = useRecoilValueLoadable(imageData);
  const search = useRecoilValue(searchState);
  const [page, setPage] = useRecoilState(pageState);
  console.log("page : ", page);
  console.log("re page : ", page);
  const [step, setStep] = useState(0);
  console.log("step : ", step);

  useEffect(() => {
    setStep((prev) => (prev === 0 ? prev : 0));
  }, [search]);

  //페이지 처리
  const newArray: number[] = [];
  for (let i = 1; i < images.contents.total_pages; i++) {
    newArray.push(i);
  }
  console.log("newArray : ", newArray);
  const length = newArray.length;
  const divide =
    Math.floor(length / 10) + (Math.floor(length % 10) > 0 ? 1 : 0);
  console.log("divide : ", divide);
  const res = [];

  for (let i = 0; i < divide; i++) {
    // 배열 0부터 n개씩 잘라 새 배열에 넣기
    res.push(newArray.splice(0, 10));
  }
  console.log("res : ", res);

  // ----------------------------------------------------------------------------------------------------

  const moveToPage = (selected: number) => {
    setPage(selected);
  };
  const moveToPrev = () => {
    if (step === 0) return;
    else {
      setStep(step - 1);
      setPage(res[step - 1][0]);
    }
  };
  const moveToNext = () => {
    if (step < res[step].length - 2) {
      setStep(step + 1);
      setPage(res[step + 1][0]);
    } else return;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button} onClick={moveToPrev}>
          <img src="src/assets/icons/icon-arrowLeft.svg" alt="" />
        </button>
        {res[step] &&
          res[step].map((item: number, index: number) => {
            if (item < 11) {
              return (
                <button
                  className={
                    index === page - 1
                      ? `${styles.pagination__button} ${styles.active}`
                      : `${styles.pagination__button} ${styles.inactive}`
                  }
                  key={item}
                  onClick={() => moveToPage(item)}
                >
                  {item}
                </button>
              );
            } else {
              return (
                <button
                  className={
                    index === page - 1 - step * 10
                      ? `${styles.pagination__button} ${styles.active}`
                      : `${styles.pagination__button} ${styles.inactive}`
                  }
                  key={item}
                  onClick={() => moveToPage(item)}
                >
                  {item}
                </button>
              );
            }
          })}
        <button className={styles.pagination__button} onClick={moveToNext}>
          <img src="src/assets/icons/icon-arrowRight.svg" alt="" />
        </button>
      </div>
    </footer>
  );
}

export default CommonFooter;
