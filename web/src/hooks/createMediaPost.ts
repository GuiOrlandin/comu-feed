import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";
import { useEffect } from "react";

export interface CreateMediaPostRequest {
  community_id: string;
  title: string;
  postType: "mediaPost";
  description: string;
}

async function postData(
  data: CreateMediaPostRequest,
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

    formData.append("community_id", data.community_id);
    formData.append("description", data.description);
    formData.append("postType", data.postType);
    formData.append("title", data.title);
    file.forEach((file) => {
      formData.append(`file`, file);
    });

    await axios.post("http://localhost:3333/post/mediaPost", formData, config);
  }
}

export function useCreateMediaPostMutate() {
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
      data: CreateMediaPostRequest;
      file: File[];
    }) => postData(data, authToken, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-info"] });
      queryClient.invalidateQueries({ queryKey: ["community-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
  return mutate;
}
