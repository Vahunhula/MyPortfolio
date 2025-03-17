"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });

        if (res.ok) {
          setSuccessMessage("Your message has been sent successfully!");
          setName("");
          setEmail("");
          setMessage("");
          setErrors({});
        } else {
          const errorData = await res.json();
          setErrors({ form: `Failed to send message: ${errorData.message}` });
        }
      } catch (error) {
        setErrors({ form: "Failed to send message. Please try again later." });
      }
    }
  };

  return (
    <motion.section
      id="contact"
      className="bg-black text-white py-20 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-center mb-10">CONTACT ME</h2>
      <div className="max-w-3xl mx-auto">
        <form className="bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-300">Name</span>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </label>
          <label className="block mb-4">
            <span className="text-gray-300">Email</span>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </label>
          <label className="block mb-4">
            <span className="text-gray-300">Message</span>
            <textarea
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-400"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
          </label>
          {errors.form && <span className="text-red-500 text-sm">{errors.form}</span>}
          {successMessage && <span className="text-green-500 text-sm">{successMessage}</span>}
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Send
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
}