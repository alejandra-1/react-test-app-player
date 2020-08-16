import React, {useState, useEffect} from "react";
import {useParams} from "react-router";
import axios from "axios";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import Typography from '@material-ui/core/Typography';
import {Card} from "@material-ui/core";
import {grey} from '@material-ui/core/colors';
// import {useHistory} from "react-router-dom";
// import {useAlert} from 'react-alert';

import '../../utils/functions';

interface RouteParams {
  id: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: "#151515",
      // maxWidth: 360,
      // backgroundColor: theme.palette.background.paper,
    },
  })
);

const api = axios.create({
  baseURL: `https://i8rmpiaad2.execute-api.us-east-1.amazonaws.com/dev/api`,
});

const Songs = () => {
  const params = useParams<RouteParams>();
  const [songs, setSongs]: any = useState([]);
  const [randomS, setRandomS]: any = useState([]);
  const classes = useStyles();
  // const alert = useAlert();

  useEffect(() => {
    api
      .get(`/album/${params.id}/songs`)
      .then((result) => {
        const idSongsList = parseInt(params.id) - 1; // la posición de las canciones es igual a la del álbum 
        const data: any = result.data[idSongsList].songs;
        // console.log("Songs: ", data);
        setSongs(data);
      })
      .catch((error) => {
        console.log("Error al llamar API de canciones!");
      });

      api
      .get(`/album/id/songs`)
      .then((info) => {
        setRandomS(info.data);
      })
      .catch((error) => {
        console.log("Error al llamar API de canciones!");
      });

  }, [params.id]);

  // const history = useHistory();

  const handleSong= (id?: number) => () => {
    console.log(id)
    // return alert.show('Cargando....');
    // id && history.push(`play/${id}`);
  };

  const randomSongs= (albums: any, element: React.ReactElement) => () => {
    var min = 1;
    var max = 130;
    var rand =  min + (Math.random() * (max-min));
    const data: any = albums[rand];
    console.log('Random: ', data);

    // return [0, 1, 2].map((value) =>
    //   React.cloneElement(element, {
    //     key: value,
    //   }),
    // );
  };
  
  return (
    <>
      <Card className={classes.root} elevation={3} >
        <Typography gutterBottom variant="h3" component="h2" style={{ color: grey[500] }} >
          Canciones
        </Typography>
        <div className="container-item" style={{ color: grey[300] }}>
          <List component="nav" className={classes.root} aria-label="songs">
            {songs.length > 0          
              ? songs.map((song: { [key: string]: any }) => (       
                <ListItem button key={`song-${song.id}`} onClick={handleSong(!!song.id ? song.id : undefined)} >
                  <ListItemIcon style={{ color: grey[700] }}>
                    <MusicNoteRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={song.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="duration" style={{ color: grey[500] }}>
                      {song.duration}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                ))
              : "No se encontraron canciones para este album"}
          </List>
        </div>
          <Typography gutterBottom variant="h4" component="h2" style={{ color: grey[500] }} >
            Sugerencias
          </Typography>
          <div className="container-item" style={{ color: grey[300] }}>
            <List component="nav" className={classes.root} aria-label="songs">
              {randomSongs(
                randomS,   
                <ListItem button>
                  <ListItemIcon style={{ color: grey[700] }}>
                    <MusicNoteRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="" />
                </ListItem>
                )}
            </List>
          </div>
      </Card>
    </>
  );
};

export default Songs;