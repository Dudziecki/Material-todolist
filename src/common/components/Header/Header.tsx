
import Toolbar from "@mui/material/Toolbar";
import {Container} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MaterialUISwitch} from "@/Switch.ts";
import {NavButton} from "@/common/components/NavButton/NavButton.ts";
import AppBar from "@mui/material/AppBar";
import {changeThemeModeAC, selectThemeMode} from "@/app/app-slice.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";

import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {containerSx} from "@/common/styles/container.styles.ts";

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()
    const onSwitchModeChangeHandler=()=>{
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    const theme = getTheme(themeMode)
    return (
        <AppBar position="static">
            <Toolbar>
                <Container sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <MaterialUISwitch onChange={onSwitchModeChangeHandler}/>
                        <NavButton color="secondary">Sign in</NavButton>
                        <NavButton color="inherit">Sign in</NavButton>
                        <NavButton background={theme.palette.primary.dark} color="inherit">faq</NavButton>
                    </div>
                </Container>


            </Toolbar>
        </AppBar>
    );
};

