"use client";

import TopBar from "@/app/components/topBar";
import * as Dialog from "@radix-ui/react-dialog";

import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import { MediaPostWithUser, TextPostWithUser } from "@/app/home/page";
import axios from "axios";
import {
  CommentsImageAndLength,
  LoveImageAndLength,
} from "@/app/components/cardPost/styles";
import { useEffect, useState } from "react";
import {
  CreateCommentDetails,
  useCreateCommentMutate,
} from "@/hooks/createComment";
import AvatarImage from "@/app/components/avatarImg";

import {
  AvatarContentInComment,
  AvatarContentWithoutImage,
  ButtonsOfDialogContainer,
  CancelButton,
  CommentsAndCreateCommentContainer,
  CommentsContainer,
  ConfirmButton,
  Content,
  ContentOfPost,
  ContentOfPostWithMedia,
  DialogClose,
  DialogDeleteCommentContainer,
  DialogDeleteTriggerButton,
  DialogTitle,
  DialogTrigger,
  LoveAndCommentContainer,
  NameAndCommunity,
  NameAndContentOfComment,
  PostContainer,
  PostInfoContainer,
  PostWrapper,
  ProfileContent,
  SendCommentButton,
} from "./styles";
import { Overlay } from "@/app/components/createPostModal/styles";
import { tokenStore } from "@/store/tokenStore";
import { userStore } from "@/store/userStore";

