import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username!:string;
  logged!:boolean;

  constructor(private router: Router,private dialog:MatDialog) { }

  openDialogSesion(){
    this.dialog.open(LoginComponent)
  }

  ngOnInit(): void {
  
  }
  
}
