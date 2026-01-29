import { Link, useLocation } from "react-router-dom";
import styles from "./CommonBreadcrumbs.module.scss";
import { useSetRecoilState } from "recoil";
import { pageState } from "@/recoil/atoms/pageState";
import { searchState } from "@/recoil/atoms/searchState";

const CommonBreadcrumbs = () => {
  const location = useLocation();
  console.log("location : ", location);
  // const navigate = useNavigate();
  const setPage = useSetRecoilState(pageState);
  const setSearch = useSetRecoilState(searchState);

  const breadcrumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "");
  console.log("breadcrumbs : ", breadcrumbs);

  const handleState = () => {
    // navigate("/");
    setSearch("korea");
    setPage(1);
  };
  return (
    <nav className={breadcrumbs.length > 0 ? styles.nav : ""}>
      {breadcrumbs.length > 0 && (
        <div>
          <Link to="/" onClick={handleState}>
            HOME
          </Link>
          <span> {">"} </span>
          {breadcrumbs.map((crumb, index) => {
            const href = "/" + breadcrumbs.slice(0, index + 1).join("/");
            console.log("href : ", href);
            const isLast = index === breadcrumbs.length - 1;
            console.log("isLast : ", isLast);
            return (
              <>
                {isLast ? (
                  <span>{crumb}</span>
                ) : (
                  <>
                    <Link to={href} key={index}>
                      {crumb}
                    </Link>
                    <span> {">"} </span>
                  </>
                )}
              </>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default CommonBreadcrumbs;
