import * as yup from 'yup';
import {
  Button,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import './App.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type formDataProps = {
  username: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

const schema: yup.ObjectSchema<formDataProps> = yup.object({
  username: yup.string().required('Valid username is required'),
  email: yup
    .string()
    .required('email address is required')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address'),
  password: yup.string().required('password is required'),
  acceptTerms: yup
    .bool()
    .required('accept terms is required')
    .oneOf([true], 'Accept Terms is required'),
});

function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>({ resolver: yupResolver(schema) });

  const onSubmit = (data: formDataProps) => {
    console.log(data);
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={1} flexDirection="column">
          <TextField
            id="username"
            label="Username"
            {...register('username')}
            error={errors.username ? true : false}
            helperText={errors.username?.message}
          />
          <TextField
            id="email"
            label="Email"
            {...register('email')}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={
              <Controller
                name="acceptTerms"
                control={control}
                render={({ field: { onChange } }) => (
                  <Checkbox
                    color="primary"
                    onChange={(e) => onChange(e.target.checked)}
                  />
                )}
              />
            }
            label={
              <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                I have read and agree to the Terms *
              </Typography>
            }
          />
          <br />
          <Typography variant="inherit" color="textSecondary">
            {errors.acceptTerms ? '(' + errors.acceptTerms.message + ')' : ''}
          </Typography>
          <Button variant="outlined" type="submit">
            submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default App;
