import Image from "next/image";
import { useRouter } from "next/navigation";

import { MediaPostWithUser, TextPostWithUser } from "@/app/home/page";

import { RxAvatar } from "react-icons/rx";

import {
  AvatarContentWithoutImage,
  ContentOfPost,
  ContentOfPostWithMedia,
  NameAndCommunity,
  PostCardContainer,
  ProfileContent,
} from "./styles";
import AvatarImage from "../avatarImg";
import LikeAndComments from "../likeAndComments";

interface CardPostProps {
  post: TextPostWithUser | MediaPostWithUser;
  largecard?: string;
}

export default function CardPost({ post, largecard }: CardPostProps) {
  const router = useRouter();

  function isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  return (
    <PostCardContainer $largecard={largecard!}>
      <ProfileContent>
        {post.user?.avatar === null ? (
          <AvatarContentWithoutImage>
            <RxAvatar size={60} />
          </AvatarContentWithoutImage>
        ) : (
          <AvatarImage
            avatarImgDimensions={4}
            urlImg={`http://localhost:3333/files/avatarImage/${post.user?.avatar}`}
          />
        )}

        <NameAndCommunity>
          <h2>{post.user?.name}</h2>
          <span
            onClick={() => router.push(`/communityInfo/${post.community_id}`)}
          >
            {post.community?.name}
          </span>
        </NameAndCommunity>
      </ProfileContent>
      <ContentOfPost
        $largecard={largecard!}
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
      <LikeAndComments post={post} />
    </PostCardContainer>
  );
}
