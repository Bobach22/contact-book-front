import React from "react";
import { Block } from "baseui/block";
import { styled } from "baseui";

const Title = styled("h3", ({ $theme }) => ({
  ...$theme.typography.HeadingXSmall,
  marginTop: "0",
  marginBottom: "0",
  textAlign: "center",
  color:'#161F6A'
}));

const Label = styled("label", ({ $theme }) => ({
  ...$theme.typography.LabelLarge,
  color:'#161F6A',
  marginBottom: "10px",
}));

const Msg = styled("span", ({ $theme }) => ({
  ...$theme.typography.ParagraphSmall,
  color: $theme.colors.negative400,
  marginTop: "5px",
  marginRight: "auto"
}));

export const FormFields:React.FC<any> = ({ children }) => {
  return (
    <Block
      overrides={{
        Block: {
          style: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            margin: "20px 0",

            ":first-child": {
              marginTop: 0
            },

            ":last-child": {
              marginBottom: 0
            },

            ":only-child": {
              margin: 0
            }
          }
        }
      }}
    >
      {children}
    </Block>
  );
};

export const FormLabel:React.FC<any> = ({ children }) => {
  return <Label>{children}</Label>;
};

export const FormTitle: React.FC<any> = ({ children }) => {
  return <Title>{children}</Title>;
};

export const Error: React.FC<any> = ({ children }) => {
  return <Msg>{children}</Msg>;
};
