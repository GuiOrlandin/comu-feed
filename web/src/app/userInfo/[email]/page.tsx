"use client";

import TopBar, { UserResponse } from "@/app/components/topBar";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import {
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
} from "./styles";
import AvatarImage from "@/app/components/avatarImg";
import { RxAvatar } from "react-icons/rx";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
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

export default function UserInfo({ params }: { params: { email: string } }) {
  const router = useRouter();
  const userAuthenticated = userStore((state) => state.user);
  const [posts, setPosts] = useState<
    (TextPostWithUser | MediaPostWithUser)[] | undefined
  >();
  const [tabSelected, setTabSelected] = useState<string>("posts");
  const { data: user, isLoading } = useQuery<UserResponse>({
    queryKey: ["user-info"],

    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/users?email=${params.email}`)
        .then((response) => response.data);
    },
  });

  const { data: allThePosts, isLoading: allThePostsLoading } = useQuery<
    (TextPostWithUser | MediaPostWithUser)[]
  >({
    queryKey: ["posts-info"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/post`)
        .then((response) => response.data);
    },
  });

  useEffect(() => {
    if (allThePosts) {
      const allPosts = allThePosts.filter(
        (posts) => posts.user_id === user?.id
      );

      setPosts(allPosts);
    }
  }, [allThePosts]);

  function handleSetTabSelected(tabSelected: string) {
    setTabSelected(tabSelected);
  }

  return (
    <UserInfoContainer>
      <TopBar page="userInfo" />
      <UserWrapper>
        <UserContent>
          {isLoading ? (
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
                    {user?.avatar === null ? (
                      <>
                        <RxAvatar size={96} color="" />
                      </>
                    ) : (
                      <>
                        {user!.avatar?.includes(
                          "https://lh3.googleusercontent.com"
                        ) ? (
                          <AvatarImage
                            urlImg={user!.avatar}
                            avatarImgDimensions={6}
                          />
                        ) : (
                          <AvatarImage
                            urlImg={`http://localhost:3333/files/avatarImage/${user!
                              .avatar!}`}
                            avatarImgDimensions={6}
                          />
                        )}
                      </>
                    )}
                    <h1>{user?.name}</h1>
                  </AvatarAndNameContainer>

                  {userAuthenticated!.id === user!.id && (
                    <EditUserInfoButton>Editar Perfil</EditUserInfoButton>
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
