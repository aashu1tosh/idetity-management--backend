import mongoose from 'mongoose';
import { admins } from '../constant/admin';
import { IUser } from '../interface/user.interface';
import User from '../models/user.model';

import { DotenvConfig } from '../config/env.config';
import BcryptService from '../services/bcrypt.service';
import HttpException from '../utils/HttpException.utils';
import Print from '../utils/print';

async function seedAdmin(data: IUser) {
    try {
        mongoose
            .connect(DotenvConfig.DATABASE_HOST as string, {
                serverSelectionTimeoutMS: 5000, // Timeout after 5s
            })
            .then(() => {
                Print.info('Connected to mongoDB');
            })
            .catch(() => {
                Print.error("Couldn't connect to database");
            });

        const bcrpytService = new BcryptService();
        const existingAdmin = await User.findOne({
            $or: [{ email: data.email }, { phone: data.phone }],
        });

        if (existingAdmin) {
            throw HttpException.conflict('Phone or email must be unique.');
        }

        const hash = await bcrpytService.hash(data?.password);
        data.password = hash;

        await User.create(data);
        Print.info(`${data?.email} seeded successfully`);
    } catch (error) {
        Print.error(`Seeding Admin Failed`);
        console.error(error);
    } finally {
        process.exit(1);
    }
}

const args = process.argv[2];
if (!args) {
    console.error('Please provide an argument');
    process.exit(1);
}

if (args === 'seed') {
    void seedAdmin(admins);
} else {
    console.error('Invalid argument');
    process.exit(1);
}
