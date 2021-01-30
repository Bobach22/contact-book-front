import React from "react";
import {
  Modal,
  ModalBody,
} from "baseui/modal";
import { useModalState, useModalDispatch } from "../../context/ModalContext";

/** Modal components  */
import ContactUpdateForm from "../ContactForm/ContactUpdateForm";
import ContactForm from "../ContactForm/ContactForm";

const MODAL_COMPONENTS = {
  CONTACT_UPDATE_FORM: ContactUpdateForm,
  CONTACT_FORM: ContactForm,
};

export default function ModalItems() {
  const isOpen = useModalState("isOpen");
  const modalComponent = useModalState("modalComponent");
  const data = useModalState("data");
  const dispatch = useModalDispatch();
  const closeModal = React.useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    [dispatch]
  );
  if (!modalComponent) {
    return null;
  }
  //@ts-ignore
  const SpecificContent = MODAL_COMPONENTS[modalComponent];
  console.log("Is Open :", isOpen);
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalBody>
        <SpecificContent onClose={closeModal} data={data} />
      </ModalBody>
    </Modal>
  );
}
