import * as Dialog from "@radix-ui/react-dialog";

import {
  ButtonsOfDialogContainer,
  CancelButton,
  ConfirmButton,
  Content,
  DeleteButton,
  DialogDeleteCommentContainer,
  DialogTitle,
  DialogTrigger,
  Overlay,
} from "./style";

import { useState, useEffect } from "react";

interface DeleteDialogProps {
  title: string;
  deleteButtonText: string;
  isSuccess: boolean;
  handleDeleteAction: () => void;
}

export default function DeleteDialog({
  title,
  deleteButtonText,
  handleDeleteAction,
  isSuccess,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <DeleteButton>{deleteButtonText}</DeleteButton>
      </DialogTrigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <DialogTitle>{title}</DialogTitle>
          <DialogDeleteCommentContainer>
            <ButtonsOfDialogContainer>
              <ConfirmButton onClick={() => handleDeleteAction()}>
                Confirmar
              </ConfirmButton>
              <CancelButton>Cancelar</CancelButton>
            </ButtonsOfDialogContainer>
          </DialogDeleteCommentContainer>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
