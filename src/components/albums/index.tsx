import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router";
import axios from "axios";

import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import {grey} from '@material-ui/core/colors';

// import {SONGS} from "../../routes";

interface RouteParams {
  id: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: "#151515",
    },
    media: {
      height: 140,
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    custom: {
      aling: "center",
      backgroundColor: "#151515",
    },
  })
);

const api = axios.create({
  baseURL: `https://i8rmpiaad2.execute-api.us-east-1.amazonaws.com/dev/api`,
});

const Albums = () => {
  const params = useParams<RouteParams>();
  const [albums, setAlbums]: any = useState([]);
  const [artist, setArtist]: any = useState([]); 

  useEffect(() => {

    api
      .get(`/artists/${params.id}/albums`)
      .then((result) => {
        const idAlbumList = parseInt(params.id) - 1; // En el API la posición de los álbumes es igual a la del artista 
        const data: any = result.data[idAlbumList].albums;
        // console.log("Albums: ", data);
        setAlbums(data);
      })
      .catch((error) => {
        console.log("Error consumiendo API de álbums");
      });

      api
      .get(`/artists/${params.id}`)
      .then((res) => {
        setArtist(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });

  }, [params.id]);

  const history = useHistory();
  const classes = useStyles();
  
  const handleAlbum = (id?: number) => () => {
    // console.log(id)
    id && history.push(`songs/${id}`);
  };

  return (
    <>
      <Card className={classes.root}>
        <Typography gutterBottom variant="h3" component="h2" style={{ color: grey[500] }}>
          Álbumes
        </Typography>
        <CardActionArea className={classes.custom}>
          <CardContent style={{ color: grey[500] }}>
            <Avatar
              alt={artist.name}
              src={artist.image}
              className={classes.large}
            />
            <Typography gutterBottom variant="h5" component="h2">
              {artist.name}
            </Typography>
            <Typography variant="body2" color="primary" component="p">
              {artist.popularity}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div className="container-item" style={{ color: grey[300] }}>
            <List>
              {albums.length > 0          
                ? albums.map((album: { [key: string]: any }) => (              
                    <ListItem 
                      key={`album-${album.id}`}
                      onClick={handleAlbum(!!album.id ? album.id : undefined)}
                      style={{ color: grey[500] }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          alt={album.name} 
                          src={album.image}
                        />
                      </ListItemAvatar>
                      <ListItemText style={{ color: "inherit" }}
                        primary={album.name}
                        secondary={'Canciones: ' + album.total_tracks}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="play">
                          <PlayArrowRoundedIcon 
                            fontSize="large"
                            onClick={handleAlbum(!!album.id ? album.id : undefined)}
                            style={{ color: grey[500] }}
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                : null}
            </List>
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default Albums;