import * as React from "react";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { database, storage } from "../firebase";
import "./Signup.css"
import insta from "../assets/insta.jpg"

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {signUp} = useContext(AuthContext)

    const handleClick = async () => {
        if (file == null) {
            setError("Please upload profile image")
            setTimeout(() => {
                setError('')
            }, 2000)
        }
        try {
            setError('')
            setLoading(true)
            let userObj = await signUp(email, password)
            let uid = userObj.user.uid
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file)
            uploadTask.on('state_changed', fn1, fn2, fn3);
            function fn1 (snapshot) {
                console.log("snapshot issss----->", snapshot);
                let progress = (snapshot._delegate.byteTransferred / snapshot._delegate.totalBytes) * 100
                console.log(`Upload is ${progress} done`);
            }
            function fn2 (error) {
                setError(error)
                setTimeout(() => {
                    setError('')
                }, 2000)
                setLoading(false)
                return
            }
            function fn3 () {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullName: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })
                })
                setLoading(false)
                navigate("/")
            }
        } catch(err) {
            setError(err)
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }

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
              {error && <Alert severity="error">{error}</Alert>}
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"value={password} onChange={(e) => setPassword(e.target.value)}/>
              <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small"value={name} onChange={(e) => setName(e.target.value)}/>
              <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" component="label">
              Upload Profile Image
              <input type='file' accept='image/*' hidden onChange={(e) => setFile(e.target.files[0])}/>
            </Button>
            </CardContent>
          <CardActions>
            <Button color="primary" fullWidth={true} variant="contained" disable={loading} onClick={handleClick}>
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
