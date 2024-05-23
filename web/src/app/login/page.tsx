"use client";

import TopBar from "../components/topBar";
import {
  EmailInputContainer,
  LoginButton,
  LoginButtonContainer,
  LoginContent,
  LoginContentContainer,
  LoginPageContainer,
  LoginWithGoogleButton,
  PasswordInputContainer,
} from "./styles";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default async function Login() {
  return (
    <LoginPageContainer>
      <TopBar page="login" isLoged={false} />
      <LoginContentContainer>
        <LoginContent>
          <EmailInputContainer>
            <span>E-mail</span>
            <input type="text" />
          </EmailInputContainer>
          <PasswordInputContainer>
            <span>Senha</span>
            <input type="text" />
          </PasswordInputContainer>
          <LoginButtonContainer>
            <LoginButton>Entrar</LoginButton>
          </LoginButtonContainer>
          <LoginWithGoogleButton
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle />
            Entrar com Google
          </LoginWithGoogleButton>
        </LoginContent>
      </LoginContentContainer>
    </LoginPageContainer>
  );
}
