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
  PasswordInputContainer,
  SendPostButton,
  ShowPasswordContentButton,
  TextPost,
  TextPostContainer,
  UploadCommunityImage,
  UploadMediaContainer,
  UploadMediaContainerOnHover,
} from "./styles";

import { FiEyeOff } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";

import { ChangeEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  CreateCommunityDetails,
  useCreateCommunityMutate,
} from "@/hooks/createCommunity";
import { CommunityResponse, UserResponse } from "../topBar";
import { userStore } from "@/store/userStore";
import {
  CreateTextPostRequest,
  useCreateTextPostMutate,
} from "@/hooks/createTextPost";
import {
  CreateMediaPostRequest,
  useCreateMediaPostMutate,
} from "@/hooks/createMediaPost";
import { ButtonOnBarContainer } from "../topBar/styles";

interface CreatPostModalProps {
  user: UserResponse;
}

export default function createPostAndCommunityModal({
  user,
}: CreatPostModalProps) {
  const [tabType, setTabType] = useState("createCommunity");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [communityImage, setCommunityImage] = useState<File[] | null>();
  const [media, setMedia] = useState<File>();
  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(true);
  const [mediaType, setMediaType] = useState("");
  const [mutateError, setMutateError] = useState<string>();
  const removeUser = userStore((state) => state.removeUser);
  const [open, setOpen] = useState(false);
  const [createCommunityDetails, setCreateCommunityDetails] =
    useState<CreateCommunityDetails>();
  const [combinedCommunities, setCombinedCommunities] =
    useState<CommunityResponse[]>();
  const [createTextPostDetails, setCreateTextPostDetails] =
    useState<CreateTextPostRequest>({
      community_id: "",
      postType: "textPost",
      title: "",
      content: "",
    });
  const [createMediaPostDetails, setCreateMediaPostDetails] =
    useState<CreateMediaPostRequest>({
      community_id: "",
      postType: "mediaPost",
      title: "",
      description: "",
    });
  const {
    mutate,
    isSuccess,
    error: createCommunityError,
  } = useCreateCommunityMutate();

  const { mutate: createTextPost, isSuccess: textPostCreated } =
    useCreateTextPostMutate();
  const { mutate: createMediaPost, isSuccess: mediaPostCreated } =
    useCreateMediaPostMutate();

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

  function handleChangeShowPassword() {
    setShowPassword(!showPassword);
    setInputType((prevInputType) =>
      prevInputType === "password" ? "text" : "password"
    );
  }

  function handleChangeCreateTextPostDetails(
    event:
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLInputElement>,
    inputTitle: string
  ) {
    const { value } = event.target;
    setCreateTextPostDetails((prevDetails) => ({
      ...prevDetails!,
      [inputTitle]: value,
    }));
  }

  function handleChangeCreateMediaPostDetails(
    event:
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLInputElement>,
    inputTitle: string
  ) {
    const { value } = event.target;
    setCreateMediaPostDetails((prevDetails) => ({
      ...prevDetails!,
      [inputTitle]: value,
    }));
  }

  const postImageOrVideoUploaded = useDropzone({
    onDrop: onDropPostImageOrVideoUploaded,
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
  function onDropPostImageOrVideoUploaded(acceptedFiles: File[]) {
    const file = acceptedFiles[0];
    setMedia(file);

    const imageTypes = ["jpg", "jpeg", "png", "gif"];
    const videoTypes = ["mp4", "webm", "ogg"];

    if (file.name) {
      const fileParts = file.name.split(".");
      const fileExtension =
        fileParts.length > 1 ? fileParts.pop()?.toLowerCase() : "";

      if (imageTypes.includes(fileExtension!)) {
        setMediaType("image");
        setImagePreview(URL.createObjectURL(file));
      } else if (videoTypes.includes(fileExtension!)) {
        setMediaType("video");
        setImagePreview(URL.createObjectURL(file));
      }
    }
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
    if (data!.password === undefined) {
      setCreateCommunityDetails((prevDetails) => ({
        ...prevDetails!,
        key_access: "false",
      }));

      return mutate({
        data: {
          description: createCommunityDetails!.description,
          key_access: "false",
          name: createCommunityDetails!.name,
        },
        file: communityImage!,
      });
    } else {
      return mutate({
        data: {
          description: createCommunityDetails!.description,
          key_access: "true",
          name: createCommunityDetails!.name,
          password: createCommunityDetails!.password,
        },
        file: communityImage!,
      });
    }
  }

  function isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  function handleCreateTextPost() {
    if (createTextPostDetails.community_id === "") {
      setMutateError("Escolha uma comunidade!");
    }
    createTextPost(createTextPostDetails);
  }

  function handleCreateMediaPost() {
    createMediaPost({ data: createMediaPostDetails, file: media! });
  }

  useEffect(() => {
    if (isSuccess) {
      setImagePreview(null);
      setCommunityImage(null);
      setCreateCommunityDetails({
        description: "",
        key_access: "",
        name: "",
      });
      setTabType("textPost");
    }

    if (user) {
      const allCommunities = [
        ...(user!.community_Member! || []),
        ...(user?.community_Founder! || []),
      ];
      setCombinedCommunities(allCommunities);
    }

    if (
      createCommunityError?.message === "Request failed with status code 401"
    ) {
      removeUser();
    }

    if (textPostCreated || mediaPostCreated) {
      setOpen(false);
    }
  }, [
    isSuccess,
    createCommunityError,
    user,
    textPostCreated,
    mediaPostCreated,
  ]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger onClick={() => setOpen(true)} asChild>
        <ButtonOnBarContainer>Criar</ButtonOnBarContainer>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <CreatePostalModalContainer>
            <Close>X</Close>
            <OptionsOfPostContainer>
              {combinedCommunities && combinedCommunities!.length > 0 ? (
                <>
                  <TextPost
                    $variant={tabType}
                    onClick={() => handleSetTapType("textPost")}
                  >
                    Texto
                  </TextPost>
                  <MediaPost
                    $variant={tabType}
                    onClick={() => handleSetTapType("mediaPost")}
                  >
                    Imagem & Video
                  </MediaPost>
                  <CreateCommunity
                    $variant={tabType}
                    onClick={() => handleSetTapType("createCommunity")}
                  >
                    Comunidade
                  </CreateCommunity>
                </>
              ) : (
                <CreateCommunity
                  $variant={tabType}
                  onClick={() => handleSetTapType("createCommunity")}
                >
                  Comunidade
                </CreateCommunity>
              )}
            </OptionsOfPostContainer>

            {tabType === "textPost" && (
              <TextPostContainer>
                <input
                  type="text"
                  placeholder="Titulo"
                  onChange={(event) =>
                    handleChangeCreateTextPostDetails(event, "title")
                  }
                />
                <select
                  onChange={(event) =>
                    handleChangeCreateTextPostDetails(event, "community_id")
                  }
                >
                  <option>Escolha a comunidade</option>
                  {user &&
                    combinedCommunities!.map((community) => (
                      <option key={community.id} value={community.id}>
                        {community.name}
                      </option>
                    ))}
                </select>
                <span>{mutateError}</span>
                <textarea
                  onChange={(event) =>
                    handleChangeCreateTextPostDetails(event, "content")
                  }
                  name=""
                  id=""
                  placeholder="Conteudo do post"
                ></textarea>
                <SendPostButton onClick={() => handleCreateTextPost()}>
                  Enviar
                </SendPostButton>
              </TextPostContainer>
            )}
            {tabType === "mediaPost" && (
              <MediaPostContainer>
                <input
                  type="text"
                  placeholder="Titulo"
                  onChange={(event) =>
                    handleChangeCreateMediaPostDetails(event, "title")
                  }
                />
                <select
                  onChange={(event) =>
                    handleChangeCreateMediaPostDetails(event, "community_id")
                  }
                >
                  <option>Escolha a comunidade</option>
                  {user &&
                    combinedCommunities!.map((community) => (
                      <option key={community.id} value={community.id}>
                        {community.name}
                      </option>
                    ))}
                </select>
                <textarea
                  onChange={(event) =>
                    handleChangeCreateMediaPostDetails(event, "description")
                  }
                  name=""
                  id=""
                  placeholder="descrição do post"
                ></textarea>
                {postImageOrVideoUploaded.isDragActive ? (
                  <UploadMediaContainerOnHover
                    {...postImageOrVideoUploaded.getRootProps()}
                  >
                    <label>
                      <IoCloudUploadOutline height={24} />
                      <p>Arraste e solte o arquivo</p>
                    </label>
                    <input
                      type=""
                      {...postImageOrVideoUploaded.getInputProps()}
                    />
                  </UploadMediaContainerOnHover>
                ) : (
                  <>
                    <UploadMediaContainer
                      {...postImageOrVideoUploaded.getRootProps()}
                    >
                      <label>
                        {imagePreview ? (
                          <>
                            {mediaType === "image" ? (
                              <ImageUploadContainer>
                                <img
                                  src={imagePreview!}
                                  alt="Preview"
                                  style={{ width: "495px", height: "320px" }}
                                />
                                <button onClick={() => setImagePreview("")}>
                                  x
                                </button>
                              </ImageUploadContainer>
                            ) : (
                              <ImageUploadContainer>
                                <video
                                  src={imagePreview!}
                                  style={{ width: "480px", height: "300px" }}
                                />
                                <button onClick={() => setImagePreview("")}>
                                  x
                                </button>
                              </ImageUploadContainer>
                            )}
                          </>
                        ) : (
                          <>
                            <IoCloudUploadOutline height={24} />
                            <p>Arraste e solte o arquivo</p>
                          </>
                        )}
                      </label>
                      <input
                        type=""
                        {...postImageOrVideoUploaded.getInputProps()}
                      />
                    </UploadMediaContainer>
                  </>
                )}
                <SendPostButton onClick={() => handleCreateMediaPost()}>
                  Enviar
                </SendPostButton>
              </MediaPostContainer>
            )}
            {tabType === "createCommunity" && (
              <>
                <CreateCommunityContainer>
                  <UploadCommunityImage
                    {...communityImageUpload.getRootProps()}
                  >
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
                    <PasswordInputContainer>
                      <PasswordInput
                        type={inputType}
                        placeholder="Senha da comunidade (opcional)"
                        onChange={(value) =>
                          handleChangeCreateCommunityDetails(value, "password")
                        }
                      />
                      <button onClick={() => handleChangeShowPassword()}>
                        {showPassword ? (
                          <FiEyeOff size={15} color="#2f1b7e" />
                        ) : (
                          <FaRegEye size={15} color="#2f1b7e" />
                        )}
                      </button>
                    </PasswordInputContainer>
                    <textarea
                      name=""
                      id=""
                      placeholder="Descrição da comunidade (opcional)"
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
    </Dialog.Root>
  );
}
