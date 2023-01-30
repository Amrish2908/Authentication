import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/Api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.user.subscribe(res => {
      // if(res){
      //   this.isLoggedIn=true;
      // }else{
      //   this.isLoggedIn=false;
      // }
      //1st  alternet
      // this.isLoggedIn=!res? false: true;
      //2nd  alternet
      this.isLoggedIn = !!res;
      console.log(this.api.user)
      console.log(res)
    })
  }

}
