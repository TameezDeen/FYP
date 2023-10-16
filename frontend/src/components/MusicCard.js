import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SongImg from "../assets/song.jpeg"


export default function MediaCard({track_name, artists, track_genre}) {
  return (
    <Card sx={{ maxWidth: 180 }}>
      <CardMedia
        sx={{ height:200 }}
        image={SongImg}
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
    </Card>
  );
}