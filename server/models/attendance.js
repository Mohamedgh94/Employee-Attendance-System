import pool from '../config/database.js';

export const AttendanceModel = {
  async create(userId, locationId) {
    const query = `
      INSERT INTO attendance (user_id, location_id, check_in)
      VALUES ($1, $2, NOW())
      RETURNING *
    `;
    const values = [userId, locationId];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async update(id, checkOut) {
    const query = `
      UPDATE attendance
      SET check_out = $1,
          worked_hours = EXTRACT(EPOCH FROM ($1 - check_in))/3600
      WHERE id = $2
      RETURNING *
    `;
    const values = [checkOut, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getByUser(userId) {
    const query = `
      SELECT a.*, l.name as location_name
      FROM attendance a
      JOIN locations l ON a.location_id = l.id
      WHERE a.user_id = $1
      ORDER BY a.check_in DESC
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async getActive() {
    const query = `
      SELECT a.*, l.name as location_name
      FROM attendance a
      JOIN locations l ON a.location_id = l.id
      WHERE a.check_out IS NULL
    `;
    const result = await pool.query(query);
    return result.rows;
  }
};