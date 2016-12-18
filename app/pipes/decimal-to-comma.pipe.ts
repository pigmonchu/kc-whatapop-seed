import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "DecimalToComma"})

export class DecimalToComma implements PipeTransform {
    transform(USNumber: string) {
        USNumber = USNumber.replace('.', '@');
        USNumber = USNumber.replace(',', '.');
        return USNumber.replace('@', ',');
    }
}
