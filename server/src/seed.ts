import bcrypt from 'bcryptjs';
import pool from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
    const name = 'Super Admin';
    const email = 'admin@venturely.com';
    const password = 'adminpassword123';

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if admin exists
        const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            console.log('Admin already exists');
            process.exit(0);
        }

        await pool.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, 'super_admin']
        );

        console.log('Super Admin seeded successfully');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
