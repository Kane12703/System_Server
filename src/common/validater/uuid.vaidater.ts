import { BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

export const UuidVaidater = (id: string) => {
  if (!isUUID(id)) {
    throw new BadRequestException('Invalid UUID format');
  }
};
