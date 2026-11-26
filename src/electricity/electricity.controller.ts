import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ElectricityService } from './electricity.service.js';

@Controller('electricity')
export class ElectricityController {
  constructor(private readonly electricityService: ElectricityService) {}

  @Get()
  calculateElectricity(
    @Query('units') units?: string,
    @Query('type') type?: string,
  ) {
    const numUnits = Number(units);
    if (units === undefined ||
        units.trim() === '' ||
        Number.isNaN(numUnits) ||
        !Number.isFinite(numUnits) ||
        numUnits < 0) {
      throw new BadRequestException('units ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป');
    }
    const validTypes = ['residential', 'business'];
    const normalizedType = type?.trim().toLowerCase();

    if (!normalizedType || !validTypes.includes(normalizedType)) {
      throw new BadRequestException('type ต้องเป็น residential หรือ business เท่านั้น');
    }
    return this.electricityService.calculate(numUnits, normalizedType);
  }
}
