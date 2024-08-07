"use client";

import TopBar, { UserResponse } from "@/app/components/topBar";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import {
  InputOfNameContainer,
  AvatarAndIconForUploadImageContainer,
  AvatarAndNameAndButtonsContainer,
  AvatarAndNameContainer,
  AvatarNameAndEditUserButtonContainer,
  CommentContainer,
  CommentContent,
  CommentContentContainer,
  CommentsButton,
  CommentsContainer,
  CommentsDontFoundContainer,
  CommunityNameAndPostTitleContainer,
  CommunityNameContainer,
  EditUserInfoButton,
  PostNameContainer,
  PostsButton,
  PostsDontFoundContainer,
  PostsOrCommentsButtonsContainer,
  PostsOrCommentsContainer,
  SkeletonButtons,
  UserContent,
  UserInfoContainer,
  UserWrapper,
  AvatarWithoutImageAndIconForUploadImageContainer,
  UploadIconSvg,
} from "./styles";
import AvatarImage from "@/app/components/avatarImg";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";

import { MdFileUpload } from "react-icons/md";

import CardPost from "@/app/components/cardPost";
import { MediaPostWithUser, TextPostWithUser } from "@/app/home/page";
import {
  SkeletonAvatar,
  SkeletonCommunity,
  SkeletonContent,
  SkeletonName,
} from "@/app/components/cardPostWithSkeleton/styles";
import {
  SkeletonAvatarNameAndCommunityContainer,
  SkeletonComment,
  SkeletonCommentAndLikeContainer,
  SkeletonContainer,
  SkeletonLike,
  SkeletonNameAndCommunityContainer,
} from "@/app/news/styles";
import { ProfileContent } from "@/app/components/cardPost/styles";
import { userStore } from "@/store/userStore";
import { useEditUserMutate } from "@/hooks/editUserHook";

