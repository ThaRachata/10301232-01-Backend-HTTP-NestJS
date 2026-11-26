import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ShippingService } from './shipping.service.js';

@Controller('shipping')
export class ShippingController {
  // ฉีด ShippingService เข้ามาใน constructor เพื่อใช้ในการคำนวณค่าจัดส่ง
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  calculate(
    @Query('weight') weight?: string, // ดึงค่าพารามิเตอร์ weight 
    @Query('zone') zone?: string,
  ) {
    const numWeight = Number(weight); // แปลง weight เป็นตัวเลข
    // เงื่อนไขตรวจสอบ weight ว่าถูกต้องหรือไม่ .isFinite() ตรวจสอบว่าเป็นตัวเลขที่ไม่ใช่ Infinity
    if (weight === undefined || weight.trim() === '' || 
        Number.isNaN(numWeight) || !Number.isFinite(numWeight) || numWeight <= 0)
        {
        throw new BadRequestException('weight ต้องเป็นตัวเลขมากกว่า 0');
      }

      const validZones = ['bangkok', 'north', 'south']; 
      const normalizedZone = zone?.trim().toLowerCase();
      // ตรวจสอบว่าไม่ได้ส่ง Zone มา หรือส่ง Zone ที่ไม่อยู่ในรายการที่กำหนด
      if (!normalizedZone || !validZones.includes(normalizedZone))
        {
          throw new BadRequestException('zone ต้องเป็น bangkok, north หรือ south เท่านั้น');
        }
        // ส่งค่าที่ถูกต้องไปยัง ShippingService เพื่อคำนวณค่าจัดส่ง คืนผลลัพธ์กลับเป็น JSON
        return this.shippingService.calculate(numWeight, normalizedZone);
  }
}
