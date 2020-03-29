import React, { useEffect, ReactElement, useState } from 'react'

import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

interface Props {}
interface Incident {
  id: string
  title: string
  description: string
  value: number
}

function Profile({}: Props): ReactElement {
  const history = useHistory()

  const [incidents, setIncidents] = useState<Incident[]>([])
  const ongId = localStorage.getItem('@BeTheHero:ong_id')
  const ongName = localStorage.getItem('@BeTheHero:ong_name')

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data)
      })
  }, [ongId])

  async function handleDeleteIncident(id: string): Promise<void> {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="submit">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO: </strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO: </strong>
            <p>{incident.description}</p>

            <strong>Valor: </strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p>

            <button type="button">
              <FiTrash2
                size={20}
                color="#a8a8b3"
                onClick={() => handleDeleteIncident(incident.id)}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
