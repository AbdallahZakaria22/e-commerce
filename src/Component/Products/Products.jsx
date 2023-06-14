import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

<Formik
  initialValues={{
    name: '',
    days: [],
    times: []
  }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
    <Form>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
      {errors.name && touched.name && <div>{errors.name}</div>}

      <label htmlFor="days">Days</label>
      <select multiple name="days" onChange={handleChange} onBlur={handleBlur} value={values.days}>
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
        <option value="saturday">Saturday</option>
        <option value="sunday">Sunday</option>
      </select>
      {errors.days && touched.days && <div>{errors.days}</div>}

      <label htmlFor="times">Times</label>
      {timeOptions.map((timeOption, index) => (
        <div key={index}>
          <label>{timeOption.label}</label>
          <div>
            <select name={`times[${index}].from`} onChange={handleChange} onBlur={handleBlur} value={values.times[index]?.from}>
              <option value="">From</option>
              {generateTimeOptions().map(timeOption => (
                <option key={timeOption} value={timeOption}>{timeOption}</option>
              ))}
            </select>
            {errors.times && errors.times[index] && errors.times[index].from && touched.times && touched.times[index] && touched.times[index].from && <div>{errors.times[index].from}</div>}
            <select name={`times[${index}].to`} onChange={handleChange} onBlur={handleBlur} value={values.times[index]?.to}>
              <option value="">To</option>
              {generateTimeOptions().map(timeOption => (
                <option key={timeOption} value={timeOption}>{timeOption}</option>
              ))}
            </select>
            {errors.times && errors.times[index] && errors.times[index].to && touched.times && touched.times[index] && touched.times[index].to && <div>{errors.times[index].to}</div>}
          </div>
        </div>
      ))}
      {errors.times && touched.times && <div>{errors.times}</div>}

      <button type="submit" disabled={isSubmitting}>Submit</button>
    </Form>
  )}
</Formik>
