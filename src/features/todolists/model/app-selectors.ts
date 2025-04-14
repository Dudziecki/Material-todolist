
import type { RootState } from '../../../app/store.ts'
import {ThemeMode} from "../../../app/app-slice.ts";

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode