"use client";

import TopBar from "@/app/components/topBar";
import {
  AvatarContentInComment,
  AvatarContentWithoutImage,
  CommentsAndCreateCommentContainer,
  CommentsContainer,
  ContentOfPost,
  ContentOfPostWithMedia,
  LoveAndCommentContainer,
  NameAndCommunity,
  NameAndContentOfComment,
  PostContainer,
  PostInfoContainer,
  PostWrapper,
  ProfileContent,
  SendCommentButton,
} from "./styles";
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
import { ChangeEvent, useEffect, useState } from "react";
import {
  CreateCommentDetails,
  useCreateCommentMutate,
} from "@/hooks/createComment";
import AvatarImage from "@/app/components/avatarImg";

export default function PostInfo({ params }: { params: { id: string } }) {
  const { mutate, isSuccess } = useCreateCommentMutate();
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

  function isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  function handleChangeCommentContent(
    event: ChangeEvent<HTMLTextAreaElement>,
    postType: string,
    postId: string
  ) {
    const { value } = event.target;

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

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

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
                    onChange={(value) =>
                      handleChangeCommentContent(value, "text_post_id", post.id)
                    }
                  />
                </>
              ) : (
                <>
                  <textarea
                    placeholder="Digite seu comentário"
                    onChange={(value) =>
                      handleChangeCommentContent(
                        value,
                        "media_post_id",
                        post!.id
                      )
                    }
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
                  </CommentsContainer>
                ))}
            </CommentsAndCreateCommentContainer>
          </PostContainer>
        </PostWrapper>
      )}
    </PostInfoContainer>
  );
}
