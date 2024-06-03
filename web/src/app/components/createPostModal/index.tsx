import * as Dialog from "@radix-ui/react-dialog";
import {
  Close,
  CommunityNameAndDescription,
  Content,
  CreateCommunity,
  CreateCommunityButton,
  CreateCommunityContainer,
  CreatePostalModalContainer,
  MediaPost,
  MediaPostContainer,
  OptionsOfPostContainer,
  Overlay,
  PasswordInput,
  SendPostButton,
  TextPost,
  TextPostContainer,
  UploadCommunityImage,
  UploadMediaContainer,
  UploadMediaContainerOnHover,
} from "./styles";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function CreatePostModal() {
  const [tabType, setTabType] = useState("textPost");
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

  function handleSetTapType(postType: string) {
    return setTabType(postType);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CreatePostalModalContainer>
          <Close>X</Close>
          <OptionsOfPostContainer>
            <TextPost
              variant={tabType}
              onClick={() => handleSetTapType("textPost")}
            >
              Texto
            </TextPost>
            <MediaPost
              variant={tabType}
              onClick={() => handleSetTapType("mediaPost")}
            >
              Imagem & Video
            </MediaPost>
            <CreateCommunity
              variant={tabType}
              onClick={() => handleSetTapType("createCommunity")}
            >
              Comunidade
            </CreateCommunity>
          </OptionsOfPostContainer>

          {tabType === "textPost" && (
            <TextPostContainer>
              <input type="text" placeholder="Titulo" />
              <textarea name="" id="" placeholder="Conteudo do post"></textarea>
              <SendPostButton>Enviar</SendPostButton>
            </TextPostContainer>
          )}
          {tabType === "mediaPost" && (
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
          {tabType === "createCommunity" && (
            <>
              <CreateCommunityContainer>
                <UploadCommunityImage {...dropzone.getRootProps()}>
                  <label>
                    <IoCloudUploadOutline height={24} />
                    <p>Foto</p>
                  </label>
                  <input type="" {...dropzone.getInputProps()} />
                </UploadCommunityImage>
                <CommunityNameAndDescription>
                  <input type="text" placeholder="Nome da comunidade*" />
                  <PasswordInput
                    type="password"
                    placeholder="Senha da comunidade (opcional)"
                  />
                  <textarea
                    name=""
                    id=""
                    placeholder="Descrição da comunidade*"
                  ></textarea>
                </CommunityNameAndDescription>
              </CreateCommunityContainer>
              <CreateCommunityButton>Criar</CreateCommunityButton>
            </>
          )}
        </CreatePostalModalContainer>
      </Content>
    </Dialog.Portal>
  );
}
