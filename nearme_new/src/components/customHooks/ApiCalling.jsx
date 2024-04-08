import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(url);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
export default useGetData;

export function usePostData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(); // Add state for the response

  const postData = async (url, payload) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("The request was not successful.");
      }
      const data = await response.json(); // Assuming the response is JSON
      setResponse(data); // Save the response data to state
      console.log("Success", data); // You can log here to see immediate success response
      return data; // Return the data for further handling
    } catch (error) {
      setError(error);
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response }; // Include the response in the returned object
}
export function usePatchData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(); // Add state for the response

  const patchData = async (url, payload) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("The request was not successful.");
      }
      const data = await response.json(); // Assuming the response is JSON
      setResponse(data); // Save the response data to state
      console.log("Success", data); // You can log here to see immediate success response
      return data; // Return the data for further handling
    } catch (error) {
      setError(error);
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { patchData, loading, error, response }; // Include the response in the returned object
}
