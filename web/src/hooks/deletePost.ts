import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";
import { useEffect } from "react";

async function deleteData(postId: string, authToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  await axios.delete(`http://localhost:3333/post/${postId}`, config);
}

export function useDeletePostMutate() {
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
    mutationFn: async (postId: string) => deleteData(postId, authToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-info"] });
      queryClient.invalidateQueries({ queryKey: ["community-info"] });
      queryClient.invalidateQueries({ queryKey: ["post-info"] });
    },
  });
  return mutate;
}