export default function PostInfo({ params }: { params: { id: string } }) {
  const { mutate, isSuccess } = useCreateCommentMutate();
  const authToken = tokenStore((state) => state.token);
  const user = userStore((state) => state.user);
  const [commentContent, setCommentContent] = useState("");
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [createCommentDetails, setCreateCommentDetails] =
    useState<CreateCommentDetails>({
      content: "",
    });
  const {
    data: post,
    refetch,
    isLoading,
  } = useQuery<TextPostWithUser | MediaPostWithUser>({
    queryKey: ["posts-info"],

    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/post/${params.id}`)
        .then((response) => response.data);
    },
  });

  const { refetch: deleteCommentRefetch, isSuccess: deleteCommentIsSuccess } =
    useQuery({
      queryKey: ["delete-comment"],
      enabled: false,

      queryFn: async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        return axios
          .delete(`http://localhost:3333/comment/${postIdToDelete}`, config)
          .then((response) => response.data);
      },
    });

  function isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  function handleChangeCommentContent(
    value: string,
    postType: string,
    postId: string
  ) {
    if (postType === "text_post_id") {
      return setCreateCommentDetails({
        content: value,
        text_post_id: postId,
        media_post_id: null,
      });
    } else {
      return setCreateCommentDetails({
        content: value,
        media_post_id: postId,
        text_post_id: null,
      });
    }
  }

  function handleCreateComment() {
    mutate({ data: createCommentDetails });
  }
  function handleDeleteComment(postId: string) {
    console.log(postId);
    setPostIdToDelete(postId);

    deleteCommentRefetch();
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setCommentContent("");
    }

    if (deleteCommentIsSuccess) {
      refetch();
    }
  }, [isSuccess, deleteCommentIsSuccess]);


  return (
    <PostInfoContainer>
      <TopBar page="postInfo" />
      {isLoading ? (
        <>test</>
      ) : (
        <PostWrapper>
          <PostContainer>
            <ProfileContent>
              <AvatarContentWithoutImage>
                {post!.user?.avatar === null ? (
                  <AvatarContentWithoutImage>
                    <RxAvatar size={60} />
                  </AvatarContentWithoutImage>
                ) : (
                  <AvatarImage
                    urlImg={`http://localhost:3333/files/avatarImage/${
                      post!.user?.avatar
                    }`}
                    avatarImgDimensions={6}
                  />
                )}
              </AvatarContentWithoutImage>
              <NameAndCommunity>
                <h2>{post?.user?.name}</h2>
                <span>{post?.community?.name}</span>
              </NameAndCommunity>
            </ProfileContent>
            <ContentOfPost>
              {"content" in post! ? (
                <>
                  <p>{post.content}</p>
                </>
              ) : isImage(post!.media) ? (
                <Image
                  src={`http://localhost:3333/files/${post!.media}`}
                  width={16 * 16}
                  height={9 * 16}
                  alt="Media content"
                />
              ) : (
                <ContentOfPostWithMedia>
                  <video
                    src={`http://localhost:3333/files/${post!.media}`}
                    controls
                    height={30 * 16}
                    width={54 * 16}
                  />
                </ContentOfPostWithMedia>
              )}
            </ContentOfPost>
            <LoveAndCommentContainer>
              <LoveImageAndLength>
                <CiHeart color="#CB4444" size={25} />
                {post!.love.length <= 1 ? (
                  <p>{post!.love.length} curtida</p>
                ) : (
                  <p> {post!.love.length} curtidas</p>
                )}
              </LoveImageAndLength>
              <CommentsImageAndLength>
                <FaRegCommentAlt color="#CB4444" size={18} />
                {post!.comments!.length <= 1 ? (
                  <p>{post!.comments!.length} comentário</p>
                ) : (
                  <p> {post!.comments!.length} comentários</p>
                )}
              </CommentsImageAndLength>
            </LoveAndCommentContainer>
            <CommentsAndCreateCommentContainer>
              {"content" in post! ? (
                <>
                  <textarea
                    placeholder="Digite seu comentário"
                    value={commentContent}
                    onChange={(event) => {
                      setCommentContent(event.target.value);
                      handleChangeCommentContent(
                        event.target.value,
                        "text_post_id",
                        post.id
                      );
                    }}
                  />
                </>
              ) : (
                <>
                  <textarea
                    placeholder="Digite seu comentário"
                    value={commentContent}
                    onChange={(event) => {
                      setCommentContent(event.target.value);
                      handleChangeCommentContent(
                        event.target.value,
                        "media_post_id",
                        post!.id
                      );
                    }}
                  />
                </>
              )}

              <SendCommentButton onClick={() => handleCreateComment()}>
                Enviar
              </SendCommentButton>
              {post!.comments!.length > 0 &&
                post?.comments?.map((comment) => (
                  <CommentsContainer key={comment.content}>
                    <ProfileContent>
                      <AvatarContentInComment>
                        {comment!.user?.avatar === null ? (
                          <AvatarContentWithoutImage>
                            <RxAvatar size={44} />
                          </AvatarContentWithoutImage>
                        ) : (
                          <AvatarImage
                            urlImg={`http://localhost:3333/files/avatarImage/${
                              comment!.user?.avatar
                            }`}
                            avatarImgDimensions={2.8}
                          />
                        )}
                      </AvatarContentInComment>
                      <NameAndContentOfComment>
                        <h2>{comment?.user?.name}</h2>
                        <p>{comment.content}</p>
                      </NameAndContentOfComment>
                    </ProfileContent>
                    {user && comment.user.id === user.id && (
                      <Dialog.Root>
                        <DialogTrigger asChild>
                          <DialogDeleteTriggerButton>
                            X
                          </DialogDeleteTriggerButton>
                        </DialogTrigger>
                        <Dialog.Portal>
                          <Overlay />
                          <Content>
                            <DialogTitle>
                              Você deseja deletar o comentário?
                            </DialogTitle>
                            <DialogDeleteCommentContainer>
                              <ButtonsOfDialogContainer>
                                <ConfirmButton
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                >
                                  Confirmar
                                </ConfirmButton>
                                <CancelButton>Cancelar</CancelButton>
                              </ButtonsOfDialogContainer>
                            </DialogDeleteCommentContainer>
                          </Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                    )}
                  </CommentsContainer>
                ))}
            </CommentsAndCreateCommentContainer>
          </PostContainer>
        </PostWrapper>
      )}
    </PostInfoContainer>
  );
}
