const db = require('../database/db');

const createHospede = async ({nome, endereco, telefone, email}) => {
  try {
    return await db.raw('INSERT INTO hospedes (nome, endereco, telefone, email) values (?, ?, ?, ?)', [nome, endereco, telefone, email]);
  } catch (error) {
    throw new Error('Erro ao cadastrar hóspede!');
  }
}

const buscarHospedeEmail = async (email) => {
  try {
    const result = await db.raw('SELECT email from hospedes WHERE email = ?', [email]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar hóspede!')
  }
}

const buscarHospedeId = async (id) => {
  try {
    const result = await db.raw('SELECT * from hospedes WHERE id = ?', [id]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar hóspede!')
  }
}

const buscarHospedes = async () => {
  try {
    const result = await db.raw('SELECT * from hospedes ORDER BY id DESC');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao listar hóspedes!')
  }
}

const atualizarHospedes = async ({nome, endereco, telefone, email, id}) => {
  try {
    return await db.raw('UPDATE hospedes SET nome = ?, endereco = ?, email = ?, telefone = ? WHERE id = ?',  [nome, endereco, email, telefone, id])
  } catch (error) {
    throw new Error('Erro ao atualizar hóspedes!')
  }
}

module.exports = {
  createHospede,
  buscarHospedeEmail,
  buscarHospedes,
  atualizarHospedes,
  buscarHospedeId
};