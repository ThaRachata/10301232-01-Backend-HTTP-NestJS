import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
    calculate(weight: number, zone: string) {
        const baseFee = weight <= 1 ? 50 : 50 + Math.ceil(weight - 1) * 18; // ค่าจัดส่งพื้นฐาน

        // ค่าจัดส่งเพิ่มเติมตามโซน เก็บแบบ key-value 
        const zoneRates: Record<string, number> = {
            bangkok: 0,
            north: 10,
            south: 25,
        };
        // ดึงค่าค่าจัดส่งจาก zoneRates
        const zoneFee = zoneRates[zone];
        const total = Math.round(baseFee + zoneFee);

        return{
            weight,
            zone,
            baseFee,
            zoneFee,
            total
        };
    }
}