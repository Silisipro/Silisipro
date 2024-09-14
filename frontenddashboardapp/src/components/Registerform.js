import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

const Form = () => {
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Nom"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label="Mot de passe"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Input
        label="Confirmation du mot de passe"
        type="password"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={handleChange}
      />
      <Button type="submit" label="S'inscrire" />
    </form>
  );
};

export default Form;
