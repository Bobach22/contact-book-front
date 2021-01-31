import { styled } from "baseui";

export const AppWrapper = styled("div", ({$theme})=>({
  textAlign: "center",
  backgroundColor: "#EEEEEE",
  [$theme.mediaQuery.medium]:{
     padding: "100px",  
  },
  padding:"10px",
  height:"100%"
}));
