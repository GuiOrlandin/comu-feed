import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";
import { useEffect } from "react";

export interface EditUserDetails {
  name: string;
}

async function putData(
  data: EditUserDetails,
  authToken: string,
  file?: File[]
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
    if (file) {
      file.forEach((file) => {
        formData.append(`file`, file);
      });
    }

    console.log(file);

    await axios.put("http://localhost:3333/users", formData, config);
  }
}

export function useEditUserMutate() {
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
    mutationFn: ({ data, file }: { data: EditUserDetails; file?: File[] }) =>
      putData(data, authToken, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-authenticated"] });
      queryClient.invalidateQueries({ queryKey: ["posts-info"] });
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
  return mutate;
}
