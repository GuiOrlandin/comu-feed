"use client";

import TopBar from "../components/topBar";

import { useState, ChangeEvent, useEffect } from "react";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  EmailInputContainer,
  ErrorContainer,
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

export default function Register() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, isSuccess, error } = useUserRegisterMutate();
  const [userRegisterDetails, setUserRegisterDetails] =
    useState<UserRegisterDetails>({
      name: "",
      password_hash: "",
      email: "",
    });

  function handleChangeUserDetailsForRegister(
    event: ChangeEvent<HTMLInputElement>,
    inputTitle: string
  ) {
    const { value } = event.target;
    setUserRegisterDetails((prevDetails) => ({
      ...prevDetails!,
      [inputTitle]: value,
    }));
  }

  function handleRegister(userRegisterDetails: UserRegisterDetails) {
    if (userRegisterDetails.name === "") {
      return setErrorMessage("insira o Nome!");
    }
    if (userRegisterDetails.email === "") {
      return setErrorMessage("insira o Email!");
    }
    if (userRegisterDetails.password_hash === "") {
      return setErrorMessage("insira a Senha!");
    }

    mutate(userRegisterDetails);
  }

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }

    if (error?.message === "Request failed with status code 401") {
      setErrorMessage("Email ja em uso!");
    }
  }, [error, isSuccess]);

  return (
    <RegisterPageContainer>
      <TopBar page="register" />
      <RegisterContentContainer>
        <RegisterContent>
          <EmailInputContainer>
            <span>E-mail</span>
            <input
              type="text"
              onChange={(event) =>
                handleChangeUserDetailsForRegister(event, "email")
              }
            />
            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
          </EmailInputContainer>
          <NameInputContainer>
            <span>Nome</span>
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
          {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
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
