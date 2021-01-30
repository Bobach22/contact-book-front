import React from "react";
import { useStyletron } from "baseui";
import { StyledTable, StyledHeadCell, StyledBodyCell, InputWrapper, HeaderWrapper,ButtonWrapper,PageWrapper, NoResult } from "./Contacts.style";
import { deleteContact, useContact } from "../../api/hooks";
import Checkbox from "../../components/CheckBox/CheckBox";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import Button from "../../components/Button/Button";
import { Header, Heading, Wrapper } from "../../components/WrapperStyle";
import Input from "../../components/Input/Input";
import ContentLoader from "react-content-loader";
import { TrashIcon } from "../../assets/icons/TrashIcon";
import { Spinner } from "baseui/spinner";
import { PencilIcon } from "../../assets/icons/PencilIcon";
import { useModalDispatch } from "../../context/ModalContext";
import { Pagination } from "../../components/Pagination/Pagination";
import { useLocation, useHistory } from "react-router-dom";
// import { usePrevious } from "../../utils/use-previous";

const EditContact: React.FC<{ data: IContact }> = ({ data }) => {
  const [css, theme] = useStyletron();
  const dispatch = useModalDispatch();
  const openModal = React.useCallback(
    () =>
      dispatch({
        type: "OPEN_MODAL",
        modalComponent: "CONTACT_UPDATE_FORM",
        data: data,
      }),
    [dispatch, data]
  );

  return (
    <Button kind="minimal" size="mini" shape="round" onClick={openModal}>
      <PencilIcon color={theme.colors.positive300} />
    </Button>
  );
};

const Phones: React.FC<{ phones: IPhone[] }> = ({ phones }) => {
  const [css] = useStyletron();

  return (
    <div className={css({ display: "flex", flexDirection: "column" })}>
      {phones.map((item, index) => (
        <span key={index} className={css({ whiteSpace: "nowrap" })}>
          {item.phone}
        </span>
      ))}
    </div>
  );
};

const Emails: React.FC<{ emails: IEmail[] }> = ({ emails }) => {
  const [css] = useStyletron();

  return (
    <div className={css({ display: "flex", flexDirection: "column" })}>
      {emails.map((item, index) => (
        <span key={index} className={css({ whiteSpace: "nowrap" })}>
          {item.email}
        </span>
      ))}
    </div>
  );
};

const Placeholder: React.FC<{ width: number; height: number }> = ({
  width,
  height,
  children,
}) => (
  <ContentLoader
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {children}
  </ContentLoader>
);
const StringPlaceholder = ({ width = 150, height = 20 }) => (
  <Placeholder width={width} height={height}>
    <rect x="0" y="0" width={width} height={height} />
  </Placeholder>
);

