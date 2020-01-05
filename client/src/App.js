import React from 'react';
import api from './api';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from "@material-ui/core/Box";
import {displayFilesNames, formatData} from './utils';


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    width: '100%',
    margin: 20
  },
  media: {
    minHeight: 345,
  },
});

function App() {
  const classes = useStyles();
  const [state, setstate] = React.useState({
    images: [],
    formImages: []
  })

  React.useEffect(() => {
    api.getImages()
      .then((images = []) => setstate({images}))
  }, [])

  const handleChange = (e) => {
    setstate({...state, formImages: e.target.files})
  }

  const handleDelete = (id) => {
    api.deleteImage(id)
    .then(images => setstate({...state, images}))
  }

  const onSubmit = (e) => {
    const data = formatData(state.formImages)
    api.postImages(data)
    .then(images => setstate({...state, images}))
    
    e.preventDefault()
  }

  const renderImages = () => {
    return state.images.map((item) => (
      <Card className={classes.card} key={item.filename}>
        <CardMedia
          className={classes.media}
          image={process.env.REACT_APP_API + '/image/' + item.filename}
          title={item.filename}
        />
        <CardActions>
          <Button color="primary" component='a' href={process.env.REACT_APP_API + '/image/' + item.filename}>
            View
          </Button>
          <Button color="secondary" onClick={() => handleDelete(item._id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    ))
  }

  return (
    <Container>
      <Typography paragraph variant='h4' align='center'>
        GridFS File Uploads
      </Typography>
      <form onSubmit={onSubmit}>
        <Box display='flex'>
          <input
            accept="image/*"
            style={{display: 'none'}}
            type='file' 
            name='file' 
            id='file' 
            multiple 
            onChange={handleChange} 
          />
          <label htmlFor="file" style={{margin: 0, display: 'flex', alignItems: 'center', color: 'inherit'}}>
            <IconButton 
              color='inherit' 
              aria-label="upload picture" 
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <Button type='submit' color='inherit'>Submit</Button>
        </Box>
      </form>
      <Typography 
        paragraph
        style={{
            height: '100%',
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            maxWidth: 200, 
            margin: 0, 
            verticalAlign: 'middle',
            lineHeight: 1,
            width: '100%'
          }}
        >
          {(state.formImages) && displayFilesNames(state.formImages)}
        </Typography>

      <Box display='flex' flexWrap='wrap'>
        {(state.images && state.images.length) ? renderImages() : 'No Images'}
      </Box>
    </Container>
  );
}

export default App;
