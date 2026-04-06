import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number) {
    if(value < 1000){
      return value + "MIN.";
    }else{
      return value.toString().slice(0,4);
    }
  }

}
