import { baseApi } from "@/app/baseApi.ts"
import { CaptchaResponse } from "@/features/security/api/captchaApi.types.ts"

export const securityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCaptcha: build.query<CaptchaResponse, void>({
      query: () => "/security/get-captcha-url",
    }),
  }),
})
export const { useGetCaptchaQuery ,useLazyGetCaptchaQuery} = securityApi
