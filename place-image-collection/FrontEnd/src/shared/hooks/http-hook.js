import React,{ useState,useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
//store data every re render cycle
  const activeHttpRequests =  useRef([])

  const sendRequest = useCallback(async (
    url,
    method = "GET",
    body = null,
    headers = {}
  
  ) => {

    setIsLoading(true);

    //for cancel request if while rendering or requesting if we render or click diff page then this req need to be aborted
    const httpAbortCtrll = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrll);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrll.signal //can use this signal to cancel req
      });
      const responseData = await response.json();

      activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrll
      )
      //checking response error code cause for fetch 404 500 are not error technically
      if (!response.ok) {
        //means not 200 like 400 500 etc
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      console.log(err);
      setIsLoading(false);
      throw err;
    }

  },[]);

const clearError =()=>{
    setError(null)
}
useEffect(()=>{
    return () =>{
        //go to all abort control
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    };
},[])

  return {isLoading,error,sendRequest,clearError}
};
