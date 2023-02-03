import { IsNotEmpty, IsString, MaxLength, NotContains } from 'class-validator';

export class SignDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  login: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @MaxLength(15)
  password: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  phoneNumber: string;
}

export class loginDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  login: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @MaxLength(15)
  password: string;
}

export class codeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  login: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  code: string;
}

export class imgDto {
  file: File;
  filename: string;
  type: string;
}
