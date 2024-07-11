import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";
import { useEffect } from "react";

async function deleteData(postIdToDelete: string, authToken: string) {
  if (authToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios.delete(
      `http://localhost:3333/comment/${postIdToDelete}`,
      config
    );
  }
}

export function useDeleteCommentMutate() {
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
    mutationFn: (community_id: string) => deleteData(community_id, authToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-info"] });
      queryClient.invalidateQueries({ queryKey: ["community-info"] });
      queryClient.invalidateQueries({ queryKey: ["post-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
  return mutate;
}
