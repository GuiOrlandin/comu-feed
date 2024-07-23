import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";
import { useEffect } from "react";

export interface CreateCommunityDetails {
  name: string;
  password?: string;
  description: string;
  key_access: string;
}

async function postData(
  data: CreateCommunityDetails,
  authToken: string,
  file: File[]
) {
  if (authToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("password", data.password || "");
    formData.append("description", data.description);
    if (data.key_access === undefined) {
      formData.append("key_access", "true");
    } else {
      formData.append("key_access", data.key_access);
    }

    file.forEach((file) => {
      formData.append(`file`, file);
    });

    await axios.post("http://localhost:3333/community", formData, config);
  }
}

export function useCreateCommunityMutate() {
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
    mutationFn: ({
      data,
      file,
    }: {
      data: CreateCommunityDetails;
      file: File[];
    }) => postData(data, authToken, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-authenticated"] });
      queryClient.invalidateQueries({ queryKey: ["posts-info"] });
    },
  });
  return mutate;
}
