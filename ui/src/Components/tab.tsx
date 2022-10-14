import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { employerInterface } from "../models/Iemployer";
import Avatar from "@mui/material/Avatar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navlink: {
    color: "white",
    textDecoration: "none",
  },
}));

export default function Tabs() {
  const classes = useStyles();
  const [employer, setEmployer] = useState<employerInterface>();
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const getEmployer = async () => {
    let id = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/employer/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setEmployer(res.data);
          console.log(res.data);
        } else {
          console.log("else");
        }
      });
  };
  useEffect(() => {
   
    getEmployer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    
      
      <AppBar position="static">
        <div className="folat">
          <Toolbar>
          <Link className={classes.navlink} to="/">
            <Typography variant="h6" className={classes.title}>
              Home
            </Typography>
          </Link>
          <div className="marginL">
          <Link className={classes.navlink} to="/Create">
            <Typography variant="h6" className={classes.title}>
              บันทึกข้อมูลผู้เช่า
            </Typography>
          </Link>
          </div>
          <div className="marginL">
          <Link className={classes.navlink} to="/Data">
            <Typography variant="h6" className={classes.title}>
              ข้อมูลผู้เช่า
            </Typography>
          </Link>
          </div>
        </Toolbar>
        </div>
        <div className="profile">
        <Avatar className="icon" sx={{ width: 56, height: 56 }}>
            {employer?.Email[0]}
          </Avatar>
          <p className="username"> Email: {employer?.Email}</p>

        
          <div className="logout">
            <br />
            <Button
            
            variant="contained"
            color="secondary"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
     
        </AppBar>
  );
}

