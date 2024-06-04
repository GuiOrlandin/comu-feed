import * as Dialog from "@radix-ui/react-dialog";
import {
  Close,
  CommunityNameAndDescription,
  Content,
  CreateCommunity,
  CreateCommunityButton,
  CreateCommunityContainer,
  CreatePostalModalContainer,
  ImageUploadContainer,
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

import { ChangeEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  CreateCommunityDetails,
  useCreateCommunityMutate,
} from "@/hooks/createCommunity";

export default function CreatePostModal() {
  const [tabType, setTabType] = useState("textPost");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [communityImage, setCommunityImage] = useState<File[]>();
  const [media, setMedia] = useState<File[]>();
  const [createCommunityDetails, setCreateCommunityDetails] =
    useState<CreateCommunityDetails>();
  const { mutate } = useCreateCommunityMutate();

  function onDrop(media: File[]) {
    setMedia(media);
  }

  function handleChangeCreateCommunityDetails(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    inputTitle: string
  ) {
    const { value } = event.target;
    setCreateCommunityDetails((prevDetails) => ({
      ...prevDetails!,
      [inputTitle]: value,
    }));
  }

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
  });

  function onDropCommunityImage(acceptedFiles: File[]) {
    const file = acceptedFiles[0];
    setCommunityImage(acceptedFiles);
    setImagePreview(URL.createObjectURL(file));
  }

  const communityImageUpload = useDropzone({
    onDrop: onDropCommunityImage,
    accept: {
      "image/*": [],
    },
  });

  function handleSetTapType(postType: string) {
    return setTabType(postType);
  }
  function handleCreateCommunity(data: CreateCommunityDetails) {
    if (data.password === "") {
      setCreateCommunityDetails((prevDetails) => ({
        ...prevDetails!,
        key_access: "false",
      }));
    } else {
      setCreateCommunityDetails((prevDetails) => ({
        ...prevDetails!,
        key_access: "true",
      }));
    }

    mutate({ data: createCommunityDetails!, file: communityImage! });
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
                <UploadCommunityImage {...communityImageUpload.getRootProps()}>
                  <label>
                    {imagePreview ? (
                      <ImageUploadContainer>
                        <img
                          src={imagePreview!}
                          alt="Preview"
                          style={{ width: "160px", height: "160px" }}
                        />
                        <button onClick={() => setImagePreview("")}>x</button>
                      </ImageUploadContainer>
                    ) : (
                      <>
                        <IoCloudUploadOutline height={24} />
                        <p>Foto</p>
                      </>
                    )}
                  </label>
                  <input type="" {...communityImageUpload.getInputProps()} />
                </UploadCommunityImage>
                <CommunityNameAndDescription>
                  <input
                    type="text"
                    placeholder="Nome da comunidade*"
                    onChange={(value) =>
                      handleChangeCreateCommunityDetails(value, "name")
                    }
                  />
                  <PasswordInput
                    type="password"
                    placeholder="Senha da comunidade (opcional)"
                    onChange={(value) =>
                      handleChangeCreateCommunityDetails(value, "password")
                    }
                  />
                  <textarea
                    name=""
                    id=""
                    placeholder="Descrição da comunidade*"
                    onChange={(value) =>
                      handleChangeCreateCommunityDetails(value, "description")
                    }
                  ></textarea>
                </CommunityNameAndDescription>
              </CreateCommunityContainer>
              <CreateCommunityButton
                onClick={() => handleCreateCommunity(createCommunityDetails!)}
              >
                Criar
              </CreateCommunityButton>
            </>
          )}
        </CreatePostalModalContainer>
      </Content>
    </Dialog.Portal>
  );
}
