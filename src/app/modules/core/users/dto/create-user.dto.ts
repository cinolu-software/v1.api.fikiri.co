import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @IsEmail({}, { message: "L'email doit être une adresse email valide" })
  email: string;

  @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire" })
  name: string;

  @IsNotEmpty({ message: 'Le numéro de télephone est obligatoire' })
  phone_number: string;

  @IsNotEmpty({ message: "L'adresse est obligatoire" })
  address: string;

  @IsNotEmpty({ message: 'Le rôle est obligatoire' })
  roles: number[];

  @IsNotEmpty({ message: 'Le pôle est obligatoire' })
  pole: number;

  @IsNotEmpty({ message: "L'organisation est obligatoire" })
  organisation: number;
}
