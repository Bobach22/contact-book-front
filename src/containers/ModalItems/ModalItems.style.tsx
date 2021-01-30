import {styled} from "baseui"

export const Form = styled("form", ({ $theme }) => ({
    // minHeight: '100vh',
    backgroundColor: $theme.colors.white,
  }));
  
  export const ModalTitleWrapper = styled("div", ({ $theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "-55px 0 30px",
    position: "fixed"
  }));
  
  export const ModalTitle = styled("h3", ({ $theme }) => ({
    ...$theme.typography.HeadingXSmall,
    margin: 0,
    color: '#161F6A'
  }));