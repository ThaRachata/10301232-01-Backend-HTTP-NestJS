import { Injectable } from '@nestjs/common';

@Injectable()
export class ElectricityService {
    calculate(units: number, type: string) {
        let energyCharge = 0;
        if (units <= 150) {
            energyCharge = units * 3;
        }
        else {
            energyCharge = (150 * 3) + ((units - 150) * 4);
        }

        const typeRates: Record<string, number> = {
            residential: 40,
            business: 90,
        };
        const serviceCharge = typeRates[type];
        const total = Math.round(energyCharge + serviceCharge);

        return {
            units,
            type,
            energyCharge,
            serviceCharge,
            total
        };
    }
}
