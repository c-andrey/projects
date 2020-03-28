module.exports = {
  async index(request, response) {
    const { ong_id } = request.headers.authorization
    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*')

    if (incidents.length === 0) {
      return response.status(404).json({ error: 'This Ong has no incidents' })
    }

    return response.json(incidents)
  }
}
