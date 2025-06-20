import styles from "./PageNotFound.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import { Path } from "@/common/routing"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button
      component={Link}
      to={Path.Main}
      sx={{
        bgcolor: "#087EA4",
        boxShadow: 1,
        borderRadius: 2,
        p: "2 15",
        maxWidth: 300,
        color: "white",
        m: "0 auto",
      }}
    >
      Вернуться на главную
    </Button>
  </>
)
