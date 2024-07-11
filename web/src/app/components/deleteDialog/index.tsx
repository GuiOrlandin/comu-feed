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

interface DeleteDialogProps {
  title: string;
  deleteButtonText: string;
  handleDeleteAction: () => void;
}

export default function DeleteDialog({
  title,
  deleteButtonText,
  handleDeleteAction,
}: DeleteDialogProps) {
  return (
    <Dialog.Root>
      <DialogTrigger asChild>
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
