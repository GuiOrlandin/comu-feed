import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";

export interface CreateLoveDetails {
  text_post_id?: string | null;
  media_post_id?: string | null;
}

async function postData(data: CreateLoveDetails, authToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  await axios.post("http://localhost:3333/love", data, config);
}

export function useCreateLoveMutate() {
  const setToken = tokenStore((state) => state.setToken);
  const authToken = tokenStore((state) => state.token);

  if (typeof window !== "undefined") {
    const storeToken = localStorage.getItem("storeToken");

    if (storeToken) {
      setToken(storeToken);
    }
  }
  const mutate = useMutation({
    mutationFn: ({ data }: { data: CreateLoveDetails }) =>
      postData(data, authToken),
  });
  return mutate;
}
