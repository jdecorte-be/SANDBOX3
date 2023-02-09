import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

export class LeadeBoardDto {
  login: string;
  victories: number;
  rank: number;
  avatar: Uint8Array;
}

export class UserIdDto {
  @IsNumber()
  id: number;
}

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  login: string;
}

export class ProfileDto {
  login: string;
  avatar: Uint8Array;
  status: string;
}

export class UserResponseDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
  
  @IsString()
  @IsNotEmpty()
  login: string;
  
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class SignDto {
  @IsString()
  @IsNotEmpty()
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
  @IsString()
  @IsPhoneNumber()
  @NotContains(' ')
  phoneNumber: string;
}

export class loginDto {
  @IsString()
  @IsNotEmpty()
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

  @IsString()
  filename: string;

  @IsString()
  type: string;
}

export class MatchHistoryDto {
  @IsString()
  opponent: string;

  @IsInt()
  scoreX: number;

  @IsInt()
  scoreY: number;

  @IsString()
  map: string;
}

export class UserRelationDto {
  @IsInt()
  id: number;

  @IsString()
  target: string;
}
