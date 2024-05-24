"use client";

import TopBar from "../components/topBar";

import { useState, ChangeEvent } from "react";

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
import {
  UserRegisterDetails,
  useUserRegisterMutate,
} from "@/hooks/createUserHook";

export default async function Register() {
  const { mutate } = useUserRegisterMutate();
  const [userRegisterDetails, setUserRegisterDetails] =
    useState<UserRegisterDetails>({
      name: "",
      password_hash: "",
      email: "",
    });

  function handleChangeUserDetailsForRegister(
    value: ChangeEvent<HTMLInputElement>,
    inputTitle: string
  ) {
    setUserRegisterDetails({
      ...userRegisterDetails!,
      [inputTitle]: value,
    });
  }

  function handleRegister(userRegisterDetails: UserRegisterDetails) {
    mutate(userRegisterDetails);
  }

  return (
    <RegisterPageContainer>
      <TopBar page="register" isLoged={false} />
      <RegisterContentContainer>
        <RegisterContent>
          <EmailInputContainer>
            <span>E-mail</span>
            <input
              type="text"
              onChange={(value) =>
                handleChangeUserDetailsForRegister(value, "email")
              }
            />
          </EmailInputContainer>
          <NameInputContainer>
            <span>Name</span>
            <input
              type="text"
              onChange={(value) =>
                handleChangeUserDetailsForRegister(value, "name")
              }
            />
          </NameInputContainer>
          <PasswordInputContainer>
            <span>Senha</span>
            <input
              type="text"
              onChange={(value) =>
                handleChangeUserDetailsForRegister(value, "password_hash")
              }
            />
          </PasswordInputContainer>
          <RegisterButtonContainer>
            <RegisterButton onClick={() => handleRegister(userRegisterDetails)}>
              Cadastrar
            </RegisterButton>
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
