import { SetMetadata } from '@nestjs/common';

const Role = (...statuses: string[]) => SetMetadata('statuses', statuses);

export { Role };
