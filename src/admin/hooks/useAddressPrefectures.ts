import { useQuery } from "react-query";
import { axiosInstance } from "../../api/server";
import { Prefecture } from "../types/Address";
import axios from "axios";

const fetchPrefectures = async (): Promise<Prefecture[]> => {
//   const { data } = await axiosInstance.get("/jp_addresses/prefectures");

const {data} = await axios.get("https://fkuy7wira5n3shbvxt3xy3wfqm0jhvzq.lambda-url.ap-northeast-1.on.aws/jp_addresses/prefectures");

  return data;
};

export function usePrefectures() {
  return useQuery(["jp_prefectures"], () => fetchPrefectures(), {
    // enabled: !!language,
  });
}
