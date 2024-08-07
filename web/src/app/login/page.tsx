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
  ShowPasswordContentButton,
} from "./styles";

import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState, useEffect } from "react";
import {
  UserAuthenticationDetails,
  useAuthenticateMutate,
} from "@/hooks/userAuthenticateHook";

import { FiEyeOff } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";

import { useRouter } from "next/navigation";

import { tokenStore } from "@/store/tokenStore";
import { emailStore } from "@/store/emailStore";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const setEmail = emailStore((state) => state.setEmail);

  const [userAuthenticateCredentials, setUserAuthenticateCredentials] =
    useState<UserAuthenticationDetails>({
      email: "",
      password_hash: "",
    });
  const [errorMessage, setErrorMessage] = useState("");
  const saveToken = tokenStore((state) => state.setToken);
  const saveEmail = emailStore((state) => state.setEmail);
  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(true);

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
  function handleChangeShowPassword() {
    setShowPassword(!showPassword);
    setInputType((prevInputType) =>
      prevInputType === "password" ? "text" : "password"
    );
  }

  useEffect(() => {
    if (isSuccess && data) {
      saveToken(data);

      if (session) {
        saveEmail(session.user?.email as string);

        if (typeof window !== "undefined") {
          localStorage.setItem("storeToken", data);
          localStorage.setItem("storeEmail", session.user?.email as string);
        }
      } else {
        saveEmail(userAuthenticateCredentials!.email);
        if (typeof window !== "undefined") {
          localStorage.setItem("storeToken", data);
          localStorage.setItem(
            "storeEmail",
            userAuthenticateCredentials!.email
          );
        }
      }

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

    mutate({ data: userAuthenticateCredentialsDetails });
  }

  useEffect(() => {
    if (session) {
      mutate({
        credentialOfUserLoggedWithGoogle: {
          emailOfUserLoggedWithGoogle: session!.user!.email as string,
        },
      });
    }
  }, [session]);

  return (
    <LoginPageContainer>
      <TopBar page="login" />
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
              type={inputType}
              onChange={(event) =>
                handleChangeUserDetailsForRegister(event, "password_hash")
              }
            />
            <ShowPasswordContentButton
              onClick={() => handleChangeShowPassword()}
            >
              {showPassword ? (
                <FiEyeOff size={24} color="#2f1b7e" />
              ) : (
                <FaRegEye size={24} color="#2f1b7e" />
              )}
            </ShowPasswordContentButton>
          </PasswordInputContainer>
          {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
          <LoginButtonContainer>
            <LoginButton
              onClick={() => handleAuthenticate(userAuthenticateCredentials!)}
            >
              Entrar
            </LoginButton>
          </LoginButtonContainer>
          <LoginWithGoogleButton onClick={() => signIn("google")}>
            <FcGoogle />
            Entrar com Google
          </LoginWithGoogleButton>
        </LoginContent>
      </LoginContentContainer>
    </LoginPageContainer>
  );
}
