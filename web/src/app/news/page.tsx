"use client";

import { useQuery } from "@tanstack/react-query";

import TopBar from "../components/topBar";
import { MediaPostWithUser, TextPostWithUser } from "../home/page";

import { NewsContainer, NewsContent, NewsWrapper } from "./styles";
import axios from "axios";
import CardPost from "../components/cardPost";

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

      <NewsWrapper>
        <NewsContent>
          {posts && posts!.length > 0 ? (
            posts!.map((post) => (
              <CardPost
                key={post.id}
                largeCard={true}
                post={post}
                refetchPost={() => refetch()}
              />
            ))
          ) : (
            <div>Nenhum post disponível</div>
          )}
        </NewsContent>
      </NewsWrapper>
    </NewsContainer>
  );
}
