import * as Dialog from "@radix-ui/react-dialog";
import {
  Close,
  Content,
  CreatePostalButton,
  CreatePostalModalContainer,
  MediaPost,
  OptionsOfPostContainer,
  Overlay,
  TextPost,
  TextPostContainer,
} from "./styles";

export default function CreatePostModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CreatePostalModalContainer>
          <Close>X</Close>
          <OptionsOfPostContainer>
            <TextPost>Texto</TextPost>
            <MediaPost>Imagem & Video</MediaPost>
          </OptionsOfPostContainer>
          <TextPostContainer>
            <input type="text" placeholder="Title" />
            <textarea name="" id=""></textarea>
          </TextPostContainer>
        </CreatePostalModalContainer>
      </Content>
    </Dialog.Portal>
  );
}
