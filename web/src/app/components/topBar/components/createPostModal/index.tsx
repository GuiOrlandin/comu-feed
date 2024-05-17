import * as Dialog from "@radix-ui/react-dialog";
import {
  Close,
  Content,
  CreatePostalModalContainer,
  MediaPost,
  MediaPostContainer,
  OptionsOfPostContainer,
  Overlay,
  SendPostButton,
  TextPost,
  TextPostContainer,
  UploadMediaContainer,
  UploadMediaContainerOnHover,
} from "./styles";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function CreatePostModal() {
  const [postType, setPostType] = useState("textPost");
  const [media, setMedia] = useState<File[]>();

  function onDrop(media: File[]) {
    setMedia(media);
  }

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
  });

  function handleSetPostType(postType: string) {
    return setPostType(postType);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CreatePostalModalContainer>
          <Close>X</Close>
          <OptionsOfPostContainer>
            <TextPost
              variant={postType}
              onClick={() => handleSetPostType("textPost")}
            >
              Texto
            </TextPost>
            <MediaPost
              variant={postType}
              onClick={() => handleSetPostType("mediaPost")}
            >
              Imagem & Video
            </MediaPost>
          </OptionsOfPostContainer>

          {postType === "textPost" ? (
            <TextPostContainer>
              <input type="text" placeholder="Titulo" />
              <textarea name="" id="" placeholder="Conteudo do post"></textarea>
              <SendPostButton>Enviar</SendPostButton>
            </TextPostContainer>
          ) : (
            <MediaPostContainer>
              <input type="text" placeholder="Titulo" />

              {dropzone.isDragActive ? (
                <UploadMediaContainerOnHover {...dropzone.getRootProps()}>
                  <label>
                    <IoCloudUploadOutline height={24} />
                    <p>Arraste e solte o arquivo</p>
                  </label>
                  <input type="" {...dropzone.getInputProps()} />
                </UploadMediaContainerOnHover>
              ) : (
                <UploadMediaContainer {...dropzone.getRootProps()}>
                  <label>
                    <IoCloudUploadOutline height={24} />
                    <p>Arraste e solte o arquivo</p>
                  </label>
                  <input type="" {...dropzone.getInputProps()} />
                </UploadMediaContainer>
              )}
              <SendPostButton>Enviar</SendPostButton>
            </MediaPostContainer>
          )}
        </CreatePostalModalContainer>
      </Content>
    </Dialog.Portal>
  );
}
