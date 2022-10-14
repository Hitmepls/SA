import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { employerInterface } from "../models/Iemployer";
import { UsersInterface } from "../models/ITenant";
import { PrefixInterface } from "../models/IPrefix";
import { CantonInterface } from "../models/Icanton";
import { PrefectureInterface } from "../models/IPrefecture";
import { ProvinceInterface } from "../models/IProvince";
import { CareerInterface } from "../models/ICareer";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { GenderInterface } from "../models/IGender";


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

function CreateTenants() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [user, setUser] = useState<Partial<UsersInterface>>({});
  const [employer, setEmployer] = useState<employerInterface>();
  const [cantons, setCantons] = useState<CantonInterface[]>([]);
  const [prefixes, setPrefixes] = useState<PrefixInterface[]>([]);
  const [prefectures, setPrefectues] = useState<PrefectureInterface[]>([]);
  const [provinces, setProvinces] = useState<ProvinceInterface[]>([]);
  const [careers, setCareers] = useState<CareerInterface[]>([]);
  const [genders, setGender] = useState<GenderInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof user;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof user;
    setUser({
      ...user,
      [name]: event.target.value,
    });
  };
  const handleProvince = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    console.log(event.target.value);
    
    if(typeof event.target.value == 'number'){
      getPrefectues(event.target.value);
    }
  };
  const handlePrefecture = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    console.log(event.target.value);
    if(typeof event.target.value == 'number'){
      getCantons(event.target.value);
    }
  };
  const getPrefixes = async () => {
    fetch(`${apiUrl}/prefixes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPrefixes(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getCantons = async (id: number) => {
    fetch(`${apiUrl}/cantons/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCantons(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getPrefectues = async (id: number) => {
    fetch(`${apiUrl}/prefectures/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPrefectues(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getProvince = async () => {
    fetch(`${apiUrl}/provinces`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setProvinces(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getCareer = async () => {
    fetch(`${apiUrl}/careers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCareers(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getGender = async () => {
    fetch(`${apiUrl}/genders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGender(res.data);
        } else {
          console.log("else");
        }
      });
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
    getGender();
    getPrefixes(); 
    getProvince();
    getCareer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  function submit() {
    let data = {
      Name: user.Fname + " " + user.Lname,
      Idcard: user.Idcard,
      Tel: user.Tel,
      BirthDay: selectedDate,
      Age: convertType(user.Age),
      Address: convertType(user.Address) ,
      Village: user.Village,
      OwnerID: convertType(employer?.ID),
      PrefixID: convertType(user.PrefixID),
      CareerID: convertType(user.CareerID),
      GenderID: convertType(user.GenderID),
      CantonID: convertType(user.CantonID),
      Email:   user.Email,
    };
    console.log(JSON.stringify(data));

    const apiUrl = "http://localhost:8080/tenants";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Sucess
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Fail
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกข้อมูลสมาชิก
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <br />
              <p>ข้อมูลส่วนตัวผู้เช่า</p>
              <br />
              <FormControl variant="filled" className={classes2.formControl}>
                <InputLabel id="demo-simple-select-filled-label1">
                  คำนำหน้า
                </InputLabel>

                <Select
                  id="Prefix"
                  value={user.PrefixID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PrefixID",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {prefixes.map((item: PrefixInterface) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <TextField
                id="Fname"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="ชื่อ"
                value={user.Fname || ""}
                onChange={handleInputChange}
              />
              <br />
              <TextField
                id="Lname"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="นามสกุล"
                value={user.Lname || ""}
                onChange={handleInputChange}
              />
              <br />
              <TextField
                id="Idcard"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="บัตรประชาชน"
                value={user.Idcard || ""}
                onChange={handleInputChange}
              />
              <br />
              <TextField
                id="Tel"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="เบอร์โทร"
                value={user.Tel || ""}
                onChange={handleInputChange}
              />
              <br />
              <TextField
                id="Email"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="Email"
                value={user.Email || ""}
                onChange={handleInputChange}
              />
              <br />
              <TextField
                id="Age"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="อายุ"
                value={user.Age || ""}
                onChange={handleInputChange}
              />
              <br />
              <FormControl variant="filled" className={classes2.formControl}>
                <InputLabel id="demo-simple-select-filled-label1">
                  เพศ
                </InputLabel>

                <Select
                  id="Prefix"
                  value={user.GenderID}
                  onChange={handleChange}
                  inputProps={{
                    name: "GenderID",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {genders.map((item: GenderInterface) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <FormControl variant="filled" className={classes2.formControl}>
                <InputLabel id="demo-simple-select-filled-label1">
                  อาชีพ
                </InputLabel>

                <Select
                  id="Career"
                  value={user.CareerID}
                  onChange={handleChange}
                  inputProps={{
                    name: "CareerID",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {careers.map((item: CareerInterface) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
                    <br />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="WatchedTime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="วันเกิด"
                  format="yyyy/MM/dd "
                />
              </MuiPickersUtilsProvider>
              
               
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <br />
              <p>ที่อยู่</p>
              <br />

             
              <FormControl variant="filled" className={classes2.formControl}>
                <InputLabel id="demo-simple-select-filled-label3">
                  จังหวัด
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label3"
                  id="Province"
                  onChange={handleProvince}
                  inputProps={{
                    name: "ProvinceID",
                  }}
                >
                  <MenuItem  value="" >
                    <em>None</em>
                  </MenuItem>

                  {provinces.map((item: ProvinceInterface) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled" className={classes2.formControl}>
                <InputLabel id="demo-simple-select-filled-label2">
                  อำเภอ
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label2"
                  id="demo-simple-select-filled"
                  onChange={handlePrefecture}
                  inputProps={{
                    name: "PrefectureID",
                  }}
                >
                  <MenuItem value="" >
                    <em>None</em>
                  </MenuItem>

                  {prefectures.map((item: PrefixInterface) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
             
              <FormControl variant="filled" className={classes2.formControl}>
                <InputLabel id="demo-simple-select-filled-label1">
                  ตำบล
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label1"
                  id="Canton"
                  value={user.CantonID || ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "CantonID",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {cantons.map((item: CantonInterface) => (
                    <MenuItem value={item.ID} key={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                id="Address"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="บ้านเลขที่"
                value={user.Address || ""}
                onChange={handleInputChange}
              />
              <br />
              
              <br />
              <TextField
                id="Village"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="ชื่อหมู่บ้าน"
                value={user.Village || ""}
                onChange={handleInputChange}
              />
              <br />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button 
            component={RouterLink} to="/Data" 
            variant="contained" 
            color="primary"
            >
              แสดงข้อมูล
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default CreateTenants;
