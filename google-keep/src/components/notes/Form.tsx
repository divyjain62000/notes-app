import React, { useState, useRef, useContext } from "react";

import { Box, TextField, ClickAwayListener } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";

import "../../App.css";
import {
  NotificationAddOutlined as NotficationAdd,
  PersonAddAlt1Outlined as PersonAdd,
  PaletteOutlined as Art,
  PhotoOutlined as PhotoAlbum,
  ArchiveOutlined as Archive,
  UTurnLeftOutlined as Undo,
  UTurnRightOutlined as Redo,
  MoreVertOutlined as Dots
} from "@mui/icons-material";
import { NoteInterface, NoteStateInterface } from "../../interfaces/note.interface";
import { connect, ConnectedProps } from "react-redux";
import { addNote } from "../../context/Actions";

const mapStateToProps = (state: NoteStateInterface) => ({
  notes: state.notes
});

const mapDispatchToProps = {
  addNote
};

const connector = connect(mapStateToProps, mapDispatchToProps);


type PropsFromRedux = ConnectedProps<typeof connector>;



const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 60%), 0 2px 6px 2px rgb(60 64 67 / 65%);
  border: 1px solid #5f6368;
  width: 600px;
  border-radius: 8px;
  min-height: 30px;
  padding: 10px 15px;
  color: #a8a2a5;
