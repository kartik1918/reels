import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Link, Navigate, useHistory } from "react-router-dom";
import "./Login.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { AuthContext } from "../context/AuthContext";
import carbg from "../assets/carbg.jpg";
import insta from "../assets/insta.jpg";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  const {login} = useContext(AuthContext);

  const handleClick = async () => {
    try {
        setError('')
        setLoading(true)
        let res = await login(email, password)
        setLoading(false)
        history.push('/')
    } catch(err) {
        setError(err)
        setTimeout(() => {
            setError('')
        }, 2000)
        setLoading(false)
    }
  }

  return (
    <div className="loginWrapper">
      <div
        className="imgcar"
        style={{
          backgroundImage: "url(" + carbg + ")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="car">
          <CarouselProvider
            visibleSlides={1}
            totalSlides={3}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src={bg1} />
              </Slide>
              <Slide index={1}>
                <Image src={bg2} />
              </Slide>
              <Slide index={2}>
                <Image src={bg3} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="loginCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} />
          </div>
          <CardContent>
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography
              sx={{ textAlign: "center" }}
              color="primary"
              variant="subtitle1"
            >
              Forget Password ?
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" fullWidth={true} variant="contained" onClick={handleClick} disabled={loading}>
              Log In
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" sx={{ height: "7vh", marginTop: "2%" }}>
          <CardContent>
            <Typography
              sx={{ color: "grey", textAlign: "center" }}
              variant="subtitle1"
            >
              Dont't have an account ?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
