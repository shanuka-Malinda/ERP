import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginBtn } from '../components/sharedComponents/buttons/login-btn/login-btn';
import { ClearBtn } from "../components/sharedComponents/buttons/clear-btn/clear-btn";
import { AppInputComponent } from "../components/sharedComponents/textFields/input/input";

@Component({
  selector: 'app-login',
  imports: [FormsModule, LoginBtn, ClearBtn, AppInputComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  // variables
  loadingClear = false;
  loadingLogin = false;

  username: string = '';
  password: string = '';


  login() {
    this.loadingLogin = true;
    setTimeout(() => {
      console.log('User logged in');
      this.loadingLogin = false;
    }, 1500);
  }

  clear() {
    this.loadingClear = true;
    setTimeout(() => {
      console.log('Form cleared');
      this.loadingClear = false;
    }, 1500);
  }
}
