import React from 'react';
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  NoteInterface,
  NoteStateInterface,
} from "../../interfaces/note.interface";
import { connect, ConnectedProps } from "react-redux";


//components
import DeleteNote from "./DeleteNote";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));


const mapStateToProps = (state: NoteStateInterface) => ({
  deleteNotes: state.deleteNotes,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


const DeleteNotes: React.FC<PropsFromRedux> = ({ deleteNotes }) => {

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ p: 3, width: "100%" }}>
        <DrawerHeader />
        <Grid container>
          {deleteNotes.map((deleteNote) => (
            <Grid item>
              <DeleteNote deleteNote={deleteNote} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default connector(DeleteNotes);
