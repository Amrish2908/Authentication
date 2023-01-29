import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponce } from 'src/app/appInterface/auth-responce.interface';
import { ApiService } from 'src/app/shared/Api/api.service';
import { ErrorService } from 'src/app/shared/Error/error.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: boolean = true
  Form: FormGroup;
  error: any;
  errMsgs:any
  
  constructor(private fb: FormBuilder, private api: ApiService,private errorMsgserv:ErrorService,private router:Router) { 
    this.errMsgs=this.errorMsgserv.errorMsgs
  }
  
  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    })
  }
  onSubmit() {
    if (this.Form.value) {
      const email = this.Form.value.email
      const password = this.Form.value.password

      let authObservable: Observable<AuthResponce>
      if (this.loginMode) {
        authObservable = this.api.signIn(email, password)
      } else {
        authObservable = this.api.signUp(email, password)
      }
      authObservable.subscribe(
        res => {
        console.log(res)
          this.router.navigate(['dashboard'])
      },
        err => {
          console.log(err)
          this.error=this.errMsgs[err]
          this.Form.reset()
        })
    }
  }
  onModeSwitch() {
    this.loginMode = !this.loginMode
    this.Form.reset()
  }
}
