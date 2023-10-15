import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SongImg from "../assets/song.jpeg"


export default function MediaCard({song, artist, cat}) {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        sx={{ height:200 }}
        image={SongImg}
        title="songImage"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Song Name: {song}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          By:{artist}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          Genre:{cat}
        </Typography>
      </CardContent>
    </Card>
  );
}