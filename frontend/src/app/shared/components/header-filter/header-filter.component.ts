import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.scss']
})
export class HeaderFilterComponent {
@Input()activeParamsFilte!:{url:string,name:string}
@Output() updateParamsFilte:EventEmitter<[string,string]> = new EventEmitter<[string,string]>()


updateFilter(){
  this.updateParamsFilte.emit([this.activeParamsFilte.url,this.activeParamsFilte.name])
}
}