export default function UserInfo({ params }: { params: { email: string } }) {
  const router = useRouter();
  const userAuthenticated = userStore((state) => state.user);
  const [posts, setPosts] = useState<
    (TextPostWithUser | MediaPostWithUser)[] | undefined
  >(undefined);
  const [tabSelected, setTabSelected] = useState<string>("posts");
  const [nameEdited, setNameEdited] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<File[] | null>();
  const [imagePreview, setImagePreview] = useState<string | null>();
  const { mutate, isSuccess: userEditedSuccess } = useEditUserMutate();
  const [toggleEditPerfil, setToggleEditPerfil] = useState<boolean>(false);
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery<UserResponse>({
    queryKey: ["user-info"],

    queryFn: async () => {
      if (params.email) {
        return axios
          .get(`http://localhost:3333/users?email=${params.email}`)
          .then((response) => response.data);
      }
    },
  });

  const { data: allThePosts } = useQuery<
    (TextPostWithUser | MediaPostWithUser)[]
  >({
    queryKey: ["posts-info"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/post`)
        .then((response) => response.data);
    },
  });

  function onDropAvatarImage(acceptedFiles: File[]) {
    const file = acceptedFiles[0];
    setAvatarImage(acceptedFiles);
    setImagePreview(URL.createObjectURL(file));
  }

  const avatarImageUpload = useDropzone({
    onDrop: onDropAvatarImage,
    accept: {
      "image/*": [],
    },
  });

  function handleSetTabSelected(tabSelected: string) {
    setTabSelected(tabSelected);
  }

  function handleToggleSettingsForEditPerfil() {
    setToggleEditPerfil(true);
  }

  function handleEditPerfil() {
    mutate({
      data: {
        name: nameEdited,
      },
      file: avatarImage!,
    });
  }
  useEffect(() => {
    if (isSuccess && user && allThePosts) {
      const filteredPosts = allThePosts.filter(
        (post) => post.user_id === user.id
      );

      if (user && nameEdited!.length <= 0) {
        setNameEdited(user?.name);
      }

      if (filteredPosts.length > 0) {
        setPosts(filteredPosts);
      } else {
        setPosts(undefined);
      }
    }

    if (userEditedSuccess) {
      setToggleEditPerfil(false);
      setImagePreview("");
    }
  }, [isSuccess, user, allThePosts, userEditedSuccess]);

  return (
    <UserInfoContainer>
      <TopBar page="userInfo" />
      <UserWrapper>
        <UserContent>
          {isLoading && !user ? (
            <>
              <AvatarAndNameAndButtonsContainer>
                <AvatarAndNameContainer>
                  <SkeletonAvatar
                    width={6 * 16}
                    height={6 * 16}
                    variant="circular"
                  />
                  <SkeletonName
                    width={14 * 16}
                    height={3 * 16}
                    variant="text"
                  />
                </AvatarAndNameContainer>
                <PostsOrCommentsButtonsContainer>
                  <SkeletonButtons
                    width={4 * 16}
                    height={3 * 16}
                    variant="text"
                  />
                  <SkeletonButtons
                    width={4 * 16}
                    height={3 * 16}
                    variant="text"
                  />
                </PostsOrCommentsButtonsContainer>
              </AvatarAndNameAndButtonsContainer>
              <PostsOrCommentsContainer>
                <SkeletonContainer>
                  <ProfileContent>
                    <SkeletonAvatarNameAndCommunityContainer>
                      <SkeletonAvatar
                        width={6 * 16}
                        height={6 * 16}
                        variant="rectangular"
                      />
                      <SkeletonNameAndCommunityContainer>
                        <SkeletonName
                          width={14 * 16}
                          height={3 * 16}
                          variant="text"
                        />
                        <SkeletonCommunity
                          width={7 * 16}
                          height={2 * 16}
                          variant="text"
                        />
                      </SkeletonNameAndCommunityContainer>
                    </SkeletonAvatarNameAndCommunityContainer>
                  </ProfileContent>
                  <SkeletonContent height={5 * 16} variant="rectangular" />
                  <SkeletonCommentAndLikeContainer>
                    <SkeletonLike height={3 * 16} width={6 * 16} />
                    <SkeletonComment height={3 * 16} width={6 * 16} />
                  </SkeletonCommentAndLikeContainer>
                </SkeletonContainer>
              </PostsOrCommentsContainer>
            </>
          ) : (
            <>
              <AvatarAndNameAndButtonsContainer>
                <AvatarNameAndEditUserButtonContainer>
                  <AvatarAndNameContainer>
                    <>
                      {toggleEditPerfil === false ? (
                        <>
                          {user &&
                          user.avatar &&
                          user!.avatar?.includes(
                            "https://lh3.googleusercontent.com"
                          ) ? (
                            <AvatarImage
                              urlImg={
                                user!.avatar?.includes("https://lh3.")
                                  ? user!.avatar!
                                  : `http://localhost:3333/files/avatarImage/${user!
                                      .avatar!}`
                              }
                              avatarImgDimensions={6}
                            />
                          ) : (
                            <>
                              {user?.avatar === null ? (
                                <>
                                  <RxAvatar size={96} />
                                </>
                              ) : (
                                <>
                                  <AvatarImage
                                    urlImg={`http://localhost:3333/files/avatarImage/${user!
                                      .avatar!}`}
                                    avatarImgDimensions={6}
                                  />
                                </>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {user &&
                          user.avatar &&
                          user!.avatar?.includes(
                            "https://lh3.googleusercontent.com"
                          ) ? (
                            <>
                              {imagePreview ? (
                                <>
                                  <AvatarAndIconForUploadImageContainer
                                    {...avatarImageUpload.getRootProps()}
                                  >
                                    <AvatarImage
                                      urlImg={imagePreview!}
                                      avatarImgDimensions={6}
                                    />

                                    <button onClick={() => setImagePreview("")}>
                                      x
                                    </button>
                                  </AvatarAndIconForUploadImageContainer>
                                </>
                              ) : (
                                <>
                                  <AvatarAndIconForUploadImageContainer
                                    {...avatarImageUpload.getRootProps()}
                                  >
                                    <AvatarImage
                                      urlImg={user!.avatar!}
                                      avatarImgDimensions={6}
                                    />
                                    <MdFileUpload height={24} />
                                  </AvatarAndIconForUploadImageContainer>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {imagePreview ? (
                                <>
                                  <AvatarAndIconForUploadImageContainer
                                    {...avatarImageUpload.getRootProps()}
                                  >
                                    <AvatarImage
                                      urlImg={imagePreview!}
                                      avatarImgDimensions={6}
                                    />

                                    <button onClick={() => setImagePreview("")}>
                                      x
                                    </button>
                                  </AvatarAndIconForUploadImageContainer>
                                </>
                              ) : (
                                <>
                                  {user?.avatar === null ? (
                                    <AvatarWithoutImageAndIconForUploadImageContainer
                                      {...avatarImageUpload.getRootProps()}
                                    >
                                      <RxAvatar size={90} />
                                      <UploadIconSvg>
                                        <MdFileUpload height={24} />
                                      </UploadIconSvg>
                                    </AvatarWithoutImageAndIconForUploadImageContainer>
                                  ) : (
                                    <AvatarAndIconForUploadImageContainer
                                      {...avatarImageUpload.getRootProps()}
                                    >
                                      <AvatarImage
                                        urlImg={`http://localhost:3333/files/avatarImage/${user!
                                          .avatar!}`}
                                        avatarImgDimensions={6}
                                      />
                                      <MdFileUpload height={24} />
                                    </AvatarAndIconForUploadImageContainer>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>

                    <>
                      {toggleEditPerfil === false ? (
                        <InputOfNameContainer>
                          <h1>{user?.name}</h1>
                        </InputOfNameContainer>
                      ) : (
                        <InputOfNameContainer>
                          <input
                            type="text"
                            value={nameEdited}
                            onChange={(e) => setNameEdited(e.target.value)}
                          />
                        </InputOfNameContainer>
                      )}
                    </>
                  </AvatarAndNameContainer>

                  {userAuthenticated!.id === user!.id &&
                  toggleEditPerfil === false ? (
                    <EditUserInfoButton
                      onClick={() => handleToggleSettingsForEditPerfil()}
                    >
                      Editar Perfil
                    </EditUserInfoButton>
                  ) : (
                    <>
                      {userAuthenticated!.id === user!.id && (
                        <>
                          <EditUserInfoButton
                            onClick={() => handleEditPerfil()}
                          >
                            Salvar Alterações
                          </EditUserInfoButton>
                        </>
                      )}
                    </>
                  )}
                </AvatarNameAndEditUserButtonContainer>
                <PostsOrCommentsButtonsContainer>
                  <PostsButton
                    $variant={tabSelected}
                    onClick={() => handleSetTabSelected("posts")}
                  >
                    Posts
                  </PostsButton>
                  <CommentsButton
                    $variant={tabSelected}
                    onClick={() => handleSetTabSelected("comments")}
                  >
                    Comentários
                  </CommentsButton>
                </PostsOrCommentsButtonsContainer>
              </AvatarAndNameAndButtonsContainer>
              <PostsOrCommentsContainer>
                {tabSelected === "posts" ? (
                  <>
                    {posts && posts!.length >= 1 ? (
                      <>
                        {posts!.map((post) => (
                          <CardPost
                            post={post!}
                            largecard="true"
                            key={post.id}
                          />
                        ))}
                      </>
                    ) : (
                      <PostsDontFoundContainer>
                        Nenhum post publicado!
                      </PostsDontFoundContainer>
                    )}
                  </>
                ) : (
                  <>
                    {user && user!.comments!.length >= 1 ? (
                      <CommentsContainer>
                        {user.comments?.map((comment) => (
                          <CommentContainer key={comment.id}>
                            <CommentContent>
                              {comment.media_post_id ? (
                                <>
                                  <CommunityNameAndPostTitleContainer>
                                    <CommunityNameContainer
                                      onClick={() =>
                                        router.push(
                                          `/communityInfo/${
                                            comment!.text_post!.community.id
                                          }`
                                        )
                                      }
                                    >
                                      {comment.media_post?.community.name}
                                    </CommunityNameContainer>
                                    -
                                    <PostNameContainer
                                      onClick={() =>
                                        router.push(
                                          `/postInfo/${comment!.media_post!.id}`
                                        )
                                      }
                                    >
                                      {comment.media_post?.title}
                                    </PostNameContainer>
                                  </CommunityNameAndPostTitleContainer>

                                  <CommentContentContainer
                                    onClick={() =>
                                      router.push(
                                        `/postInfo/${comment!.media_post!.id}`
                                      )
                                    }
                                  >
                                    {comment.content}
                                  </CommentContentContainer>
                                </>
                              ) : (
                                <>
                                  <CommunityNameAndPostTitleContainer>
                                    <CommunityNameContainer
                                      onClick={() =>
                                        router.push(
                                          `/communityInfo/${
                                            comment!.text_post!.community.id
                                          }`
                                        )
                                      }
                                    >
                                      {comment.text_post?.community.name}
                                    </CommunityNameContainer>
                                    -
                                    <PostNameContainer
                                      onClick={() =>
                                        router.push(
                                          `/postInfo/${comment!.text_post!.id}`
                                        )
                                      }
                                    >
                                      {comment.text_post?.title}
                                    </PostNameContainer>
                                  </CommunityNameAndPostTitleContainer>
                                  <CommentContentContainer
                                    onClick={() =>
                                      router.push(
                                        `/postInfo/${comment!.text_post!.id}`
                                      )
                                    }
                                  >
                                    {comment.content}
                                  </CommentContentContainer>
                                </>
                              )}
                            </CommentContent>
                          </CommentContainer>
                        ))}
                      </CommentsContainer>
                    ) : (
                      <CommentsDontFoundContainer>
                        Nenhum comentário feito!
                      </CommentsDontFoundContainer>
                    )}
                  </>
                )}
              </PostsOrCommentsContainer>
            </>
          )}
        </UserContent>
      </UserWrapper>
    </UserInfoContainer>
  );
}
