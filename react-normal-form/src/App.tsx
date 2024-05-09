import { useState } from 'react'
import './App.css'
import { Button, Stack, TextField } from '@mui/material'

type formDataProps = {
  username: string;
  email: string;
  password: string;
};

type textFieldProps = {
  name: string;
  value: string;
};

function App() {
  const [formData, setFormData] = useState<formDataProps>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (_event: { target: textFieldProps }) => {
    const { name, value } = _event.target;

    setFormData((preformData) => ({...preformData, [name]: value }));
  };

  const handleSubmit = () => {
    alert(`Name is "${formData.username}", Email is "${formData.email}", Password is "${formData.password}"`);
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <Stack gap={1} flexDirection="column">
          <TextField
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            />
          <TextField
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button variant="outlined" type="submit">submit</Button>
        </Stack>
      </form>
    </div>
  )
}

export default App
