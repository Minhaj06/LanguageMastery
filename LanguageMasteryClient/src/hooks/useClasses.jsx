import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useClasses = () => {
  const {
    data: classes = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axios("/classes");
      return data;
    },
  });

  return [classes, loading, refetch];
};

export default useClasses;
