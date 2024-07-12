"use client";

import axios from "axios";

import TopBar from "@/app/components/topBar";
import * as Dialog from "@radix-ui/react-dialog";

import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

import { useQuery } from "@tanstack/react-query";
import { MediaPostWithUser, TextPostWithUser } from "@/app/home/page";

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
  DialogDeleteCommentContainer,
  DialogDeleteTriggerButton,
  DialogTitle,
  DialogTrigger,
  NameAndCommunity,
  NameAndContentOfComment,
  NameCommunityAndAvatar,
  PostContainer,
  PostInfoContainer,
  PostWrapper,
  ProfileContent,
  SendCommentButton,
  SkeletonAvatarNameAndCommunityContainer,
  SkeletonComment,
  SkeletonCommentAndLikeContainer,
  SkeletonContainer,
  SkeletonLike,
  SkeletonNameAndCommunityContainer,
  TitleAndContentOfPost,
} from "./styles";

import { userStore } from "@/store/userStore";
import {
  SkeletonAvatar,
  SkeletonCommunity,
  SkeletonContent,
  SkeletonName,
} from "@/app/components/cardPostWithSkeleton/styles";
import { Overlay } from "@/app/components/createPostAndCommunityModal/styles";
import LikeAndComments from "@/app/components/likeAndComments";
import { useDeleteCommentMutate } from "@/hooks/deleteComment";
import { useRouter } from "next/navigation";
import DeleteDialog from "@/app/components/deleteDialog";
import { useDeletePostMutate } from "@/hooks/deletePost";

export default function PostInfo({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { mutate, isSuccess } = useCreateCommentMutate();
  const user = userStore((state) => state.user);
  const [commentContent, setCommentContent] = useState<string>();
  const [createCommentDetails, setCreateCommentDetails] =
    useState<CreateCommentDetails>();

  const { data: post, isLoading } = useQuery<
    TextPostWithUser | MediaPostWithUser
  >({
    queryKey: ["post-info"],

    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/post/${params.id}`)
        .then((response) => response.data);
    },
  });

  const { mutate: deleteComment } = useDeleteCommentMutate();
  const { mutate: deletePost, isSuccess: postDeletedSuccessfully } =
    useDeletePostMutate();

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
    mutate({ data: createCommentDetails! });
  }
  function handleDeleteComment(postId: string) {
    deleteComment(postId);
  }

  useEffect(() => {
    if (isSuccess) {
      setCommentContent("");
    }

    if (postDeletedSuccessfully) {
      router.push("/");
    }
  }, [isSuccess, postDeletedSuccessfully]);

  return (
    <PostInfoContainer>
      <TopBar page="postInfo" />
      {isLoading ? (
        <PostWrapper>
          <PostContainer>
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
          </PostContainer>
        </PostWrapper>
      ) : (
        <PostWrapper>
          <PostContainer>
            <ProfileContent>
              <NameCommunityAndAvatar>
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
                  <span
                    onClick={() =>
                      router.push(`/communityInfo/${post!.community_id}`)
                    }
                  >
                    {post?.community?.name}
                  </span>
                </NameAndCommunity>
              </NameCommunityAndAvatar>
              {user.id === post?.user_id && (
                <DeleteDialog
                  deleteButtonText="Deletar"
                  handleDeleteAction={() => deletePost(post.id)}
                  title="Deseja deletar o post?"
                />
              )}
            </ProfileContent>
            <ContentOfPost>
              {"content" in post! ? (
                <TitleAndContentOfPost>
                  <h1>{post.title}</h1>
                  <p>{post.content}</p>
                </TitleAndContentOfPost>
              ) : isImage(post!.media) ? (
                <TitleAndContentOfPost>
                  <h1>{post!.title}</h1>
                  <span>{post!.description}</span>
                  <Image
                    src={`http://localhost:3333/files/${post!.media}`}
                    width={54 * 16}
                    height={37 * 16}
                    alt="Media content"
                  />
                </TitleAndContentOfPost>
              ) : (
                <ContentOfPostWithMedia>
                  <TitleAndContentOfPost>
                    <h1>{post!.title}</h1>
                    <span>{post!.description}</span>
                    <video
                      src={`http://localhost:3333/files/${post!.media}`}
                      controls
                      height={30 * 16}
                      width={54 * 16}
                    />
                  </TitleAndContentOfPost>
                </ContentOfPostWithMedia>
              )}
            </ContentOfPost>
            <LikeAndComments post={post!} />
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

              <SendCommentButton
                disabled={user!.id === "" ? true : false}
                onClick={() => handleCreateComment()}
              >
                Enviar
              </SendCommentButton>
              {post?.comments &&
                post!.comments!.length > 0 &&
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
