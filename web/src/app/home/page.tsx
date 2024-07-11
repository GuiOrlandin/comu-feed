"use client";

import CardPostWithSkeleton from "@/app/components/cardPostWithSkeleton";
import TopBar from "@/app/components/topBar";
import {
  CardsOfPostContainer,
  HomeContainer,
  TopBarContainer,
} from "@/app/home/styles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardPost from "../components/cardPost";

export interface CommentWithUser {
  id: string;
  content: string;
  user: {
    id: string;
    avatar: string;
    email: string;
    name: string;
  };
  created_at: Date;
}

export interface LoveWithUser {
  id: string;
  text_post_id?: string;
  media_post_id?: string;
  user: {
    avatar: string;
    name: string;
    id: string;
  };
}

export interface MediaPostWithUser {
  id: string;
  title: string;
  user_id: string;
  community_id: string;
  media: string;
  created_at: Date;
  description: string;
  user?: {
    id: string;
    avatar: string;
    created_at: Date;
    email: string;
    name: string;
  };
  love: LoveWithUser[];
  comments?: CommentWithUser[];
  community?: {
    name: string;
    id: string;
  };
}

export interface TextPostWithUser {
  id: string;
  title: string;
  user_id: string;
  community_id: string;
  content: string;
  created_at: Date;
  user?: {
    id: string;
    avatar: string;
    created_at: Date;
    email: string;
    name: string;
  };
  comments?: CommentWithUser[];
  love?: LoveWithUser[];
  community?: {
    name: string;
    id: string;
  };
}

export default function Home() {
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
    <HomeContainer>
      <TopBarContainer>
        <TopBar page="home" />
      </TopBarContainer>
      {isLoading ? (
        <CardsOfPostContainer>
          <CardPostWithSkeleton />
          <CardPostWithSkeleton />
          <CardPostWithSkeleton />
        </CardsOfPostContainer>
      ) : (
        <CardsOfPostContainer>
          {Array.isArray(posts) &&
            posts
              ?.slice(0, 3)
              .map((post) => (
                <CardPost key={post.id} post={post} page="home" />
              ))}
        </CardsOfPostContainer>
      )}
    </HomeContainer>
  );
}
