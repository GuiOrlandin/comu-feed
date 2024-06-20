"use client";

import CardPostWithSkeleton from "@/app/components/cardPostWithSkeleton";
import TopBar from "@/app/components/topBar";
import { CardsOfPostContainer, HomeContainer } from "@/app/home/styles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardPost from "../components/cardPost";

export interface CommentWithUser {
  content: string;
  user: {
    avatar: string;
    email: string;
    name: string;
  };
  created_at: Date;
}

export interface LoveWithUser {
  user: {
    avatar: string;
    name: string;
  };
}

export interface MediaPostWithUser {
  id: string;
  title: string;
  user_id: string;
  community_id: string;
  media: string;
  created_at: Date;
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
  love: LoveWithUser[];
  community?: {
    name: string;
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

  console.log(posts);

  return (
    <HomeContainer>
      <TopBar page="home" />
      {isLoading ? (
        <CardsOfPostContainer>
          <CardPostWithSkeleton />
          <CardPostWithSkeleton />
          <CardPostWithSkeleton />
        </CardsOfPostContainer>
      ) : (
        <CardsOfPostContainer>
          {posts?.slice(0, 3).map((post) => (
            <CardPost key={post.id} post={post} />
          ))}
        </CardsOfPostContainer>
      )}
    </HomeContainer>
  );
}
