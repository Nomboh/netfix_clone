import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Element, Genre, Movie } from "../typings";
import styles from "../styles/Modal.module.css";
import { Avatar, Button, Fab, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";
import { PlayArrow } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { green, grey } from "@mui/material/colors";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = React.useState<string>("");
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [muted, setMuted] = React.useState(true);
  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!movie) return;
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then(response => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  console.log(trailer, genres);
  return (
    <Dialog open={showModal} onClose={handleClose} maxWidth="lg">
      <Box
        sx={{
          position: "relative",
          padding: 5,
          height: "400px",
        }}
      >
        <Avatar
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            bgcolor: "#181818",
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </Avatar>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          style={{ position: "absolute", top: "0", left: "0" }}
          playing
          height="100%"
          width="100%"
          muted={muted}
        />
        <Box
          sx={{
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            bottom: 50,
            left: "0",
            width: "100%",
            px: 5,
          }}
        >
          <Stack spacing={2} direction="row">
            <Button variant="contained" startIcon={<PlayArrow />}>
              Play
            </Button>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>

            <Fab color="primary" aria-label="add">
              <ThumbUpAltOutlinedIcon />
            </Fab>
          </Stack>
          <Fab color="primary" aria-label="add">
            <VolumeOffOutlinedIcon />
          </Fab>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#141414", p: 5 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ sx: 2, lg: 8 }}
        >
          <Box sx={{ flex: 3 }}>
            <Stack spacing={2} direction="row" alignItems={"center"}>
              <Typography variant="body1" color={green[500]}>
                {movie?.vote_average * 10}% Match
              </Typography>
              <Typography variant="body1" color={grey[50]}>
                {movie?.release_date || movie?.first_air_date}
              </Typography>
              <div className={styles.hd}>HD</div>
            </Stack>
            <Typography variant="h6" color={grey[100]} mt={5}>
              {movie?.overview}
            </Typography>
          </Box>
          <Stack sx={{ flex: 1 }}>
            <Stack direction={"row"}>
              <Typography variant="body2" color={grey[600]} mt={5}>
                Genre:
              </Typography>
              <Typography variant="body1" color={grey[100]} mt={5}>
                {genres.map(genre => genre.name).join(", ")}
              </Typography>
            </Stack>

            <Stack direction={"row"}>
              <Typography variant="body2" color={grey[600]} mt={5}>
                Original language:
              </Typography>
              <Typography variant="body1" color={grey[100]} mt={5}>
                {movie?.original_language}
              </Typography>
            </Stack>

            <Stack direction={"row"}>
              <Typography variant="body2" color={grey[600]} mt={5}>
                Total Votes:
              </Typography>
              <Typography variant="body1" color={grey[100]} mt={5}>
                {movie?.vote_count}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}

export default Modal;
