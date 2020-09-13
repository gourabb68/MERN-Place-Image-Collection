import React,{ useState,useCallback } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      const responseData = await response.json();
      //checking response error code cause for fetch 404 500 are not error technically
      if (!response.ok) {
        //means not 200 like 400 500 etc
        throw new Error(responseData.message);
      }
      return responseData;
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    setIsLoading(false);
  },[]);
  return {isloading,error,sendRequest}
};
