import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";

async function postData(loveId: string, authToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  await axios.delete(`http://localhost:3333/love/${loveId}`, config);
}

export function useDeleteLoveMutate() {
  const setToken = tokenStore((state) => state.setToken);
  const authToken = tokenStore((state) => state.token);

  if (typeof window !== "undefined") {
    const storeToken = localStorage.getItem("storeToken");

    if (storeToken) {
      setToken(storeToken);
    }
  }
  const mutate = useMutation({
    mutationFn: async (loveId: string) => postData(loveId, authToken),
  });
  return mutate;
}
