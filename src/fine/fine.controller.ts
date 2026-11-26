import { Controller, Get, Query, BadRequestException  } from '@nestjs/common';
import { FineService } from './fine.service.js';

@Controller('fine')
export class FineController {
  constructor(private readonly fineService: FineService) {}

  @Get()
  calculateFine( 
    @Query('days') days?: string, 
    @Query('type') type?: string) {
      const numDays = Number(days); 
      // ต้องมีค่า ไม่ใช่ช่องว่าง ค่าของ numDays เป็น NaN(Not-a-Number) หรือไม่  เป็นจำนวนเต็ม และตั้งแต่ 0 ขึ้นไป
      if (days === undefined ||
          days.trim() === '' ||
          Number.isNaN(numDays) ||
          !Number.isInteger(numDays) ||
          numDays < 0 ) {
        throw new BadRequestException('days ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป');
      }
      const validTypes = ['general', 'reserve', 'reference'];
      const normalizedType = type?.trim().toLowerCase();
      // ตรวจสอบว่าไม่ได้เป็นค่าว่าง และเป็นชนิดที่ถูกต้อง
      if (!normalizedType || !validTypes.includes(normalizedType)) {
        throw new BadRequestException('type ต้องเป็น general, reserve หรือ reference เท่านั้น');
      }
      return this.fineService.calculate(numDays, normalizedType);
  }
}
