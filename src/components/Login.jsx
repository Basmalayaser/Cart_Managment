import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Login(){

  let getUserName = localStorage.getItem("userName");
  let getPassword = localStorage.getItem("password");  

  const {setUser} = useContext(UserContext)

  const navigate = useNavigate()  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) =>signIn(data)
  ;

  const signIn =(data)=>{
        if (getUserName && getUserName.trim() === data.userName.trim() && getPassword && getPassword.trim() === data.password.trim()) {
          setUser(data.userName)
          setTimeout(() => {
            navigate("/")
          }, 500);

        } else {
            toast.error("not valid")
        }
  }

  return (
    <section className='section-form border shadow-sm  rounded-3 px-3 py-5'>
      <h2>Login User</h2>

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
            type="password"
            id="userPassword"
            placeholder="Enter User Password"
            className='rounded-pill py-2 mb-3 ps-3 '
            {...register('password', { required: 'Password is required' })}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}


         <input type="submit" value="Sign In" className='rounded-pill py-2 mb-3 ps-3 text-light bg-dark' />

        <p>
         Sign up Now? <Link to="/register" className="text-dark">Register</Link>
        </p>
      </form>
    </section>
  );
}
