import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { MBTI } from '../../enums';

export class CreateMatch {
  @IsUUID()
  @IsOptional()
  groupId?: string;

  @IsString()
  @IsOptional()
  @Length(1)
  groupName?: string;

  @IsEnum(MBTI)
  mbti: MBTI;

  @IsString()
  name: string;
}

export class GetGroupById {
  @IsUUID()
  @IsNotEmpty()
  groupId: string;
}
