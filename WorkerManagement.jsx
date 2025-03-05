import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { GrUserWorker } from "react-icons/gr";
import { MdCountertops } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { MdPhoneInTalk } from "react-icons/md";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  IconButton,
  Avatar,
  MenuItem,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Select,
} from "@mui/material";
import {
  Person,
  Phone,
  Call,
  Room,
  Lock,
  AccountCircle,
  Public,
  Delete,
  Search,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import { BiSend } from "react-icons/bi";

const placeholderImage = "https://via.placeholder.com/150";

const WorkerManagement = () => {
  const [workerData, setWorkerData] = useState({
    name: "",
    workerNumber: "",
    counterNumber: "",
    phone: "",
    emergencyCall: "",
    address: "",
    country: "Others",
    username: "",
    password: "",
    image: "",
    imageName: "",
    joiningDate: "",
  });

  const [workers, setWorkers] = useState([{ image: placeholderImage, name: "joseph", workerDetail: "Worker Number", CounterNo: "Counter no", phone: "1234567890", emgno: "123", address: "Worker Address", username: "jos", password: "Password", nationality: "Indian" },
    { image: placeholderImage, name: "alexandar", workerDetail: "Worker Number", CounterNo: "Counter no", phone: "1234567890", emgno: "456", address: "Worker Address", username: "alex", password: "Password", nationality: "Saudi" },
    { image: placeholderImage, name: "rohit", workerDetail: "Worker Number", CounterNo: "Counter no", phone: "1234567890", emgno: "7890", address: "Worker Address", username: "hit", password: "Password", nationality: "Indian" },
    { image: placeholderImage, name: "kholi", workerDetail: "Worker Number", CounterNo: "Counter no", phone: "1234567890", emgno: "1290", address: "Worker Address", username: "vk", password: "Password", nationality: "Indian" },
    { image: placeholderImage, name: "abde", workerDetail: "Worker Number", CounterNo: "Counter no", phone: "1234567890", emgno: "6789", address: "Worker Address", username: "abd", password: "Password", nationality: "Saudi" },
    { image: placeholderImage, name: "gayle", workerDetail: "Worker Number", CounterNo: "Counter no", phone: "1234567890", emgno: "4580", address: "Worker Address", username: "gyl", password: "Password", nationality: "Saudi" },
    ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("All");
  const [editIndex, setEditIndex] = useState(null);

  const dateInputRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/workers/workers');
      setWorkers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setWorkerData({ ...workerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        await axios.put(`http://localhost:5001/api/workers/update-worker/${workers[editIndex]._id}`, workerData);
      } else {
        await axios.post('http://localhost:5001/api/workers/add-worker', workerData);
      }
      fetchWorkers();
      setWorkerData({
        name: "",
        workerNumber: "",
        counterNumber: "",
        phone: "",
        emergencyCall: "",
        address: "",
        country: "Others",
        username: "",
        password: "",
        image: "",
        imageName: "",
        joiningDate: "",
      });
      setEditIndex(null);
      alert('Worker saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving worker');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWorkerData({
        ...workerData,
        image: URL.createObjectURL(file),
        imageName: file.name,
      });
    }
  };

  const handleRemoveImage = () => {
    setWorkerData({ ...workerData, image: null, imageName: "" });
  };

  const handleDateButtonClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setWorkerData({ ...workerData, joiningDate: date });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleNationalityFilter = (nationality) => {
    setNationalityFilter(nationality);
  };


  const handleAddWorker = () => {
    const newWorker = {
      image: workerData.image || placeholderImage,
      name: workerData.name,
      workerDetail: workerData.workerNumber,
      CounterNo: workerData.counterNumber,
      phone: workerData.phone,
      emgno: workerData.emergencyCall,
      address: workerData.address,
      username: workerData.username,
      password: workerData.password,
      nationality: workerData.country,
      joiningDate: workerData.joiningDate, // Include joining date in the new worker
    };

    if (editIndex !== null) {
      // Update existing worker
      const updatedWorkers = [...workers];
      updatedWorkers[editIndex] = newWorker;
      setWorkers(updatedWorkers);
      setEditIndex(null); // Exit edit mode
    } else {
      // Add new worker
      setWorkers([...workers, newWorker]);
    }

    // Reset form
    setWorkerData({
      name: "",
      workerNumber: "",
      counterNumber: "",
      phone: "",
      emergencyCall: "",
      address: "",
      country: "Others",
      username: "",
      password: "",
      image: null,
      imageName: "",
      joiningDate: "",
    });
  };












  const handleEditWorker = (index) => {
    const worker = workers[index];
    setWorkerData({
      name: worker.name,
      workerNumber: worker.workerNumber,
      counterNumber: worker.counterNumber,
      phone: worker.phone,
      emergencyCall: worker.emergencyCall,
      address: worker.address,
      country: worker.country,
      username: worker.username,
      password: worker.password,
      image: worker.image,
      imageName: worker.image ? "image.png" : "",
      joiningDate: worker.joiningDate || "",
    });
    setEditIndex(index);
  };

  const handleDeleteWorker = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/workers/delete-worker/${id}`);
      fetchWorkers();
      alert('Worker deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting worker');
    }
  };

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearchTerm =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNationality =
      nationalityFilter === "All" || worker.country === nationalityFilter;

    const matchesMonth =
      selectedMonth === "All" ||
      new Date(worker.joiningDate).toLocaleString("default", { month: "long" }) === selectedMonth;

    const matchesDate =
      !selectedDate || new Date(worker.joiningDate).toLocaleDateString() === new Date(selectedDate).toLocaleDateString();

    return matchesSearchTerm && matchesNationality && matchesMonth && matchesDate;
  });

  return (
    <Paper style={{ fontFamily: "Arial", fontWeight: 'bold', overflow: 'hidden', height: '100vh', position: 'fixed' }} fullWidth>
      <div style={{
        width: "100%", background: "#fdb913", height: "45px", padding: "4px",
        textAlign: "center", fontSize: "26px", color: "white", lineHeight: "50px", fontWeight: "bold"
      }}>
        ADD WORKERS
      </div>

      <Grid container spacing={0} sx={{ mt: '10px' }}>
        <Grid item xs={3} mt={-2}>
          <Paper
            elevation={3}
            sx={{
              width: isSmallScreen ? "100%" : 350,
              p: 2,
              mt: -3,
              textAlign: "center",
              backgroundColor: "#f8f8f8",
              position: isSmallScreen ? "static" : "absolute",
              left: 0,
              margin: "10px",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              height: '85vh'
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontFamily: "Caladea, serif",
                fontSize: isSmallScreen ? "20px" : "25px",
                mb: 1,
              }}
            >
              Workers Detail
              <IconButton
                sx={{
                  backgroundColor: "black",
                  borderRadius: "6px",
                  height: "35px",
                  width: "40px",
                  border: "1px solid black",
                  ml: isSmallScreen ? 2 : 8,
                }}
                onClick={handleDateButtonClick}
              >
                <CalendarMonthIcon sx={{ color: "#f0f0f0", fontSize: "35px" }} />
                <input
                  type="date"
                  ref={dateInputRef}
                  style={{
                    width: "0px",
                    height: "0px",
                    backgroundColor: "#FFB400",
                    border: "none",
                  }}
                  onChange={handleDateChange}
                />
              </IconButton>
            </Typography>

            <Paper
              elevation={2}
              sx={{
                p: 2,
                textAlign: "left",
                backgroundColor: "#fff",
                width: "100%",
                boxSizing: "border-box",
                mb: 1,
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="name"
                    placeholder="Name"
                    value={workerData.name}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="imageName"
                    placeholder="Add Image"
                    value={workerData.imageName}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton component="label">
                            <RiImageAddFill sx={{ color: "gray" }} />
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={handleImageChange}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: workerData.image && (
                        <InputAdornment position="end">
                          <IconButton onClick={handleRemoveImage}>
                            <Delete sx={{ color: "red" }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="workerNumber"
                    placeholder="Worker Number"
                    value={workerData.workerNumber}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <GrUserWorker sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="counterNumber"
                    placeholder="Counter Number"
                    value={workerData.counterNumber}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdCountertops sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="phone"
                    placeholder="Phone Number"
                    value={workerData.phone}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="emergencyCall"
                    placeholder="Emergency Call"
                    value={workerData.emergencyCall}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Call sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="address"
                    placeholder="Address"
                    value={workerData.address}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Room sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>




                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="emergencyCall"
                    placeholder="Emergency Call"
                    value={workerData.emergencyCall}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Call sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="address"
                    placeholder="Address"
                    value={workerData.address}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Room sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>




 */}




                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    name="country"
                    value={workerData.country}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Public sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  >
                    <MenuItem value="Others">Other</MenuItem>
                    <MenuItem value="Saudi">Saudi</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="username"
                    placeholder="User Name"
                    value={workerData.username}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    placeholder="Password"
                    value={workerData.password}
                    onChange={handleChange}
                    InputProps={{
                      sx: { borderRadius: "10px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "gray" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& input::placeholder": {
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                      "& input": {
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: "#f4a900",
                  color: "#000",
                  fontWeight: "bold",
                  width: "100%",
                  border: "1px solid black",
                  borderRadius: "10px",
                  fontSize: isSmallScreen ? "18px" : "23px",
                  fontFamily: "Caladea, serif",
                }}
                onClick={handleSubmit}
              >
                {editIndex !== null ? "UPDATE WORKER" : "ADD WORKERS"}
              </Button>
            </Paper>

            <Paper
              elevation={2}
              sx={{
                p: 2,
                textAlign: "left",
                backgroundColor: "#fff",
                width: "100%",
                boxSizing: "border-box",
                height: "149px",
                overflowY: "auto",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  {workerData.image ? (
                    <Avatar
                      src={workerData.image}
                      sx={{ width: 100, height: 130, borderRadius: 0 }}
                    />
                  ) : (
                    <Avatar
                      sx={{ width: 100, height: 130, bgcolor: "gray", borderRadius: 3 }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Caladea, serif" }}
                  >
                    <strong>Name:</strong> {workerData.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Caladea, serif" }}
                  >
                    <strong>Joining Date:</strong> {workerData.joiningDate}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Caladea, serif" }}
                  >
                    <strong>Worker No:</strong> {workerData.workerNumber} &nbsp;&nbsp;
                    <strong>Counter No:</strong> {workerData.counterNumber}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Caladea, serif" }}
                  >
                    <strong>Phone No:</strong> {workerData.phone}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Caladea, serif" }}
                  >
                    <strong>Emergency Call:</strong> {workerData.emergencyCall}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Caladea, serif" }}
                  >
                    <strong>Username:</strong> {workerData.username}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Caladea, serif" }}
                  >
                    <strong>Password:</strong> {workerData.password}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.8rem", fontFamily: "Caladea, serif" }}
                  >
                    <strong>Address:</strong> {workerData.address}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={9} sx={{ ml: 50 }}>
          <Card>
            <CardContent>
              <Grid container spacing={1} alignItems="center" style={{ marginBottom: 10 }}>
                <Grid item xs={3}>
                  <TextField
                    size="small"
                    placeholder="Search History Item"
                    variant="outlined"
                    fullWidth
                    border='1px solid black'
                    fontFamily="caladea"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                      sx: { borderRadius: "10px", border: "1px solid" },
                    }}
                  />
                </Grid>
                <Grid item>
                  <IconButton sx={{ backgroundColor: "#2f2f2f", fontFamily: "caladea", color: "#fff", borderRadius: "10px", width: 36, height: 36, border: "1px solid black" }}>
                    <Search />
                  </IconButton>
                </Grid>
                <Grid item xs={2}>
                  <Select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    size="small"
                    fullWidth
                    style={{ display: 'none', backgroundColor: "#ffbb33", height: '39px', borderRadius: '10px', border: '1px solid black' }}
                  >
                    <MenuItem value="All">Month</MenuItem>
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ].map((month) => (
                      <MenuItem key={month} value={month}>{month}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={1.6}>
                  <Button variant="contained" fullWidth style={{ display: "none", backgroundColor: "#ffbb33", borderRadius: '10px', border: '1px solid black', color: '#2f2f2f' }}>
                    Date
                    <CalendarMonthIcon />
                    <input
                      type="date"
                      ref={dateInputRef}
                      style={{ width: "0px", height: "0px", backgroundColor: "#FFB400", border: "none" }}
                      onChange={handleDateChange}
                    />
                  </Button>
                </Grid>
                <Grid item xs={1.4}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: "#ffbb33", fontSize: '18px', textTransform: "none", fontWeight: 'bold', fontFamily: "caladea", color: "#000", borderRadius: '10px', border: '1px solid black' }}
                    onClick={() => handleNationalityFilter("Others")}
                  >
                    Others
                  </Button>
                </Grid>
                <Grid item xs={1.4}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: "#ffbb33", fontWeight: 'bold', fontSize: '18px', textTransform: "none", fontFamily: "caladea", color: "#000", borderRadius: '10px', border: '1px solid black' }}
                    onClick={() => handleNationalityFilter("Saudi")}
                  >
                    Saudi
                  </Button>
                </Grid>
                <Grid item xs={1.9}>
                  <Button
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: "#2f2f2f", textTransform: "none", fontWeight: 'bold', fontSize: '18px', fontFamily: "caladea", color: "white", borderRadius: '10px', border: '1px solid black' }}
                    onClick={() => setSearchTerm("")}>
                    View All
                  </Button>
                </Grid>
              </Grid>

              <TableContainer component={Paper} style={{ height: 500, overflow: "auto" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {['Image', 'Name', 'Worker Detail', 'Phone No.', 'Emg No.', 'Worker Address', 'User Name', 'Password', 'Edit', 'Delete'].map((head) => (
                        <TableCell key={head} style={{ color: "#fff", fontWeight: "bold", backgroundColor: "#2f2f2f", fontFamily: "Arial", fontWeight: 'bold' }}>
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredWorkers.map((worker, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <img src={worker.image} alt="worker" style={{ borderRadius: "50%", width: "40px", height: "40px" }} />
                        </TableCell>
                        <TableCell sx={{ fontFamily: "Arial", fontWeight: 'bold' }}>{worker.name}</TableCell>
                        <TableCell sx={{ fontFamily: "Arial", fontWeight: 'bold' }}>
                          {worker.workerNumber}
                          <Typography variant="body2" style={{ color: "#888", fontWeight: 'bold' }}>
                            {worker.counterNumber}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontFamily: "Arial", fontWeight: 'bold' }}>{worker.phone}</TableCell>
                        <TableCell sx={{ fontFamily: "Arial", fontWeight: 'bold' }}>{worker.emergencyCall}</TableCell>
                        <TableCell sx={{ fontFamily: "Arial", fontWeight: 'bold' }}>{worker.address}</TableCell>
                        <TableCell sx={{ fontFamily: "Arial", fontWeight: 'bold' }}>{worker.username}</TableCell>
                        <TableCell sx={{ fontFamily: "Arial", fontWeight: 'bold' }}>{worker.password}</TableCell>
                        <TableCell sx={{ fontFamily: "Arial", fontWeight: 'bold' }}>
                          <IconButton
                            sx={{
                              bgcolor: "#fdb913",
                              color: "white",
                              borderRadius: "10px",
                              border: "2px solid black",
                              width: "40px",
                              height: "40px",
                              marginRight: "5px",
                              "&:hover": { bgcolor: "#2f2f2f" },
                            }}
                            onClick={() => handleEditWorker(index)}
                          >
                            <BiSend style={{ fontSize: "20px" }} />
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ fontFamily: "Arial", fontWeight: 'bold' }}>
                          <IconButton
                            sx={{
                              bgcolor: "red",
                              color: "white",
                              borderRadius: "10px",
                              border: "2px solid black",
                              width: "40px",
                              height: "40px",
                              "&:hover": { bgcolor: "#2f2f2f" },
                            }}
                            onClick={() => handleDeleteWorker(worker._id)}
                          >
                            <Delete style={{ fontSize: "20px" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WorkerManagement;