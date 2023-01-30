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
}
