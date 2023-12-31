import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetMeetsQuery } from "../redux/userReducer";
import Zoom from "@mui/material/Zoom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MeetItem from "./MeetItem";
import axios from "axios";

export default function MeetsDialog() {
	const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [meetData, setMeeData] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const client = useSelector( state => state.user.user)
  console.log("client", client)
  const clientType = client.accountType==='Client'? true:false
  console.log("isClient: ", clientType)
  const {data, isSuccess, isError, error, isLoading} = useGetMeetsQuery({userId:client._id, isClient:clientType})

  const descriptionElementRef = useRef(null);
  useEffect(() => {
		axios.get(`https://c12-29-ft-node-react.onrender.com/api/meets/${client._id}?isClient=true`)
      .then(response => {
        setMeeData(response.data);
      })

		if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    setMeeData(data);
  }, [data]);

  return (
    <div>
      <Button
        onClick={handleClickOpen("paper")}
        variant="contained"
        sx={{
          background: "#FAFF00",
          color: "black",
          "&:hover": { background: "#cbda16", boxShadow: "5" },
        }}
      >
        Ir a Meets
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen={fullScreen}
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            width: "35em",
            maxWidth: "100%",
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">Meets agendadas</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {isLoading ? <Typography>Cargando...</Typography> : null}
            {meetData
              ? meetData.map((item) => (
                  <MeetItem
                    lawyerId={item.lawyerId}
                    key={item._id}
                    date={item.date}
                  />
                ))
              : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
