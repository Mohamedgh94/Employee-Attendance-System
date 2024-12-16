import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export const UserModel = {
  async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const query = `
      INSERT INTO users (
        first_name, last_name, email, password, phone,
        department_id, position, role, qr_code, default_location_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [
      userData.firstName,
      userData.lastName,
      userData.email,
      hashedPassword,
      userData.phone,
      userData.departmentId,
      userData.position,
      userData.role || 'employee',
      `emp-${Date.now()}`,
      userData.defaultLocationId
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
};