import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NewTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  authorId: number | string;
}

export class ToggleStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
