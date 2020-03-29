import React, { ReactElement, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FiLogIn } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import api from '../../services/api'

interface Props {}

export default function Logon({}: Props): ReactElement {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault()

    try {
      const response = await api.post('sessions', { id })
      
      localStorage.setItem('@BeTheHero:ong_id', id)
      localStorage.setItem('@BeTheHero:ong_name', response.data.name)

      history.push('/profile')
    } catch (error) {
      alert('Erro ao logar, tenve novamente')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02051" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}
