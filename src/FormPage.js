import React from 'react';
import { Formik, Form } from 'formik';
import CustomInput from './CustomInput';
import { validationSchema } from './validationSchema';
import './styles.css';

const FormPage = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data.message);
      resetForm(); 
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <CustomInput label="Username" name="username" type="text" placeholder="Enter Username" />
              <CustomInput label="Email" name="email" type="email" placeholder="Enter Email"/>
              <CustomInput label="Password" name="password" type="password" placeholder="Enter Password"/>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormPage;
