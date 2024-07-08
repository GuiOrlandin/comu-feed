import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  LoveWithUser,
  MediaPostWithUser,
  TextPostWithUser,
} from "@/app/home/page";

import { RxAvatar } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";

import {
  AvatarContentWithoutImage,
  CommentsImageAndLength,
  ContentOfPost,
  ContentOfPostWithMedia,
  LoveAndCommentContainer,
  LoveImageAndLength,
  NameAndCommunity,
  PostCardContainer,
  ProfileContent,
} from "./styles";
import { useCreateLoveMutate } from "@/hooks/createLove";
import { userStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { useDeleteLoveMutate } from "@/hooks/deleteLove";

interface CardPostProps {
  post: TextPostWithUser | MediaPostWithUser;
  largeCard?: boolean;
  refetchPost?: () => void;
}

export default function CardPost({
  post,
  refetchPost,
  largeCard,
}: CardPostProps) {
  const router = useRouter();
  const user = userStore((state) => state.user);
  const removeUser = userStore((state) => state.removeUser);

  const [loveIdToDelete, setLoveIdToDelete] = useState("");
  const [loveInfo, setLoveInfo] = useState<LoveWithUser>({
    id: "",
    media_post_id: "",
    text_post_id: "",
    user: {
      avatar: "",
      id: "",
      name: "",
    },
  });
  const { mutate, isSuccess, error: createLoveError } = useCreateLoveMutate();
  const {
    mutate: deleteLoveMutate,
    isSuccess: deleteLoveIsSuccess,
    error,
  } = useDeleteLoveMutate();

  function isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  function handleLikePost(postId: string, postType: string) {
    if (postType === "textPost") {
      return mutate({
        data: {
          media_post_id: "",
          text_post_id: postId,
        },
      });
    } else {
      mutate({
        data: {
          media_post_id: postId,
          text_post_id: "",
        },
      });
    }
  }
  function handleDislikePost() {
    deleteLoveMutate(loveIdToDelete);
  }

  useEffect(() => {
    if (
      error?.message === "Request failed with status code 401" ||
      createLoveError?.message === "Request failed with status code 401"
    ) {
      removeUser();
    }

    if (isSuccess || deleteLoveIsSuccess) {
      refetchPost!();
    }
    if (deleteLoveIsSuccess) {
      refetchPost!();
      setLoveInfo({
        id: "",
        media_post_id: "",
        text_post_id: "",
        user: {
          avatar: "",
          id: "",
          name: "",
        },
      });

      setLoveIdToDelete("");
    }

    if (post && user) {
      const loveInfoFound = post!.love!.find(
        (love) => love.user.id === user.id
      );

      if (loveInfoFound) {
        setLoveInfo(loveInfoFound!);
        setLoveIdToDelete(loveInfoFound!.id);
      } else {
        setLoveInfo({
          id: "",
          media_post_id: "",
          text_post_id: "",
          user: {
            avatar: "",
            id: "",
            name: "",
          },
        });
      }
    }
  }, [isSuccess, post, deleteLoveIsSuccess, user]);

  return (
    <PostCardContainer largeCard={largeCard!}>
      <ProfileContent>
        {post.user?.avatar === null ? (
          <AvatarContentWithoutImage>
            <RxAvatar size={60} />
          </AvatarContentWithoutImage>
        ) : (
          <Image
            src={`http://localhost:3333/files/avatarImage/${post.user?.avatar}`}
            width={4 * 16}
            height={4 * 16}
            alt="Picture of the author"
          />
        )}

        <NameAndCommunity>
          <h2>{post.user?.name}</h2>
          <span>{post.community?.name}</span>
        </NameAndCommunity>
      </ProfileContent>
      <ContentOfPost
        largeCard={largeCard!}
        onClick={() => router.push(`/postInfo/${post.id}`)}
      >
        {"content" in post ? (
          <>
            <p>{post.content}</p>
          </>
        ) : isImage(post.media) ? (
          <Image
            src={`http://localhost:3333/files/${post.media}`}
            width={20 * 16}
            height={12 * 16}
            alt="Media content"
          />
        ) : (
          <ContentOfPostWithMedia>
            <video
              src={`http://localhost:3333/files/${post.media}`}
              width={20 * 16}
              height={12 * 16}
              controls
            />
          </ContentOfPostWithMedia>
        )}
      </ContentOfPost>
      <LoveAndCommentContainer>
        {loveInfo.id !== "" ? (
          <>
            {"content" in post ? (
              <LoveImageAndLength>
                <TiHeartFullOutline
                  fill="#CB4444"
                  size={25}
                  onClick={() => handleDislikePost()}
                />
                {post!.love!.length <= 1 ? (
                  <p>{post!.love!.length} curtida</p>
                ) : (
                  <p> {post!.love!.length} curtidas</p>
                )}
              </LoveImageAndLength>
            ) : (
              <LoveImageAndLength>
                <TiHeartFullOutline
                  color="#CB4444"
                  fill="#CB4444"
                  size={25}
                  onClick={() => handleDislikePost()}
                />
                {post.love.length <= 1 ? (
                  <p>{post.love.length} curtida</p>
                ) : (
                  <p> {post.love.length} curtidas</p>
                )}
              </LoveImageAndLength>
            )}
          </>
        ) : (
          <>
            {"content" in post ? (
              <LoveImageAndLength>
                <CiHeart
                  color="#CB4444"
                  size={25}
                  onClick={() => handleLikePost(post.id, "textPost")}
                />
                {post!.love!.length <= 1 ? (
                  <p>{post!.love!.length} curtida</p>
                ) : (
                  <p> {post!.love!.length} curtidas</p>
                )}
              </LoveImageAndLength>
            ) : (
              <LoveImageAndLength>
                <CiHeart
                  color="#CB4444"
                  size={25}
                  onClick={() => handleLikePost(post.id, "mediaPost")}
                />
                {post.love.length <= 1 ? (
                  <p>{post.love.length} curtida</p>
                ) : (
                  <p> {post.love.length} curtidas</p>
                )}
              </LoveImageAndLength>
            )}
          </>
        )}

        <CommentsImageAndLength
          onClick={() => router.push(`/postInfo/${post.id}`)}
        >
          <FaRegCommentAlt color="#CB4444" size={18} />
          {post.comments!.length <= 1 ? (
            <p>{post.comments!.length} comentário</p>
          ) : (
            <p> {post.comments!.length} comentários</p>
          )}
        </CommentsImageAndLength>
      </LoveAndCommentContainer>
    </PostCardContainer>
  );
}
