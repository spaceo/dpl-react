import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery
} from "react-query";
import { ErrorType, fetcher } from "./fetcher";
import { getToken, TOKEN_USER_KEY } from "../token";
import { useUrls } from "../utils/url";

type UserInfoData = {
  attributes: {
    cpr: number;
    userId: string;
    uniqueId: `${string}-${string}-${string}-${string}-${string}`;
    agencies: {
      agencyId: `${number}`;
      userId: string;
      userIdType: string;
    }[];
    municipality: `${number}`;
    municipalityAgencyId: `${number}`;
  };
};

const getUserInfoQueryKey = (url: string) => {
  const userToken = getToken(TOKEN_USER_KEY);
  if (!userToken) {
    throw new Error("User token is missing");
  }

  return `${url}:${userToken}`;
};

type UserInfoFunction = () => Promise<UserInfoData | null | undefined>;

const useUserInfo = <
  TData = Awaited<ReturnType<UserInfoFunction>>,
  TError = ErrorType<void>
>(
  queryOptions?: UseQueryOptions<
    Awaited<ReturnType<UserInfoFunction>>,
    TError,
    TData
  >
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const u = useUrls();
  const userinfoUrl = u("userinfoUrl");

  const url = String(userinfoUrl);
  const queryKey = queryOptions?.queryKey ?? getUserInfoQueryKey(url);

  const getUserInfo = (infoUrl: string, signal?: AbortSignal) => {
    return fetcher<UserInfoData>({
      url: infoUrl,
      method: "get",
      signal
    });
  };

  const queryFn: QueryFunction<Awaited<ReturnType<UserInfoFunction>>> = () =>
    getUserInfo(url);

  const query = useQuery<Awaited<ReturnType<UserInfoFunction>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  );

  return {
    queryKey,
    ...query
  };
};

export default useUserInfo;
