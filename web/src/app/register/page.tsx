"use client";

import TopBar from "../components/topBar";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

import {
  EmailInputContainer,
  NameInputContainer,
  PasswordInputContainer,
  RegisterButton,
  RegisterButtonContainer,
  RegisterContent,
  RegisterContentContainer,
  RegisterPageContainer,
  RegisterWithGoogleButton,
} from "./styles";

export default async function Register() {
  return (
    <RegisterPageContainer>
      <TopBar page="register" isLoged={false} />
      <RegisterContentContainer>
        <RegisterContent>
          <EmailInputContainer>
            <span>E-mail</span>
            <input type="text" />
          </EmailInputContainer>
          <NameInputContainer>
            <span>Name</span>
            <input type="text" />
          </NameInputContainer>
          <PasswordInputContainer>
            <span>Senha</span>
            <input type="text" />
          </PasswordInputContainer>
          <RegisterButtonContainer>
            <RegisterButton>Cadastrar</RegisterButton>
          </RegisterButtonContainer>
          <RegisterWithGoogleButton
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle />
            Cadastrar com Google
          </RegisterWithGoogleButton>
        </RegisterContent>
      </RegisterContentContainer>
    </RegisterPageContainer>
  );
}
