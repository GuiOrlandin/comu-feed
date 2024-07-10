import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";

async function deleteData(community_id: string, authToken: string) {
  if (authToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios.delete(
      `http://localhost:3333/community/${community_id}`,
      config
    );
  }
}

export function useDeleteCommunityMutate() {
  const setToken = tokenStore((state) => state.setToken);
  const authToken = tokenStore((state) => state.token);

  if (typeof window !== "undefined") {
    const storeToken = localStorage.getItem("storeToken");

    if (storeToken) {
      setToken(storeToken);
    }
  }
  const mutate = useMutation({
    mutationFn: (community_id: string) => deleteData(community_id, authToken),
  });
  return mutate;
}
