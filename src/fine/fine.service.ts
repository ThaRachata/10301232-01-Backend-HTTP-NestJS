import { Injectable } from '@nestjs/common';

@Injectable()
export class FineService {
    calculate(days: number , type: string){
        let chargeableDays = 0
        if (days > 3){
            chargeableDays = days - 3
        }

        const typeRates: Record<string, number> = {
            general: 5,
            reserve: 20,
            reference: 50,
        };
        const rate = typeRates[type];
        let total = Math.round(chargeableDays * rate);
        if (total > 500) {
            total = 500;
        }

        return {
            days,
            type,
            chargeableDays,
            rate,
            total
        };
    }
}
