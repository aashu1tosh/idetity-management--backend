import { ROLE } from '../constant/enum';
import { IUser } from '../interface/user.interface';
import User from '../models/user.model';
import HttpException from '../utils/HttpException.utils';
import BcryptService from './bcrypt.service';
import webtokenService from './webtoken.service';

class AuthService {
    constructor(
        private readonly bcryptService = new BcryptService(),
        private readonly webTokenGenerate = webtokenService
    ) {}

    async createUser(data: IUser) {
        try {
            if (data.role === ROLE.ADMIN)
                throw HttpException.badRequest('Admin creation not Authorized');

            const hash = await this.bcryptService.hash(data.password);
            data.password = hash;

            const userResponse = await User.create(data);
            console.log(userResponse, 'userResponse');
            const { password, __v, ...reset } = userResponse.toObject();
            return reset;
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }

    // async loginUser(data) {
    //     try {
    //         let user = await ;

    //         if (user) {
    //             if (
    //                 await this.bcryptService.compare(
    //                     data.password,
    //                     user.password
    //                 )
    //             ) {
    //                 const token = this.webTokenGenerate.sign(
    //                     user?.id as string
    //                 );
    //                 const { password, createdAt, deletedAt, ...response } =
    //                     user;
    //                 return { data: response, token: { accessToken: token } };
    //             }
    //         }
    //         throw HttpException.unauthorized('Invalid Credentials');
    //     } catch (error: any) {
    //         throw HttpException.badRequest(error?.message);
    //     }
    // }

    // async updatePassword(data: UpdatePasswordDTO, id: string) {
    //     if (data.oldPassword === data.newPassword)
    //         throw HttpException.conflict(
    //             'New password should differ from old password.'
    //         );

    //     let user = await this.AuthRepo.findOne({
    //         where: { id: id },
    //     });
    //     if (user) {
    //         if (
    //             await this.bcryptService.compare(
    //                 data.oldPassword,
    //                 user.password
    //             )
    //         ) {
    //             try {
    //                 const password = await this.bcryptService.hash(
    //                     data.newPassword
    //                 );
    //                 await this.AuthRepo.createQueryBuilder()
    //                     .update('Auth')
    //                     .set({ password: password })
    //                     .where('id = :id', { id })
    //                     .execute();
    //             } catch (error: any) {
    //                 throw HttpException.conflict(error?.message);
    //             }
    //         } else throw HttpException.badRequest('Invalid Credential');
    //         return null;
    //     }
    // }
}

export default new AuthService();