const LoadingSuspense = () => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000",
        height: "100%",
        width: "100%",
        opacity: "30%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Spinner color={"gray"} />
    </div>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Contacts: React.FC<any> = (props) => {

  const dispatch = useModalDispatch();
  const openModal = React.useCallback(
    () => dispatch({ type: "OPEN_MODAL",modalComponent:"CONTACT_FORM" }),
    [dispatch]
  );

  const query = useQuery();

  const [activePage, setActivePage] = React.useState(1);
  const [css, theme] = useStyletron();
  const [searchText, setSearchText] = React.useState("");

  const { contacts, isLoading, mutate, meta } = useContact(
    searchText,
    activePage
  );

  const [checkedId, setCheckedId] = React.useState<Array<number>>([]);
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // React.useEffect(() => {
  //   let q = Number(query.get("page"));
  //   if (q) {
  //     setActivePage(q);
  //   }
  // }, [meta]);

  // console.log("current page:", meta?.current_page);
  // console.log("last page:", meta?.last_page);



  const history = useHistory();
  const counter = React.useRef(0);
  // const historyRef = React.useRef(query.get("page"));
  const [relativeLink, setRelativeLink] = React.useState("");

  const page = query.get("page");

  React.useEffect(() => {
    if (page) {
      setActivePage(Number(page));
      window.scroll({
        left:0,
        top:0,
        behavior:"smooth"
      });
    }
  }, [page]);


  // const prevSearch=usePrevious(searchText);

  React.useEffect(() => {

    if (searchText) {
      // console.log('prevSearh:',prevSearch)
      // console.log('currentSearch:',searchText)
      // console.log(prevSearch===searchText);
      counter.current += 1;
      if (counter.current === 1) {
        // historyRef.current = String(activePage);
        setActivePage(1);
      }
if(!isLoading){
      // if(counter.current===1||prevSearch!==searchText){
      history.push({
        pathname: "/",
        search: `q=${searchText}${
          meta?.last_page && meta?.last_page > 1 ? "&page=" + activePage : ""
        }`,
      });
    // }
  }

      setRelativeLink(`?q=${searchText}&`);
    } else {
      // console.log("counter:", counter.current);
      if (counter.current >= 1) {
        // console.log("activepage before:", activePage);
        // setActivePage(Number(historyRef.current));
        // console.log('pacge before search:',historyRef.current)
        // console.log("activepage after:", activePage);
        // console.log("lastpage before push:",meta?.last_page)
        counter.current = 0;

        }
     if(!isLoading){
        history.push({
          pathname: "/",
          search: `${
            meta?.last_page && meta?.last_page > 1 ? "?page=" + activePage : ""
          }`,
        });
     }
        setRelativeLink("");
        // console.log('activePage:',activePage);
        // console.log('query page:',query.get("page"))
        // counter.current = 0;
        // historyRef.current=query.get("page");
      // }
    }


  }, [activePage, searchText,history, meta?.last_page,isLoading]);

  // console.log("Last page number:", meta?.last_page);
  // console.log("Current ppage:", meta?.current_page);

  React.useEffect(() => {}, [checkedId]);

  function onAllCheck(event: React.MouseEvent<HTMLInputElement>) {
    if (event.currentTarget.checked) {
      const idx = contacts && contacts.map((contact) => contact.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.currentTarget.checked);
  }

  function refreshIdList() {
    setCheckedId([]);
  }

  function handleDelete() {
    setLoading(true);
    deleteContact(checkedId)
      .then((res) => {
        mutate().then(() =>{
          setLoading(false)
          refreshIdList()
        });
        console.log(res);
      })
      .catch((err) => console.log(err.response))
     
  }

  function handleCheckbox(event: React.MouseEvent<HTMLInputElement>) {
    const { name } = event.currentTarget;
    const nameId = parseInt(name, 10);
    if (!checkedId.includes(nameId)) {
      setCheckedId((prevState) => [...prevState, nameId]);
    } else {
      setCheckedId((prevState) => prevState.filter((id) => id !== nameId));
    }
  }

  return (
    <PageWrapper>
      <Header>
        <HeaderWrapper>
          <Heading>Contacts</Heading>
          <InputWrapper>
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.currentTarget.value)}
              startEnhancer={<SearchIcon />}
              clearable
            />
         </InputWrapper>
         <ButtonWrapper> 
          <Button
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  whiteSpace:"nowrap",
                  backgroundColor: $theme.colors.positive300,
                  ":hover": {
                    backgroundColor: $theme.colors.positive400,
                  },
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                }),
              },
            }}
            onClick={openModal}
          >
            Add Contact
          </Button>
          </ButtonWrapper>
          </HeaderWrapper>

      </Header>
      <Wrapper>
        <StyledTable
          role="grid"
          $gridTemplateColumns="90px minmax(100px,300px) 1fr 1fr 90px"
        >
          <div role="row" className={css({ display: "contents" })}>
            <StyledHeadCell>
              <Checkbox
                type="checkbox"
                value="checkAll"
                checked={checked}
                onChange={onAllCheck}
              />
              {checkedId.length > 0 && (
                <Button
                  kind="minimal"
                  size="mini"
                  shape="round"
                  onClick={handleDelete}
                >
                  <TrashIcon
                    height={18}
                    width={18}
                    color={theme.colors.negative300}
                  />
                </Button>
              )}
            </StyledHeadCell>
            <StyledHeadCell>Name</StyledHeadCell>
            <StyledHeadCell>Phone</StyledHeadCell>
            <StyledHeadCell>Email</StyledHeadCell>
            <StyledHeadCell>Action</StyledHeadCell>
          </div>
          {contacts && !isLoading ? (
            contacts.length ? (
              contacts.map((contact) => (
                <div
                  role="row"
                  key={contact.id}
                  className={css({ display: "contents" })}
                >
                  {" "}
                  <StyledBodyCell>
                    <Checkbox
                      name={String(contact.id)}
                      checked={checkedId.includes(contact.id)}
                      onChange={handleCheckbox}
                    />{" "}
                  </StyledBodyCell>
                  <StyledBodyCell>{contact.name}</StyledBodyCell>
                  <StyledBodyCell>
                    <Phones phones={contact.phones} />
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Emails emails={contact.emails} />
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <EditContact data={contact} />
                  </StyledBodyCell>
                </div>
              ))
            ) : (
              <NoResult
              >
                No Result
              </NoResult>
            )
          ) : (
            [0, 1, 2, 3,4,5,6].map((val) => (
              <React.Fragment key={val}>
                <StyledBodyCell>
                  <StringPlaceholder width={24} />
                </StyledBodyCell>
                <StyledBodyCell>
                  <StringPlaceholder />
                </StyledBodyCell>
                <StyledBodyCell>
                  <StringPlaceholder />
                </StyledBodyCell>
                <StyledBodyCell>
                  <StringPlaceholder />
                </StyledBodyCell>
                <StyledBodyCell>
                  <StringPlaceholder width={60} />
                </StyledBodyCell>
              </React.Fragment>
            ))
          )}
        </StyledTable>
      </Wrapper>
      <Pagination
        relativeLink={relativeLink || "?"}
        totalPages={meta?.last_page || 1}
        activePage={activePage}
        // onPageChange={(page)=>setActivePage(page)}
      />
      {loading && <LoadingSuspense />}
    </PageWrapper>
  );
};

export default Contacts;
