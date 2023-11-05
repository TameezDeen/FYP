import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BluesImage from "../assets/blues.png"
import CountryImage from "../assets/country.jpg"
import DanceImage from "../assets/dance.jpg"
import ElectronicImage from "../assets/electronic.png"
import FolkImage from "../assets/folk.webp"
import GospelImage from "../assets/gospel.jpg"
import HeavyMetalImage from "../assets/heavymetal.jpg"
import JazzImage from "../assets/jazz.jpg"
import NewAgeImage from "../assets/newagemusuic.jpg"
import PopImage from "../assets/pop.png"
import PunkImage from "../assets/punk.jpg"
import RnBImage from "../assets/rnb.jpg"
import ReggaeImage from "../assets/reggae.jpg"
import RockImage from "../assets/rock.jpg"

export default function MediaCard({track_name, artists, track_genre}) {

  const genreImages = {
    blues: BluesImage,
    country: CountryImage,
    dance: DanceImage,
    electronic: ElectronicImage,
    folk: FolkImage,
    gospel: GospelImage,
    heavy_metal: HeavyMetalImage,
    jazz: JazzImage,
    new_age: NewAgeImage,
    pop: PopImage,
    punk: PunkImage,
    rnb: RnBImage,
    reggae: ReggaeImage,
    rock: RockImage
  };


  const songImage = genreImages[track_genre.toLowerCase()];

  return (
    <Card sx={{ maxWidth: 180 }}>
      <CardMedia
        sx={{ height:200 }}
        image={songImage}
        title="songImage"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Song Name: {track_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          By:{artists}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          Genre:{track_genre}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Like</Button>
        <Button size="small">Dislike</Button>
      </CardActions>
    </Card>
  );
}