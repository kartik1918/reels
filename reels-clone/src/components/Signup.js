import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import {Link} from "react-router-dom"
import "./Signup.css"
import insta from "../assets/insta.jpg"

export default function Signup() {
  return (
    <div className="signUpWrapper">
      <div className="signUpCard">
        <Card variant="outlined">
            <div className="insta-logo">
                <img src={insta} />
            </div>
            <CardContent>
              <Typography sx={{color: "grey", textAlign: "center"}} variant="subtitle1">
                Sign up to see photos and videos from your friends
              </Typography>
              {true && <Alert severity="error">This is an error alert — check it out!</Alert>}
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small"/>
              <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"/>
              <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small"/>
              <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" component="label">
              Upload Profile Image
              <input type='file' accept='image/*' hidden/>
            </Button>
            </CardContent>
          <CardActions>
            <Button color="primary" fullWidth={true} variant="contained">
              SIGN UP
            </Button>
          </CardActions>
          <CardContent>
              <Typography sx={{color: "grey", textAlign: "center"}} variant="subtitle1">
                By signing up you agree to our Terms, Data policy and Cookies Policy
              </Typography>
            </CardContent>
        </Card>
        <Card variant="outlined" sx={{height: "7vh", marginTop: "2%"}}>
        <CardContent>
              <Typography sx={{color: "grey", textAlign: "center"}} variant="subtitle1">
                Have an account? <Link to="/login" style={{textDecoration: "none"}}>Login</Link>
              </Typography>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
