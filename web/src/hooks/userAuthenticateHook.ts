import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export interface UserAuthenticationDetails {
  email: string;
  password_hash: string;
}

async function postData(data: UserAuthenticationDetails) {
  try {
    const response = await axios.post("http://localhost:3333/signIn", data);
    const token = response.data.token;
    return token;
  } catch (error) {
    throw new Error("Falha ao autenticar usuário");
  }
}

export function useAuthenticateMutate() {
  const mutate = useMutation({
    mutationFn: postData,
  });

  return mutate;
}