`;

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input::placeholder": {
    color: "#a8a2a5", // Change this to your desired color
    opacity: 1, // Optional: Ensures the color is fully applied
    fontWeight: 600,
  },
  "& .MuiInputBase-input": {
    color: "#a8a2a5", // Change this to your desired color
    opacity: 1, // Optional: Ensures the color is fully applied
  },
});

const TitleTextField = styled(TextField)({
  "& .MuiInputBase-input::placeholder": {
    color: "#a6a2a5", // Change this to your desired color
    opacity: 1, // Optional: Ensures the color is fully applied
    fontWeight: "bold",
  },
  "& .MuiInputBase-input": {
    color: "#a6a2a5", // Change this to your desired color
    opacity: 1, // Optional: Ensures the color is fully applied
    fontWeight: "bold",
  },
});

const DefaultDiv = styled('div')(({ theme }) => ({
  borderRadius: "100%",
  width: "20px",
  height: "20px",
  background: "#202124",
  // transition: "background 0.3s ease",
  '&:hover': {
    border: "1px solid #ffe",
    background: "#202124",
  },
}));



const RedDiv = styled('div')(({ theme }) => ({
  borderRadius: "100%",
  width: "20px",
  height: "20px",
  background: "#b83218",
  // transition: "background 0.3s ease",
  '&:hover': {
    border: "1px solid #ffe",
    background: "#b83218",
  },
}));


const YellowDiv = styled('div')(({ theme }) => ({
  borderRadius: "100%",
  width: "20px",
  height: "20px",
  background: "#9c991f",
  // transition: "background 0.3s ease",
  '&:hover': {
    border: "1px solid #ffe",
    background: "#9c991f",
  },
}));


const GreenDiv = styled('div')(({ theme }) => ({
  borderRadius: "100%",
  width: "20px",
  height: "20px",
  background: "#368011",
  // transition: "background 0.3s ease",
  '&:hover': {
    border: "1px solid #ffe",
    background: "#368011",
  },
}));


const SkyblueDiv = styled('div')(({ theme }) => ({
  borderRadius: "100%",
  width: "20px",
  height: "20px",
  background: "#2c767d",
  // transition: "background 0.3s ease",
  '&:hover': {
    border: "1px solid #ffe",
    background: "#2c767d",
  },
}));

const note = {
  id: "",
  heading: "",
  text: "",
  bgColor: "#202124",
  img: null
};

const Form: React.FC<PropsFromRedux> = ({ addNote }) => {
  const [showTextField, setShowTextField] = useState(false);
  const [newNote, setNewNote] = useState<NoteInterface>({ ...note, id: uuid() });
  const [noteColor, setNoteColor] = useState<string>("#202124");
  const [isArtOpen, setIsArtOpen] = useState<boolean>(false);

  // const { setNotes } = useContext(DataContext);

  const containerRef = useRef<any>();

  const handleClickAway = () => {
    setShowTextField(false);
    setIsArtOpen(false);
    containerRef.current.style.minheight = "30px";
    setNewNote({ ...note, id: uuid() });

    if (newNote.heading || newNote.text) {
      addNote(newNote);
    }
  };

  const onTextAreaClick = () => {
    setShowTextField(true);
    containerRef.current.style.minheight = "70px";
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let changedNote = { ...newNote, [name]: value };
    setNewNote(changedNote);
  };

  const noteColorHandler = (clr: string) => {
    setNoteColor(clr);
    setNewNote({ ...newNote, bgColor: clr });
  }

  const handleFileChange = (e: React.ChangeEvent<any>) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewNote({ ...newNote, img: reader.result }); // Set the base64 string to state
      };
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container ref={containerRef}>
        {showTextField && (
          <TitleTextField
            placeholder="Title"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            style={{ marginBottom: 10, color: "#a8a2a5" }}
            onChange={(e) => onTextChange(e)}
            name="heading"
            value={newNote.heading}
          />
        )}
        <CustomTextField
          placeholder="Take a note..."
          multiline
          maxRows={Infinity}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onClick={onTextAreaClick}
          onChange={(e) => onTextChange(e)}
          name="text"
          value={newNote.text}
        />
        {showTextField && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "5px",
            }}
          >
            <div
              style={{
                width: "100%",
                justifyContent: "start",
                marginLeft: "-10px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                fontSize: "smaller",
              }}
            >
              <div className="form-icon-div">
                <NotficationAdd className="form-icon" />
              </div>
              <div className="form-icon-div">
                <PersonAdd className="form-icon" />
              </div>
              <div className="form-icon-div">
                <Art onClick={() => setIsArtOpen(!isArtOpen)} className="form-icon" style={{ position: 'relative', display: 'inline-block' }} />
                {isArtOpen && <div style={{ display: 'flex', gap: "4px", alignItems: "center", width: "auto", height: "50px", color: "white", position: 'absolute', padding: "10px", marginTop: "100px", background: "#292928", border: "1px solid #323124", borderRadius: "0%" }}>
                  <DefaultDiv onClick={() => noteColorHandler("#202124")} style={{ border: `${noteColor === '#202124' ? "1px solid #ffe" : ""}` }} />
                  <RedDiv onClick={() => noteColorHandler("#b83218")} style={{ border: `${noteColor === '#b83218' ? "1px solid #ffe" : ""}` }} />
                  <GreenDiv onClick={() => noteColorHandler("#368011")} style={{ border: `${noteColor === '#368011' ? "1px solid #ffe" : ""}` }} />
                  <YellowDiv onClick={() => noteColorHandler("#9c991f")} style={{ border: `${noteColor === '#9c991f' ? "1px solid #ffe" : ""}` }} />
                  <SkyblueDiv onClick={() => noteColorHandler("#2c767d")} style={{ border: `${noteColor === '#2c767d' ? "1px solid #ffe" : ""}` }} />

                </div>}
              </div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div className="form-icon-div">
                  <PhotoAlbum className="form-icon" />
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div className="form-icon-div">
                <Archive className="form-icon" />
              </div>
              <div className="form-icon-div">
                <Dots className="form-icon" />
              </div>
              <div className="form-icon-div">
                <Undo
                  className="form-icon"
                  style={{ transform: "rotate(90deg)" }}
                />
              </div>
              <div className="form-icon-div">
                <Redo
                  className="form-icon"
                  style={{ transform: "rotate(270deg)" }}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "right",
              }}
            >
              <button className="form-button" onClick={handleClickAway}>
                close
              </button>
            </div>
          </div>
        )}
      </Container>
    </ClickAwayListener>
  );
};

export default connector(Form);
