import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
   color = 'rgba(63, 81, 181, 0.5)';
  
  constructor() { }

  ngOnInit() {
  }

}
