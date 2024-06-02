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

interface TopBarProps {
  page: string;
  isLoged?: boolean;
}

export default function TopBar({ page, isLoged }: TopBarProps) {
  const router = useRouter();
  const [userAuthenticated, setUserAuthenticated] = useState(isLoged);
  const token = tokenStore((state) => state.token);
  const setToken = tokenStore((state) => state.setToken);

  function handleRedirect(page: string) {
    router.push(`/${page}`);
  }
  function handleLogout() {
    signOut();
    if (typeof window !== "undefined") {
      localStorage.removeItem("storeToken");
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("storeToken");
      setToken(token!);
      setUserAuthenticated(!!token || !!token);
    }

    if (token) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
  }, [token]);

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
                <CreatePostModal />
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
