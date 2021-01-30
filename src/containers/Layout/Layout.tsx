import React from "react";
import { ModalProvider } from "../../context/ModalContext";
import ModalItems from "../../containers/ModalItems/ModalItems";
import {AppWrapper} from './Layout.style'

export default function Layout({ children }: any) {
  return (
    <ModalProvider>
      <AppWrapper>
        {children}
        <ModalItems />
      </AppWrapper>
    </ModalProvider>
  );
}
