import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Archive from './Archive';
import {
    NoteInterface,
    NoteStateInterface,
} from "../../interfaces/note.interface";
import { connect, ConnectedProps } from "react-redux";
import React from 'react';


const mapStateToProps = (state: NoteStateInterface) => ({
    archiveNotes: state.archiveNotes,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;



const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Archives:React.FC<PropsFromRedux> = ({archiveNotes}) => {


    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Grid container>
                    {
                        archiveNotes.map(archive => (
                            <Grid item>
                                <Archive archive={archive} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default connector(Archives);