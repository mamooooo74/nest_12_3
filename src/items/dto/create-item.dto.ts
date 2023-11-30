import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export { CreateItemDto };
