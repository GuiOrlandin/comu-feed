"use client";

import TopBar from "../components/topBar";
import {
  EmailInputContainer,
  ErrorContainer,
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
import { ChangeEvent, useState, useEffect } from "react";
import {
  UserAuthenticationDetails,
  useAuthenticateMutate,
} from "@/hooks/userAuthenticateHook";

import { useRouter } from "next/navigation";
import { tokenStore } from "@/store/tokenStore";

export default function Login() {
  const router = useRouter();
  const [userAuthenticateCredentials, setUserAuthenticateCredentials] =
    useState<UserAuthenticationDetails>({
      email: "",
      password_hash: "",
    });
  const [errorMessage, setErrorMessage] = useState("");
  const saveToken = tokenStore((state) => state.setToken);

  const { mutate, isSuccess, error, data } = useAuthenticateMutate();

  function handleChangeUserDetailsForRegister(
    event: ChangeEvent<HTMLInputElement>,
    inputTitle: string
  ) {
    const { value } = event.target;
    setUserAuthenticateCredentials((prevDetails) => ({
      ...prevDetails!,
      [inputTitle]: value,
    }));
  }

  useEffect(() => {
    if (isSuccess) {
      saveToken(data);
      localStorage.setItem("storeToken", data);
      router.push("/");
    }

    if (error?.message === "Falha ao autenticar usuário") {
      setErrorMessage("Email ou senha incorretos!");
    }
  }, [error, isSuccess]);

  function handleAuthenticate(
    userAuthenticateCredentialsDetails: UserAuthenticationDetails
  ) {
    if (userAuthenticateCredentials?.email === "") {
      return setErrorMessage("insira o Email!");
    }
    if (userAuthenticateCredentials?.password_hash === "") {
      return setErrorMessage("insira a Senha!");
    }

    mutate(userAuthenticateCredentialsDetails);
  }

  return (
    <LoginPageContainer>
      <TopBar page="login" isLoged={false} />
      <LoginContentContainer>
        <LoginContent>
          <EmailInputContainer>
            <span>Email</span>
            <input
              type="text"
              onChange={(event) =>
                handleChangeUserDetailsForRegister(event, "email")
              }
            />
          </EmailInputContainer>
          <PasswordInputContainer>
            <span>Senha</span>
            <input
              type="text"
              onChange={(event) =>
                handleChangeUserDetailsForRegister(event, "password_hash")
              }
            />
          </PasswordInputContainer>
          {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
          <LoginButtonContainer>
            <LoginButton
              onClick={() => handleAuthenticate(userAuthenticateCredentials!)}
            >
              Entrar
            </LoginButton>
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
