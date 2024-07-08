import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";

export interface CreateTextPostRequest {
  title: string;
  content?: string;
  community_id: string;
  postType: "textPost";
}

async function postData(data: CreateTextPostRequest, authToken: string) {
  console.log(data);
  if (authToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios.post("http://localhost:3333/post/textPost", data, config);
  }
}

export function useCreateTextPostMutate() {
  const setToken = tokenStore((state) => state.setToken);
  const authToken = tokenStore((state) => state.token);
  const queryClient = useQueryClient();

  if (typeof window !== "undefined") {
    const storeToken = localStorage.getItem("storeToken");

    if (storeToken) {
      setToken(storeToken);
    }
  }
  const mutate = useMutation({
    mutationFn: (data: CreateTextPostRequest) => postData(data, authToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-info"] });
    },
  });
  return mutate;
}
