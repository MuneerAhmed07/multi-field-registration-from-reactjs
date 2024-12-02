import { useState } from "react";

const RegistrationForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const validateForm = () => {
        const errors = {};

        if(!formData.name.trim()) errors.name = "Name is required";
        if(!formData.email.trim()) {
            errors.email ="Email is required";
        } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Enter a valid email address!";
        } if(!formData.password.trim()) {
            errors.password = "password is required";
        } else if(formData.password.length < 8) {
            errors.password = "password  must be at least 8 character";
        }
        if(formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Password do not match";
        }

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validateErrors = validateForm();
        setErrors(validateErrors);

        if(Object.keys(validateErrors).length === 0) {
            setSubmitted(true);
            setFormData({name:"", email: "", password: "", confirmPassword: ""});
            setErrors({});
        } else {
            setSubmitted(false);
        }
    }

  return (
    <>
     <div className="form-container">
        <h2>Registration Form</h2>
        {submitted && <p className="success-message">Registration successfull!</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text"
                id="name"
                name='name'
                autoComplete='off'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter Your name'
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email"
                id="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                autoComplete='off'
                placeholder='Enter Your email'
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                id="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                autoComplete='off'
                placeholder='Enter Your password'
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password"
                id="confirm-password"
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete='off'
                placeholder='Confirm password'
                />
                {errors.confirmPassword  && <p className="error">{errors.confirmPassword}</p>}
            </div>

            <button type='submit'>Register</button>
        </form>
    </div> 
    </>
  )
}

export default RegistrationForm;
