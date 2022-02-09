import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Form, Input, Button, StyledLink } from '../../components/FormComponents';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigation = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const user = { ...formData };

    try {
      const { data } = await api.login(user);
      login(data);
      navigation('/home');
    } catch (error) {
      console.log(error);
      alert("Erro, tente novamente");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(e) => handleChange(e)}
          name="email"
          value={formData.email}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="password"
          value={formData.password}
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>
      <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink>
    </Container>
  );
}

export default SignIn;