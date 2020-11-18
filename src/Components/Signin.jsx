import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../styles/Signin.css"
import qs from "qs";
import {useHistory} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  button:{
    color:"white",
    backgroundColor:"#476ca6",
    "&:hover":{
      backgroundColor:"#90a2bd"
    }
  }
}));

function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const updateLoginInfo =(e)=>{
    let id = e.currentTarget.id
    if(id==="username"){
      setUsername(e.currentTarget.value)
    }else{
      setPassword(e.currentTarget.value)
    }
  }
  const signin=async()=>{
   let response= await fetch("/api/v1/oauth/token", {
 method: "POST",
  body: qs.stringify({grant_type:"password",username:username,password:password}),
  headers: {
    "Authorization": "Basic cF92b2RfcG9ydGFsX2NsaWVudDpkM2tYam9ZWE1FM0xJa3ZkdVNqVmJ3eEN6ckh4dV8=",
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Tenantid": "p_vod"
  },
})
  let parsedResponse = await response.json()
  let accessToken = parsedResponse.access_token
  localStorage.setItem('accessToken',accessToken);
  if(response.ok){
    console.log("hello")
    history.push("/parking")
  }
  }
    return (
        <div id="signin">
          <h5>SIGN IN</h5>
          <p>Welcome back! Sign In and search for your parking spot</p>
      <form id="inputform" className={classes.root} noValidate autoComplete="off">
        <TextField id="username"  onChange={(e)=>updateLoginInfo(e)} label="Username" variant="outlined"  />
        <TextField id="password" type="password" onChange={(e)=>updateLoginInfo(e)} label="Password" variant="outlined" />
        <Button className={classes.button} onClick={()=>signin()} variant="contained">SIGN IN</Button>
      </form>
        </div>
    );
}

export default (SignIn)