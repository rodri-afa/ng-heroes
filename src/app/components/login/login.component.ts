import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  token: Token = {} as Token;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  login() {
    this.authService.login(this.user).subscribe((data: any) => {
      this.token = data;
      console.log(this.token.access_token);
      localStorage.setItem('token', this.token.access_token);
    });
  }
}
