import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UserAuthenticationDetails {
  email: string;
  password_hash: string;
}
export interface UserAuthenticationDetailsWithGoogleEmail {
  emailOfUserLoggedWithGoogle: string;
}

async function postData(
  data?: UserAuthenticationDetails,
  credentialOfUserLoggedWithGoogle?: UserAuthenticationDetailsWithGoogleEmail
) {
  try {
    if (credentialOfUserLoggedWithGoogle) {
      const response = await axios.post(
        "http://localhost:3333/signInWithGoogle",
        credentialOfUserLoggedWithGoogle
      );
      const token = await response.data.access_token;
      return token;
    }

    const response = await axios.post("http://localhost:3333/signIn", data);
    const token = await response.data.access_token;
    return token;
  } catch (error) {
    throw new Error("Falha ao autenticar usuário");
  }
}

export function useAuthenticateMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: ({
      data,
      credentialOfUserLoggedWithGoogle,
    }: {
      data?: UserAuthenticationDetails;
      credentialOfUserLoggedWithGoogle?: UserAuthenticationDetailsWithGoogleEmail;
    }) => postData(data, credentialOfUserLoggedWithGoogle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-info"] });
      queryClient.invalidateQueries({ queryKey: ["community-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-authenticated"] });
    },
  });

  return mutate;
}
