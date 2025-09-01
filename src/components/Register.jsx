import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

export default function Register() {

  const navigate = useNavigate()  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) =>{ 
    signUp(data)
  };

  const signUp =(data)=>{
        localStorage.setItem("userName" , data.userName);
        localStorage.setItem("password" , data.password);
        localStorage.setItem("email" , data.mail);

        setTimeout(() => {
            navigate("/login")
        }, 500);
  }

  return (
    <section className='section-form border shadow-sm  rounded-3 px-3 py-5'>
      <h2>Register User</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="userName"
            placeholder="Enter User Name"
            className='rounded-pill py-2 mb-3 ps-3 '
            {...register('userName', { required: 'userName is required' })}
            aria-invalid={errors.userName ? 'true' : 'false'}
          />
          {errors.userName && <p role="alert">{errors.userName.message}</p>}
          <input
            type="email"
            id="userEmail"
            placeholder="Enter User Email"
            className='rounded-pill py-2 mb-3 ps-3 '
            {...register('mail', {
              required: 'Email Address is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
            aria-invalid={errors.mail ? 'true' : 'false'}
          />
          {errors.mail && <p role="alert">{errors.mail.message}</p>}
          <input
            type="password"
            id="userPassword"
            placeholder="Enter User Password"
            className='rounded-pill py-2 mb-3 ps-3 '
            {...register('password', { required: 'Password is required' })}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}


         <input type="submit" value="Sign up" className='rounded-pill py-2 mb-3 ps-3 text-light bg-dark'/>

        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-dark">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}