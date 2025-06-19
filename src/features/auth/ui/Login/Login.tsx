import { selectIsLoggedIn, selectThemeMode, setIsLoggedInAC } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import { Inputs, loginSchema } from "@/features/auth/lib/schemes"
import { zodResolver } from "@hookform/resolvers/zod"
import { Navigate } from "react-router"
import { Path } from "@/common/routing"
import { useLoginMutation } from "@/features/auth/api/authApi.ts"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { useGetCaptchaQuery } from "@/features/security/api/captchaApi.ts"
import { useState } from "react"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [login] = useLoginMutation()
  const { data: captchaData, isLoading: isCaptchaLoading, isError: isCaptchaError } = useGetCaptchaQuery()
  // const [fetchCaptcha, { data: captchaData, isLoading: isCaptchaLoading, isError: isCaptchaError }] = useLazyGetCaptchaQuery()

  console.log("Captcha data:", captchaData, "Loading:", isCaptchaLoading, "Error:", isCaptchaError)
  const dispatch = useAppDispatch()
  const [showCaptcha, setShowCaptcha] = useState(false) // CAPTCHA скрыта по умолчанию
  const [captchaCode, setCaptchaCode] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const theme = getTheme(themeMode)
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  })





  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const loginData = { ...data, captcha: showCaptcha ? captchaCode : undefined }
      console.log("Submitting login with data:", loginData)
      const res = await login(loginData).unwrap()
      console.log("Server response:", res)
      if (res.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        localStorage.setItem(AUTH_TOKEN, res.data.token)
        setShowCaptcha(false)
        setCaptchaCode("")
        setErrorMessage(null)
        reset()
      }
    } catch (err: any) {
      console.log("Server error:", err)
      if (err.data?.resultCode === ResultCode.CaptchaError) {
        setShowCaptcha(true) // Показываем CAPTCHA
        setCaptchaCode("") // Сбрасываем введённый код
        // refetch() // Обновляем CAPTCHA
        setErrorMessage(err.data.messages[0] || "Требуется проверка CAPTCHA")
      } else if (err.data?.messages?.length) {
        setErrorMessage(err.data.messages[0])
      } else {
        setErrorMessage("Произошла ошибка при входе")
      }
    }
  }

  if (isLoggedIn) {
    return <Navigate to={Path.Main} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
            <TextField type="password" label="Password" margin="normal" {...register("password")} />
            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                />
              }
            />
            {/*{showCaptcha && (*/}
              <div>
                {isCaptchaLoading ? (
                  <p>Загрузка CAPTCHA...</p>
                ) : captchaData?.url ? (
                  <>
                    <img src={captchaData.url} alt="CAPTCHA" style={{ margin: "10px 0" }} />
                    <TextField
                      label="Введите код CAPTCHA"
                      margin="normal"
                      value={captchaCode}
                      onChange={(e) => setCaptchaCode(e.currentTarget.value)}
                      error={!!errorMessage}
                      helperText={errorMessage || ""}
                    />
                  </>
                ) : (
                  <p>Ошибка загрузки CAPTCHA</p>
                )}
              </div>
            {/*)}*/}
            {errorMessage && !showCaptcha && (
              <span className={s.errorMessage}>{errorMessage}</span>
            )}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}