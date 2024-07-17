"use client";
import { useState } from "react";
import { DialogDemo } from "./Modal";
import { close } from "inspector";

const ContactForm = () => {
  const initialFormData = {
    username: "",
    useremail: "",
    userphone: "",
    usermessage: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState<{
    username?: string;
    useremail?: string;
    userphone?: string;
  }>({
    username: "",
    useremail: "",
    userphone: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    if (name === "username") {
      if (!value.trim()) {
        errorMessage = "Please enter your name";
      } else if (value.length < 3) {
        errorMessage = "Please enter at least 3 characters";
      }
    } else if (name === "useremail") {
      if (!value.trim()) {
        errorMessage = "Please enter an Email ID";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "Please enter a valid Email ID";
      }
    } else if (name === "userphone") {
      if (!value.trim()) {
        errorMessage = "Please enter your mobile number";
      } else if (!/^\d+$/.test(value)) {
        errorMessage =
          "Please enter your mobile number with only numerical digits";
      } else if (value.length < 10) {
        errorMessage = "Phone number should be at least 10 digits";
      }
    }
    return errorMessage;
  };

  const validateForm = () => {
    let valid = true;
    const errorValidation: {
      username?: string;
      useremail?: string;
      userphone?: string;
    } = {};

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      const error = validateField(key, value);
      if (error) {
        errorValidation[key as keyof typeof errorValidation] = error;
        valid = false;
      }
    });

    setErrors(errorValidation);
    return valid;
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      setIsModalOpen(true);
      console.table(formData);
      // Clear the form fields
      //setFormData(initialFormData);
      setErrors({
        username: "",
        useremail: "",
        userphone: "",
      });
    } else {
      console.log(formData);
    }
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
    setErrors({
      username: "",
      useremail: "",
      userphone: "",
    });
  };

  return (
    <>
      <div className="container mx-auto h-screen flex flex-col justify-center align-middle">
        <form
          className="w-[480px] p-8 mx-auto border border-slate-300 bg-slate-200 rounded-lg"
          onSubmit={submitHandler}
        >
          <h1 className="text-center text-2xl mb-5">Contact Form</h1>
          <div className="mb-4">
            <input
              type="text"
              className="input-text w-full h-[50px] rounded-md p-3 outline-none focus:outline-offset-1 focus:outline-blue-400"
              placeholder="Your Name"
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              name="username"
              id="name"
              value={formData.username}
            />
            {errors.username && (
              <small className="text-red-600 font-semibold">
                {errors.username}
              </small>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="input-text w-full h-[50px] rounded-md p-3 outline-none focus:outline-offset-1 focus:outline-blue-400"
              placeholder="Email ID "
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              name="useremail"
              id="email"
              value={formData.useremail}
            />
            {errors.useremail && (
              <small className="text-red-600 font-semibold">
                {errors.useremail}
              </small>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="input-text w-full h-[50px] rounded-md p-3 outline-none focus:outline-offset-1 focus:outline-blue-400"
              placeholder="Phone Number "
              onChange={onChangeHandler}
              maxLength={10}
              onBlur={onBlurHandler}
              name="userphone"
              id="phone"
              value={formData.userphone}
            />
            {errors.userphone && (
              <small className="text-red-600 font-semibold">
                {errors.userphone}
              </small>
            )}
          </div>
          <div className="mb-4">
            <textarea
              className="w-full rounded-md p-3 outline-none focus:outline-offset-1 focus:outline-blue-400"
              rows={5}
              onChange={onChangeHandler}
              placeholder="Your Message"
              name="usermessage"
              id="message"
              value={formData.usermessage}
            />
          </div>
          <button className="w-full bg-slate-700 py-4 text-white text-lg hover:bg-slate-950 transition-all rounded-md">
            Submit
          </button>
        </form>
      </div>
      <DialogDemo
        isOpen={isModalOpen}
        onClose={closeModalHandler}
        formData={formData}
      />
    </>
  );
};

export default ContactForm;
