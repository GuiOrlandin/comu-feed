import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";
import { useEffect } from "react";

export interface CreateCommentDetails {
  content: string;
  text_post_id?: string | null;
  media_post_id?: string | null;
}

async function postData(data: CreateCommentDetails, authToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  await axios.post("http://localhost:3333/comment", data, config);
}

export function useCreateCommentMutate() {
  const setToken = tokenStore((state) => state.setToken);
  const authToken = tokenStore((state) => state.token);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storeToken = localStorage.getItem("storeToken");

      if (storeToken) {
        setToken(storeToken);
      }
    }
  }, [setToken]);

  const mutate = useMutation({
    mutationFn: ({ data }: { data: CreateCommentDetails }) =>
      postData(data, authToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-info"] });
      queryClient.invalidateQueries({ queryKey: ["community-info"] });
      queryClient.invalidateQueries({ queryKey: ["post-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-authenticated"] });
    },
  });
  return mutate;
}
