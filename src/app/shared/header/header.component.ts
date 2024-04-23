import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

    constructor() { }
  
    isShowDivIf = true;
    toggleDisplayDivIf() {
      this.isShowDivIf = !this.isShowDivIf;
    }
  
    ngOnInit(): void {}


  }


