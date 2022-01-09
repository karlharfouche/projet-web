import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppHeader from './modules/views/AppHeader';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'


function SignUp() {
  const [sent, setSent] = React.useState(false)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [faculty, setFaculty] = React.useState('')
  const [major, setMajor] = React.useState('')
  const [number, setNumber] = React.useState(0)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const history = useHistory()

  const [faculties, setFaculties] = useState([])
  const [majors, setMajors] = useState([])

  const validate = (values) => {
    const errors = required(['firstName', 'lastName','faculty', 'email', 'password'], values);

    return errors;
  };

  async function handleSubmit(event) {
    setSent(true);

    event.preventDefault()

    const response = await fetch('http://localhost:4000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        faculty,
        major,
        number,
        email,
        password,
      })
    })

    const data = await response.json()

    if(data.status === 'ok') {
      history.push('/sign-in')
    }
  }

  async function getFaculties() {
    const response = await fetch('http://localhost:4000/api/faculties/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

    const data = await response.json()

    console.log(data)

    setFaculties(data)
  }

  async function getMajors() {
    const response = await fetch('http://localhost:4000/api/majors/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

    const data = await response.json()

    console.log(data)

    setMajors(data)
  }


  useEffect(() => {
    getFaculties()
    getMajors()
  }, [])

  return (
    <React.Fragment>
      <AppHeader />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/sign-in" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    value={firstName}
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                  <OnChange name="firstName">
                    {(value) => {setFirstName(value)}}
                  </OnChange>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    value={lastName}
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                  <OnChange name="lastName">
                    {(value) => {setLastName(value)}}
                  </OnChange>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: 0.3 }}>
                <Grid item xs={12} sm={6}>
                  <Field
                    value={faculty}
                    autoFocus
                    component={'select'}
                    disabled={submitting || sent}
                    fullWidth
                    label="Faculty"
                    name="faculty"
                    style={{width:'100%' , height:60}}  
                    required
                >
                  <option/>
                  {faculties.map(fac => {
                    return(
                      <option> {fac.name} </option>
                    )
                  })}
                  </Field>
                  <OnChange name="faculty">
                    {(value) => {setFaculty(value)}}
                  </OnChange>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    value={major}
                    component={"select"}
                    disabled={submitting || sent}
                    fullWidth
                    label="Major"
                    name="major"
                    required
                    style={{width:'100%' , height:60}}  
                  >
                    <option/>
                    {majors.filter(major => major.faculty === faculty).map(major => {
                      return(
                        <option> {major.name} </option>
                      )
                    })}
                  </Field>
                  <OnChange name="major">
                    {(value) => {setMajor(value)}}
                  </OnChange>
                </Grid>
              </Grid>
              <MuiPhoneNumber 
                value={number}
                onChange={(value) => setNumber(value)}
                defaultCountry={'lb'} 
                label='Phone Number' 
                name='number'
                sx={{pt: 1}}
              />

              <Field
                value={email}
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <OnChange name="email">
                {(value) => {setEmail(value)}}
              </OnChange>
              
              <Field
                value={password}
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
                sx={{ marginBottom: 4 }}
              />
              <OnChange name="password">
                {(value) => {setPassword(value)}}
              </OnChange>
              
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              
              <FormButton
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
                sx={{ borderRadius: 3 , marginBottom: -2}}
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
