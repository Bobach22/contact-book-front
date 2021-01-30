import { useStyletron } from "baseui";
import { Link } from "react-router-dom";
import { ArrowPrev } from "../../assets/icons/ArrowPrev";
import { ArrowNext } from "../../assets/icons/ArrowNext";

// type HandlePageChange=(page:T,(page:T)=>void)=>void
type PageChange=(page:number)=>void
const makePaginationLinks = (
  pages: number,
  active: number,
  relativeLink: string,
  arrowClassName: string,
  linkClassName: string,
  activeLinkClassName: string,
  subContainerClassName: string,
  onPageChange?:PageChange
) => {
  let pageNumbers = [];
  let startIndex: number;
  let endIndex: number;


  const handleClick=(page:number)=>{
    if(onPageChange){
      return onPageChange(page);

    }
  }

  if (pages <= 5) {
    // less than 5 pages ,then show all
    startIndex = 1;
    endIndex = pages;
  } else {
    // more than 5 total pages,so calculate start and end pages
    if (active <= 3) {
      startIndex = 1;
      endIndex = 5;
    } else if (active + 2 >= pages) {
      startIndex = pages - 4;
      endIndex = pages;
    } else {
      startIndex = active - 2;
      endIndex = active + 2;
    }
  }

  // add first pagination if startIndex is not 1

  if (startIndex > 1) {
    pageNumbers.push(
      <li className={subContainerClassName}>
        <Link
          to={`${relativeLink}page=${active - 1}`}
          className={linkClassName}
          key="1"
          onClick={()=>handleClick(active-1)}
        >
          <span className={arrowClassName}>
            <ArrowPrev />
          </span>
        </Link>
      </li>
    );
  }

  for (let i = startIndex; i <= endIndex; i++) {
    pageNumbers.push(
      <li className={subContainerClassName} key={i}>
        {active === i ? (
          <span className={activeLinkClassName}>{i}</span>
        ) : (
          <Link
            to={`${relativeLink}page=${i}`}
            className={linkClassName}
            key={i}
            onClick={()=>handleClick(i)}
          >
            <span>{i}</span>
          </Link>
        )}
      </li>
    );
  }

  if (endIndex < pages) {
    pageNumbers.push(
      <li className={subContainerClassName}>
        <Link
          to={`${relativeLink}page=${active + 1}`}
          className={linkClassName}
          key={pages}
          onClick={()=>handleClick(active-1)}
        >
          <span className={arrowClassName}>
            <ArrowNext />
          </span>
        </Link>
      </li>
    );
  }

  return pageNumbers;
};

export const Pagination: React.FC<{
  relativeLink: string;
  activePage: number;
  totalPages: number;
  onPageChange?:PageChange
}> = ({ totalPages, activePage, relativeLink,onPageChange }) => {
  const [css, theme] = useStyletron();

  const linkClassName = css({
    display: "flex",
    width: "32px",
    height: "32px",
    textDecoration: "none",
    justifyContent: "center",
    ...theme.typography.HeadingXSmall,
    color: theme.colors.positive300,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: "center",
    alignContent: "center",
    ":hover": {
      backgroundColor: theme.colors.backgroundTertiary,
    },
  });

  const arrowClassName = css({
    display: "flex",
    width: "48px",
    height: "32px",
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.positive300,
    ":hover": {
      backgroundColor: theme.colors.backgroundTertiary,
    },
  });

  const activeLinkClassName = css({
    display: "flex",
    width: "32px",
    height: "32px",
    justifyContent: "center",
    ...theme.typography.HeadingXSmall,
    color: theme.colors.mono900,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: theme.colors.backgroundTertiary,
  });

  const subContainerClassName = css({
    marginRight: "12px",
    overflow: "hidden",
    borderRadius: "4px",
    ":last-child": {
      marginRight: 0,
    },
    alignContent: "center",
  });
if(totalPages<2){
  return null
}else{
  return (
    <div className={css({ margin: "20px 0" })}>
      <ul
        className={css({
          backgroundColor: theme.colors.white,
          display: "flex",
          borderRadius: "0px",
          listStyleType: "none",
          padding: "20px 16px",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 8px rgba(0, 0 ,0, 0.1)",
        })}
      >
        {makePaginationLinks(
          totalPages,
          activePage,
          relativeLink,
          arrowClassName,
          linkClassName,
          activeLinkClassName,
          subContainerClassName,
          onPageChange
        )}
      </ul>
    </div>
  );
}
};
