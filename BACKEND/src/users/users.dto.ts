import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

export class SignDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @NotContains(' ')
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  @NotContains(' ')
  password: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;
}

export class loginDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @NotContains(' ')
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @NotContains(' ')
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
