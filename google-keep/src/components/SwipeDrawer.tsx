import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

//components
import HeaderBar from './HeaderBar';
import NavList from './NavList';

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    border: "1px solid #202124",
    overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
    border: "1px solid #202124",
});

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: string) => prop !== 'open' })(
    ({ theme, open }: any) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function SwipeDrawer() {

    const [open, setOpen] = React.useState<boolean>(true);

    const handleDrawer = () => {
        setOpen(prevState => !prevState);
    };

    return (
        <Box sx={{ display: 'flex', border: "none" }}>
            <HeaderBar
                open={open}
                handleDrawer={handleDrawer}
            />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader></DrawerHeader>
                <NavList />
            </Drawer>
        </Box>
    );
}

export default SwipeDrawer;