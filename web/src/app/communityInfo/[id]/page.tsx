"use client";

import TopBar from "@/app/components/topBar";
import {
  CommunityAvatarWithoutImage,
  CommunityInfoContainer,
  CommunityInfoContent,
  CommunitySkeleton,
  NameAndDescription,
  PostAndCommunityInfoContainer,
  PostAndCommunityWrapper,
  PostsOfCommunityContainer,
} from "./styles";
import { MediaPostWithUser, TextPostWithUser } from "@/app/home/page";
import { RxAvatar } from "react-icons/rx";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AvatarImage from "@/app/components/avatarImg";
import CardPost from "@/app/components/cardPost";
import {
  SkeletonAvatarNameAndCommunityContainer,
  SkeletonComment,
  SkeletonCommentAndLikeContainer,
  SkeletonContainer,
  SkeletonLike,
  SkeletonNameAndCommunityContainer,
} from "@/app/news/styles";
import {
  SkeletonAvatar,
  SkeletonCommunity,
  SkeletonContent,
  SkeletonName,
} from "@/app/components/cardPostWithSkeleton/styles";
import { ProfileContent } from "@/app/components/cardPost/styles";

export interface CommunityResponse {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  founder_id: string;
  community_image: string;
  allPosts: (TextPostWithUser | MediaPostWithUser)[];
}

export default function CommunityInfo({ params }: { params: { id: string } }) {
  const { data: communityInfo, isLoading } = useQuery<CommunityResponse>({
    queryKey: ["community-info"],

    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/community/${params.id}`)
        .then((response) => response.data);
    },
  });

  return (
    <CommunityInfoContainer>
      <TopBar page="communityInfo" />
      <PostAndCommunityWrapper>
        <PostAndCommunityInfoContainer>
          {isLoading ? (
            <>
              <CommunitySkeleton>
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
              </CommunitySkeleton>

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
            </>
          ) : (
            <>
              <CommunityInfoContent>
                {communityInfo?.community_image === null ? (
                  <CommunityAvatarWithoutImage>
                    <RxAvatar size={60} />
                  </CommunityAvatarWithoutImage>
                ) : (
                  <AvatarImage
                    avatarImgDimensions={4}
                    urlImg={`http://localhost:3333/files/communityImage/${communityInfo?.community_image}`}
                  />
                )}
                <NameAndDescription>
                  <h1>{communityInfo?.name}</h1>
                  <h2>{communityInfo?.description}</h2>
                </NameAndDescription>
              </CommunityInfoContent>
              <PostsOfCommunityContainer>
                {communityInfo?.allPosts.map((post) => (
                  <CardPost key={post.id} post={post} largecard={"true"} />
                ))}
              </PostsOfCommunityContainer>
            </>
          )}
        </PostAndCommunityInfoContainer>
      </PostAndCommunityWrapper>
    </CommunityInfoContainer>
  );
}
