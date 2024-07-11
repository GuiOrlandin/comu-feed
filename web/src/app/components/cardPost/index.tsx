import Image from "next/image";
import { useRouter } from "next/navigation";

import { MediaPostWithUser, TextPostWithUser } from "@/app/home/page";

import { RxAvatar } from "react-icons/rx";

import {
  AvatarContentWithoutImage,
  ContentOfPost,
  ContentOfPostWithMedia,
  NameAndCommunity,
  NameCommunityAndAvatarContainer,
  PostCardContainer,
  ProfileContent,
} from "./styles";
import AvatarImage from "../avatarImg";
import LikeAndComments from "../likeAndComments";
import DeleteDialog from "../deleteDialog";
import { useDeletePostMutate } from "@/hooks/deletePost";
import { userStore } from "@/store/userStore";

interface CardPostProps {
  post: TextPostWithUser | MediaPostWithUser;
  largecard?: string;
  founder_id?: string;
  page?: string;
}

export default function CardPost({
  post,
  largecard,
  page,
  founder_id,
}: CardPostProps) {
  const router = useRouter();
  const user = userStore((state) => state.user);

  const { mutate } = useDeletePostMutate();

  function isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  console.log(post);
  return (
    <PostCardContainer $largecard={largecard!}>
      <ProfileContent>
        <NameCommunityAndAvatarContainer>
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
        </NameCommunityAndAvatarContainer>
        {page !== "home" && (
          <>
            {(user.id === post.user_id || founder_id === post.user_id) && (
              <DeleteDialog
                title="Deseja deletar o post?"
                handleDeleteAction={() => mutate(post.id)}
                deleteButtonText="X"
              />
            )}
          </>
        )}
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
