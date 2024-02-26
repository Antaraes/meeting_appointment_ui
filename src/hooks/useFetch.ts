import { useQuery } from "@tanstack/react-query";

const fetchData = async (apiFunction: Function) => {
  const response = await apiFunction();
  return response.data;
};

const useFetch = (queryKey: string, api: Function) => {
  return useQuery({ queryKey: [queryKey], queryFn: () => fetchData(api) });
};

export default useFetch;
