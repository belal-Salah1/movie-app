import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language'
})
export class languagePipe implements PipeTransform {

  transform(value: string|number) {
    return value === "en" ? "ENGLISH":  value ==="ar"? "ARABIC":"UNKHOWN";
  }

}
