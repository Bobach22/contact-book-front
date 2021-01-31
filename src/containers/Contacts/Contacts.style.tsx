import { styled, withStyle } from "baseui";
import {
  StyledTable as BaseStyledTable,
  StyledHeadCell as BaseStyledHeadCell,
  StyledBodyCell as BaseStyledCell,
} from "baseui/table-grid";

export const TableWrapper = styled("div", () => ({
  width: "100%",
  height: "450px",
}));

export const StyledTable = withStyle(BaseStyledTable, () => ({
  borderTopLeftRadius: "0 !important",
  borderTopRightRadius: "0 !important",
  borderBottomLeftRadius: "0 !important",
  borderBottomRightRadius: "0 !important",
  alignContent: "start",
}));

export const StyledHeadCell = withStyle(BaseStyledHeadCell, () => ({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 700,
  color: "#161F6A !important",
  height: "40px",
  alignItems: "center",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  borderTopColor: "rgba(0, 0, 0, 0.12)",
  borderRightColor: "rgba(0, 0, 0, 0.12)",
  borderBottomColor: "rgba(0, 0, 0, 0.12)",
  borderLeftColor: "rgba(0, 0, 0, 0.12)",
}));

export const StyledBodyCell = withStyle(BaseStyledCell, ({ $theme }) => ({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 400,
  color: "#161F6A !important",
  //   ...$theme.typography.ParagraphMedium,
  display: "flex",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
  textAlign: "left",
  borderBottomWidth: "1px",
  borderTopWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderBottomColor: $theme.colors.backgroundTertiary,
  borderStyle: "solid",
}));

export const StyledHeadCellCenter = withStyle(BaseStyledHeadCell, () => ({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 700,
  color: "#161F6A !important",
  alignItems: "center",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  borderTopColor: "rgba(0, 0, 0, 0.12)",
  borderRightColor: "rgba(0, 0, 0, 0.12)",
  borderBottomColor: "rgba(0, 0, 0, 0.12)",
  borderLeftColor: "rgba(0, 0, 0, 0.12)",
  alignSelf: "start",
  justifyContent: "center",
}));

export const StyledCellCenter = withStyle(BaseStyledCell, () => ({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 400,
  color: "#161F6A !important",
  alignSelf: "center",
  justifyContent: "center",
}));

export const ButtonWrapper = styled("div", ({ $theme }) => ({
  [$theme.mediaQuery.medium]: {
    paddingLeft: "20px",
    width: "auto",
  },
  paddingTop: "20px",
  width: "100%",
}));

export const HeaderWrapper = styled("div", ({ $theme }) => ({
  display: "flex",
  [$theme.mediaQuery.medium]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
}));

export const PageWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const InputWrapper = styled("div", ({ $theme }) => ({
  [$theme.mediaQuery.medium]: {
    paddingLeft: "20px",
  },
  paddingTop: "20px",
  width: "100%",
}));

export const NoResult = styled("div", {
  width: "100%",
  height: "100px",
  gridColumn: "span 5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
