import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";
import { useEffect } from "react";

interface JoinCommunityProps {
  community_id: string;
  password?: string;
}

async function putData(data: JoinCommunityProps, authToken: string) {
  if (authToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios.put(
      `http://localhost:3333/community/${data.community_id}`,
      data,
      config
    );
  }
}

export function useJoinCommunityMutate() {
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
  }, [authToken]);

  const mutate = useMutation({
    mutationFn: (data: JoinCommunityProps) => putData(data, authToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-info"] });
      queryClient.invalidateQueries({ queryKey: ["community-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });

  return mutate;
}
