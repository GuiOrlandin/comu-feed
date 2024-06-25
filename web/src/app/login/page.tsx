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

export default function Login() {
  const router = useRouter();
  const [userAuthenticateCredentials, setUserAuthenticateCredentials] =
    useState<UserAuthenticationDetails>({
      email: "",
      password_hash: "",
    });
  const [errorMessage, setErrorMessage] = useState("");
  const saveToken = tokenStore((state) => state.setToken);
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

      if (typeof window !== "undefined") {
        localStorage.setItem("storeToken", data);
        localStorage.setItem("storeEmail", userAuthenticateCredentials!.email);
      }

      router.back();
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
