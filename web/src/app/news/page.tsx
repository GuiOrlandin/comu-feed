"use client";

import { useQuery } from "@tanstack/react-query";

import TopBar from "../components/topBar";
import { MediaPostWithUser, TextPostWithUser } from "../home/page";

import {
  NewsContainer,
  NewsContent,
  NewsWrapper,
  SkeletonAvatarNameAndCommunityContainer,
  SkeletonComment,
  SkeletonCommentAndLikeContainer,
  SkeletonContainer,
  SkeletonLike,
  SkeletonNameAndCommunityContainer,
} from "./styles";
import axios from "axios";
import CardPost from "../components/cardPost";
import { ProfileContent } from "../components/cardPost/styles";
import {
  SkeletonAvatar,
  SkeletonCommunity,
  SkeletonContent,
  SkeletonName,
} from "../components/cardPostWithSkeleton/styles";

export default function News() {
  const {
    data: posts,
    refetch,
    isLoading,
  } = useQuery<(TextPostWithUser | MediaPostWithUser)[]>({
    queryKey: ["posts-info"],

    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/post`)
        .then((response) => response.data);
    },
  });

  return (
    <NewsContainer>
      <TopBar page="news" />
      {isLoading ? (
        <NewsWrapper>
          <NewsContent>
            {[...Array(3)].map((_, index) => (
              <SkeletonContainer key={index}>
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
            ))}
          </NewsContent>
        </NewsWrapper>
      ) : (
        <NewsWrapper>
          <NewsContent>
            {posts && posts!.length > 0 ? (
              posts!.map((post) => (
                <CardPost key={post.id} largecard={"true"} post={post} />
              ))
            ) : (
              <div>Nenhum post disponível</div>
            )}
          </NewsContent>
        </NewsWrapper>
      )}
    </NewsContainer>
  );
}
