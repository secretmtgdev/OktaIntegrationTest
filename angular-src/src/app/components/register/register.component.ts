import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public name: String;
  public username: String;
  public email: String;
  public password: String;
  constructor(private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  public onRegisterSubmit(): boolean {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show("User isn't valid", {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Email isn't valid", {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show("User was registered to the database", {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show("User could not be registered", {
          cssClass: 'alert-danger',
          timeout: 3000
        });
        this.router.navigate(['/register']);
      }
    });
  }

}
