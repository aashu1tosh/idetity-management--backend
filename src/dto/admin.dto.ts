import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { passwordRegex } from '../constant/regex';

export class ResetPasswordDTO {
    @IsNotEmpty()
    @IsString()
    id!: string;

    @IsNotEmpty()
    @IsString()
    @Matches(passwordRegex, {
        message:
            'Password must contain at least one uppercase letter and one lowercase letter',
    })
    newPassword!: string;
}
