import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}

export { CredentialsDto };
