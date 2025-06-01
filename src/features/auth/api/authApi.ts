import { BaseResponse } from "@/common/types"
import { Inputs } from "@/features/auth/lib/schemes"
import { LoginResponse, MeResponse } from "@/features/auth/api/authApi.types.ts"

import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<BaseResponse<LoginResponse>, Inputs>({
      query: (body) => ({
        method: "POST",
        url: "auth/login",
        body,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        method: "DELETE",
        url: "auth/login",
      }),
    }),
    me: build.query<BaseResponse<MeResponse>, void>({
      query: () => "auth/me",
    }),
  }),
})
export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi
