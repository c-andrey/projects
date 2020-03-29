import React, { ReactElement, useState } from 'react'

import './styles.css'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

interface Props {}

interface NewIncident {
  title: string,
  description: string,
  value: string
}

export default function NewIncident({}: Props): ReactElement {
  const history = useHistory()
  const ongId = localStorage.getItem('@BeTheHero:ong_id')
  const [title, setTitle] = useState<NewIncident["title"]>('')
  const [description, setDescription] = useState<NewIncident["description"]>('')
  const [value, setValue] = useState<NewIncident["value"]>('')

  async function handleNewIncident(e: { preventDefault: () => void }) {
    e.preventDefault()

    const data: NewIncident = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadsatrar caso, tente novamente')
    }
  }

  return (
    <div className="new-incident-container ">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02051" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do caso"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
          />

          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
