import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';

const AddCourse = () => {

    const { api, authorizationToken } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (course.length > 0) {
            setLoading(true);
            const response = await fetch(`${api}/course/course`, {
                method: "POST",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: course })
            });

            if (response.ok) {
                setLoading(false);
                setCourse("");
                window.alert("Course Added Successfully");
                navigate("/view-course");
            } else {
                setLoading(false)
            }
        } else {
            window.alert("Course Required");
            setLoading(false);
        }
    };

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Add Course</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / Add Course</p>
                </div>
            </div>
            <section className='mt-2'>
                <div className='grid place-items-center'>
                    <form className='flex flex-col w-full px-2 xs:px-0 sm:w-1/2 lg:w-1/3 mx-auto shadow-lg lg:px-10 rounded-2xl' onSubmit={handleSubmit}>
                        <h1 className='text-center text-2xl font-bold text-green-600 py-3'>Add Course</h1>
                        <input
                            autoFocus
                            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Course Name'
                            type="text"
                            name='name'
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                        />
                        <input type="submit" value={loading ? "Please Wait" : "Add Course"} disabled={loading} className='mb-3 w-full sm:w-1/2 m-auto bg-green-600 text-white capitalize px-2 py-1 rounded-md' />
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddCourse
