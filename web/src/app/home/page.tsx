"use client";

import CardPost from "@/app/components/cardPost";
import TopBar from "@/app/components/topBar";
import { CardsOfPostContainer, HomeContainer } from "@/app/home/styles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface MediaPost {
  title: string;
  user_id: string;
  community_id: string;
  media?: string;
  id?: string;
  created_at?: Date;
}

interface TextPost {
  title: string;
  user_id: string;
  community_id: string;
  content?: string;
  id?: string;
  created_at?: Date;
}

export default function Home() {
  const { data: posts, refetch } = useQuery<(TextPost | MediaPost)[]>({
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

      <CardsOfPostContainer>
        <CardPost />
        <CardPost />
        <CardPost />
      </CardsOfPostContainer>
    </HomeContainer>
  );
}
