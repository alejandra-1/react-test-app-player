import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// import {ALBUMS} from "../../routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    custom: {
      backgroundColor: "#151515",
    },
  })
);

const api = axios.create({
  baseURL: `https://i8rmpiaad2.execute-api.us-east-1.amazonaws.com/dev/api`,
});

const Artists = () => {
  const [artists, setArtists]: any = useState([]);

  useEffect(() => {
    api
      .get("/artists")
      .then((result) => {
        // console.log("Artists: ", result);
        setArtists(result.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const classes = useStyles();
  const history = useHistory();

  const handledArtist = (id: any) => {
    // console.log('Id: ',id)
    id && history.push(`albums/${id}`);
    // history.push(`${ALBUMS}:${id}`);
  };

  return (
    <>
      <Card className={classes.custom} elevation={3}>
        <div className="container-item" style={{ display: "flex" }}>
          {artists.length > 0
            ? artists.map((artist: { [key: string]: any }) => (
                <div className="item" key={`artist-${artist.id}`} >
                    <Avatar
                      alt={artist.name}
                      src={artist.image}
                      className={classes.large}
                      onClick={() => {
                        handledArtist(artist.id)
                      }}
                    />
                </div>
              ))
            : null}
        </div>
      </Card>
    </>
  );
};

export default Artists;