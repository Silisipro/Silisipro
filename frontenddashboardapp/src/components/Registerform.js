import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

const Form = () => {
  // État local pour les données du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Ajoutez ici la logique pour traiter les données du formulaire
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
