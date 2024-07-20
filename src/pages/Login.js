import React, { useState } from 'react'
import { useAuth } from '../store/auth';
import Register from './Register'

const Login = () => {

  const inputObj = {
    admin_email: "",
    password: ""
  };

  const [inputData, setinputData] = useState(inputObj);
  const { storeTokenInLs, api, findAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true)

  const inputHandle = (e) => {
    // const { name, value } = e.target;
    setinputData({
      ...inputData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${api}/auth/admin_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLs(data.token)
        setinputData(inputObj);
        setLoading(false);
        findAdmin();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("LOgin Error " + error);
      setLoading(false)
    }
  }

  return (
    <>
      {login ?
        <section className='h-screen w-screen grid place-items-center'>
          <form className="flex flex-col col-10 col-sm-8 col-md-6 col-lg-4 px-3 sm:px-5 mx-auto shadow-lg lg:px-10 rounded-2xl" onSubmit={handleSubmit}>
            <h1 className='text-center text-2xl font-bold text-green-600 py-3'>Login</h1>
            <label htmlFor='email'>Email</label>
            <input
              className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
              type="email"
              id='email'
              name='admin_email'
              required
              value={inputData.admin_email}
              onChange={inputHandle}
            />
            <label htmlFor='password'>Password</label>
            <input
              className='border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3'
              type="password"
              id='password'
              name='password'
              value={inputData.password}
              onChange={inputHandle}
            />
            <input type="submit" disabled={loading} value={loading ? "Please Wait..." : "Login Now"} className={`mx-auto w-1/2 mb-3 ${loading ? "bg-green-400" : "bg-green-600"} text-white rounded-md py-2 `} />
            <p className='m-auto mb-3'>Are You New To IMS ? <span className='text-green-600 cursor-pointer' onClick={() => setLogin(false)}>Register Here</span></p>
          </form>
        </section> :
        <Register setLogin={setLogin} />
      }

    </>
  )
}

export default Login
