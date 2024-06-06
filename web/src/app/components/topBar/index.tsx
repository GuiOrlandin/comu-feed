"use client";

import Link from "next/link";
import {
  ButtonOnBarContainer,
  ButtonsOnBarContainer,
  TopBarContainer,
  TwoOptionsRedirectOnBarContainerInHome,
  TwoOptionsRedirectOnBarContainerInOthersPages,
} from "./styles";
import { useRouter } from "next/navigation";
import CreatePostModal from "../createPostModal";
import * as Dialog from "@radix-ui/react-dialog";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { tokenStore } from "@/store/tokenStore";
import { emailStore } from "@/store/emailStore";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TopBarProps {
  page: string;
  isLoged?: boolean;
}

interface CommunityResponse {
  id: string;
  created_at: Date;
  community_image?: string | null;
  email: string;
  founder_id: string;
  key_access: string;
  name: string;
}
interface CommentsResponse {
  id: string;
  created_at: Date;
  user_id: string;
  text_post_id: string;
  media_post_id: string;
  content: string;
}
interface MediaPostsResponse {
  id: string;
  created_at: Date;
  user_id: string;
  title: string;
  community_id: string;
  media: string;
}
interface TextPostsResponse {
  id: string;
  created_at: Date;
  user_id: string;
  title: string;
  community_id: string;
  content: string;
}

export interface UserResponse {
  id: string;
  avatar?: string | null;
  created_at: Date;
  email: string;
  community_Founder: CommunityResponse[];
  community_Member: CommunityResponse[];
  comments: CommentsResponse[];
  mediaResponse: MediaPostsResponse[];
  textResponse: TextPostsResponse[];
}

export default function TopBar({ page, isLoged }: TopBarProps) {
  const router = useRouter();
  const [userAuthenticated, setUserAuthenticated] = useState(isLoged);
  const token = tokenStore((state) => state.token);
  const setEmail = emailStore((state) => state.setEmail);
  const email = emailStore((state) => state.email);
  const setToken = tokenStore((state) => state.setToken);
  const { data: session } = useSession();

  function handleRedirect(page: string) {
    router.push(`/${page}`);
  }
  function handleLogout() {
    signOut();
    if (typeof window !== "undefined") {
      localStorage.removeItem("storeToken");
      localStorage.removeItem("storeEmail");
    }
  }

  const { data: user, refetch } = useQuery<UserResponse>({
    queryKey: ["user-info"],

    queryFn: async () => {
      if (email) {
        return axios
          .get(`http://localhost:3333/users?email=${email}`)
          .then((response) => response.data);
      }
    },
  });

  console.log(user);

  useEffect(() => {
    console.log(session);
    if (session) {
      localStorage.setItem("storeToken", session.expires);
      localStorage.setItem("storeEmail", session.user?.email as string);
      setToken(session.expires);
      setEmail(session.user?.email as string);
    }

    if (typeof window !== "undefined" && !session) {
      const tokenStorage = localStorage.getItem("storeToken");
      const emailStorage = localStorage.getItem("storeEmail");
      setToken(tokenStorage!);
      setEmail(emailStorage!);
    }

    if (token && email) {
      setUserAuthenticated(true);
      refetch();
    } else {
      setUserAuthenticated(false);
    }
  }, [token, session]);

  return (
    <TopBarContainer>
      {page === "home" && (
        <>
          <TwoOptionsRedirectOnBarContainerInHome>
            <Link href="/news">Novidades</Link>
            <Link href="/mostLoved">Mais Amados</Link>
          </TwoOptionsRedirectOnBarContainerInHome>
          {userAuthenticated ? (
            <ButtonsOnBarContainer>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <ButtonOnBarContainer>Criar</ButtonOnBarContainer>
                </Dialog.Trigger>
                <CreatePostModal user={user!} />
              </Dialog.Root>
              <ButtonOnBarContainer onClick={() => handleLogout()}>
                Sair
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          ) : (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("login")}>
                Entrar
              </ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("register")}>
                Cadastrar
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          )}
        </>
      )}
      {page === "register" && (
        <>
          <TwoOptionsRedirectOnBarContainerInOthersPages>
            <Link href="home">Home</Link>
          </TwoOptionsRedirectOnBarContainerInOthersPages>
          <ButtonsOnBarContainer>
            <ButtonOnBarContainer onClick={() => handleRedirect("login")}>
              Entrar
            </ButtonOnBarContainer>
          </ButtonsOnBarContainer>
        </>
      )}
      {page === "login" && (
        <>
          <TwoOptionsRedirectOnBarContainerInOthersPages>
            <Link href="home">Home</Link>
          </TwoOptionsRedirectOnBarContainerInOthersPages>
          <ButtonsOnBarContainer>
            <ButtonOnBarContainer onClick={() => handleRedirect("register")}>
              Cadastrar
            </ButtonOnBarContainer>
          </ButtonsOnBarContainer>
        </>
      )}

      {page === "mostLoved" && (
        <>
          <TwoOptionsRedirectOnBarContainerInOthersPages>
            <Link href="home">Home</Link>
            <Link href="news">Novidades</Link>
          </TwoOptionsRedirectOnBarContainerInOthersPages>
          {userAuthenticated ? (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer>Criar</ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleLogout()}>
                Sair
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          ) : (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("login")}>
                Entrar
              </ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("register")}>
                Cadastrar
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          )}
        </>
      )}
      {page === "news" && (
        <>
          <TwoOptionsRedirectOnBarContainerInOthersPages>
            <Link href="home">Home</Link>
            <Link href="mostLoved">Mais amados</Link>
          </TwoOptionsRedirectOnBarContainerInOthersPages>
          {userAuthenticated ? (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer>Criar</ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleLogout()}>
                Sair
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          ) : (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("login")}>
                Entrar
              </ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => handleRedirect("register")}>
                Cadastrar
              </ButtonOnBarContainer>
            </ButtonsOnBarContainer>
          )}
        </>
      )}
    </TopBarContainer>
  );
}
