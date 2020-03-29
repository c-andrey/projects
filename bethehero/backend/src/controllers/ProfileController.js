const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const ongId = request.headers.authorization
    const incidents = await connection('incidents')
      .where('ong_id', ongId)
      .select('*')

    if (incidents.length === 0) {
      return response.status(404).json({ error: 'This Ong has no incidents' })
    }
    return response.json(incidents)
  }
}
