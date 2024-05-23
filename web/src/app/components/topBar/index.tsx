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

interface TopBarProps {
  page: string;
  isLoged: boolean;
}

export default function TopBar({ page, isLoged }: TopBarProps) {
  const router = useRouter();

  function handleRedirect(page: string) {
    router.push(`/${page}`);
  }

  return (
    <TopBarContainer>
      {page === "home" && (
        <>
          <TwoOptionsRedirectOnBarContainerInHome>
            <Link href="/news">Novidades</Link>
            <Link href="/mostLoved">Mais Amados</Link>
          </TwoOptionsRedirectOnBarContainerInHome>
          {isLoged ? (
            <ButtonsOnBarContainer>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <ButtonOnBarContainer>Criar</ButtonOnBarContainer>
                </Dialog.Trigger>
                <CreatePostModal />
              </Dialog.Root>
              <ButtonOnBarContainer onClick={() => signOut()}>
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
          {isLoged ? (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer>Criar</ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => signOut()}>
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
          {isLoged ? (
            <ButtonsOnBarContainer>
              <ButtonOnBarContainer>Criar</ButtonOnBarContainer>
              <ButtonOnBarContainer onClick={() => signOut()}>
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
