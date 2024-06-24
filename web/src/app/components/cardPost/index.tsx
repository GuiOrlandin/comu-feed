import Image from "next/image";
import { MediaPostWithUser, TextPostWithUser } from "@/app/home/page";
import { RxAvatar } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";

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

interface CardPostProps {
  post: TextPostWithUser | MediaPostWithUser;
}

export default function CardPost({ post }: CardPostProps) {
  function isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  return (
    <PostCardContainer>
      <ProfileContent>
        {post.user?.avatar === null ? (
          <AvatarContentWithoutImage>
            <RxAvatar size={60} />
          </AvatarContentWithoutImage>
        ) : (
          <Image
            src={`http://localhost:3333/files/avatarImage/${post.user?.avatar}`}
            width={6 * 16}
            height={6 * 16}
            alt="Picture of the author"
          />
        )}

        <NameAndCommunity>
          <h2>{post.user?.name}</h2>
          <span>{post.community?.name}</span>
        </NameAndCommunity>
      </ProfileContent>
      <ContentOfPost>
        {"content" in post ? (
          <>
            <p>{post.content}</p>
          </>
        ) : isImage(post.media) ? (
          <Image
            src={`http://localhost:3333/files/${post.media}`}
            width={16 * 16}
            height={9 * 16}
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
        <LoveImageAndLength>
          <CiHeart color="#CB4444" size={25} />
          {post.love.length <= 1 ? (
            <p>{post.love.length} curtida</p>
          ) : (
            <p> {post.love.length} curtidas</p>
          )}
        </LoveImageAndLength>
        <CommentsImageAndLength>
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
