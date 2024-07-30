"use client";

import TopBar from "../components/topBar";

import { useState, ChangeEvent, useEffect } from "react";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { FiEyeOff } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";

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
  ShowPasswordContentButton,
} from "./styles";
import {
  UserRegisterDetails,
  useUserRegisterMutate,
} from "@/hooks/createUserHook";
import { useAuthenticateMutate } from "@/hooks/userAuthenticateHook";
import { tokenStore } from "@/store/tokenStore";
import { emailStore } from "@/store/emailStore";

export default function Register() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(true);

  const saveToken = tokenStore((state) => state.setToken);
  const saveEmail = emailStore((state) => state.setEmail);
  const { data: session } = useSession();

  const { mutate, isSuccess, error } = useUserRegisterMutate();
  const {
    mutate: authenticateUser,
    isSuccess: userAuthenticated,
    data,
  } = useAuthenticateMutate();
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

    if (userRegisterDetails.password_hash.length <= 5) {
      return setErrorMessage("A senha deve conter no mínimo 6 caracteres.");
    }

    mutate(userRegisterDetails);
  }

  function handleChangeShowPassword() {
    setShowPassword(!showPassword);
    setInputType((prevInputType) =>
      prevInputType === "password" ? "text" : "password"
    );
  }

  useEffect(() => {
    if (isSuccess) {
      authenticateUser({
        data: {
          email: userRegisterDetails.email,
          password_hash: userRegisterDetails.password_hash,
        },
      });
    }
    if (session) {
      authenticateUser({
        credentialOfUserLoggedWithGoogle: {
          emailOfUserLoggedWithGoogle: session!.user!.email as string,
        },
      });
    }

    if (userAuthenticated) {
      saveToken(data);

      if (session) {
        saveEmail(session.user?.email as string);

        if (typeof window !== "undefined") {
          localStorage.setItem("storeToken", data);
          localStorage.setItem("storeEmail", session.user?.email as string);
        }
      } else {
        saveEmail(userRegisterDetails!.email);
        if (typeof window !== "undefined") {
          localStorage.setItem("storeToken", data);
          localStorage.setItem("storeEmail", userRegisterDetails!.email);
        }
      }

      router.push("/");
    }

    if (error?.message === "Request failed with status code 401") {
      setErrorMessage("Email ja em uso!");
    }
  }, [error, isSuccess, session, userAuthenticated]);

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
              type={inputType}
              onChange={(value) =>
                handleChangeUserDetailsForRegister(value, "password_hash")
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
          <RegisterButtonContainer>
            <RegisterButton onClick={() => handleRegister(userRegisterDetails)}>
              Cadastrar
            </RegisterButton>
          </RegisterButtonContainer>
          <RegisterWithGoogleButton onClick={() => signIn("google")}>
            <FcGoogle />
            Cadastrar com Google
          </RegisterWithGoogleButton>
        </RegisterContent>
      </RegisterContentContainer>
    </RegisterPageContainer>
  );
}
