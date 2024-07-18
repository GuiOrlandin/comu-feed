import {
  LoveWithUser,
  MediaPostWithUser,
  TextPostWithUser,
} from "@/app/home/page";
import {
  CommentsImageAndLength,
  LoveAndCommentContainer,
  LoveImageAndLength,
} from "./style";

import { TiHeartFullOutline } from "react-icons/ti";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useDeleteLoveMutate } from "@/hooks/deleteLove";
import { useCreateLoveMutate } from "@/hooks/createLove";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { emailStore } from "@/store/emailStore";
import { tokenStore } from "@/store/tokenStore";

interface LikeAndComments {
  post: TextPostWithUser | MediaPostWithUser;
}

export default function LikeAndComments({ post }: LikeAndComments) {
  const [loveIdToDelete, setLoveIdToDelete] = useState("");
  const removeUser = userStore((state) => state.removeUser);
  const router = useRouter();
  const user = userStore((state) => state.user);
  const removeEmail = emailStore((state) => state.removeEmail);
  const removeToken = tokenStore((state) => state.removeToken);

  const {
    mutate: deleteLoveMutate,
    isSuccess: deleteLoveIsSuccess,
    error,
  } = useDeleteLoveMutate();
  const { mutate, isSuccess, error: createLoveError } = useCreateLoveMutate();

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

  function handleDislikePost() {
    deleteLoveMutate(loveIdToDelete);
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

  useEffect(() => {
    if (deleteLoveIsSuccess) {
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

    if (
      error?.message === "Request failed with status code 401" ||
      createLoveError?.message === "Request failed with status code 401"
    ) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("storeToken");
        localStorage.removeItem("storeEmail");
      }
      removeUser();
      removeEmail();
      removeToken();

      router.refresh();
    }
  }, [error, createLoveError, deleteLoveIsSuccess]);

  useEffect(() => {
    if (post && post.love && user) {
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
  }, [isSuccess, post, user]);

  return (
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
              {post.love &&
                (post!.love!.length <= 1 ? (
                  <p>{post!.love!.length} curtida</p>
                ) : (
                  <p> {post!.love!.length} curtidas</p>
                ))}
            </LoveImageAndLength>
          ) : (
            <LoveImageAndLength>
              <TiHeartFullOutline
                color="#CB4444"
                fill="#CB4444"
                size={25}
                onClick={() => handleDislikePost()}
              />
              {post.love &&
                (post.love!.length <= 1 ? (
                  <p>{post.love!.length} curtida</p>
                ) : (
                  <p> {post.love!.length} curtidas</p>
                ))}
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
              {post.love &&
                (post!.love!.length <= 1 ? (
                  <p>{post!.love!.length} curtida</p>
                ) : (
                  <p> {post!.love!.length} curtidas</p>
                ))}
            </LoveImageAndLength>
          ) : (
            <LoveImageAndLength>
              <CiHeart
                color="#CB4444"
                size={25}
                onClick={() => handleLikePost(post.id, "mediaPost")}
              />
              {post.love &&
                (post.love!.length <= 1 ? (
                  <p>{post.love!.length} curtida</p>
                ) : (
                  <p> {post.love!.length} curtidas</p>
                ))}
            </LoveImageAndLength>
          )}
        </>
      )}
      <LoveAndCommentContainer>
        <CommentsImageAndLength
          onClick={() => router.push(`/postInfo/${post.id}`)}
        >
          <FaRegCommentAlt color="#CB4444" size={18} />
          {post.comments &&
            (post.comments!.length <= 1 ? (
              <p>{post.comments!.length} comentário</p>
            ) : (
              <p> {post.comments!.length} comentários</p>
            ))}
        </CommentsImageAndLength>
      </LoveAndCommentContainer>
    </LoveAndCommentContainer>
  );
}
