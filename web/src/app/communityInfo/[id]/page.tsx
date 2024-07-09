"use client";

import TopBar from "@/app/components/topBar";
import {
  CommunityInfoContainer,
  CommunityInfoContent,
  NameAndDescription,
  PostAndCommunityInfoContainer,
  PostAndCommunityWrapper,
  PostsOfCommunityContainer,
} from "./styles";
import { MediaPostWithUser, TextPostWithUser } from "@/app/home/page";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AvatarImage from "@/app/components/avatarImg";
import CardPost from "@/app/components/cardPost";

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
            <>a</>
          ) : (
            <>
              <CommunityInfoContent>
                <AvatarImage
                  urlImg={`http://localhost:3333/files/communityImage/${
                    communityInfo!.community_image
                  }`}
                  avatarImgDimensions={6}
                />
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
