import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecaptchaService } from './recaptcha.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'Test Recaptcha Form';
  testForm: FormGroup;
  token: string;
  public returnData;
  validToken: boolean;

  constructor(
    private recaptchaService: RecaptchaService
  ) { }

  ngOnInit() {
    $(document).foundation();
    this.testForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl('', Validators.email),
      recaptchaInput: new FormControl(null, Validators.required)
    });
    console.log(this.testForm);
  }

  submitStuff() {
    // this.testForm.reset();
    //Need to verify the token, #recaptcha-token sent to API?
    var tokenResponse = grecaptcha.getResponse();
    var tokenRequest = {
      secret: '6Lf-mkcUAAAAAGNqMstGK0vq60TY_ROaKRk83zqD',
      response: tokenResponse,
    }
    console.log(tokenRequest);
    this.recaptchaService.validateToken(tokenRequest).subscribe(
        data => {
          this.returnData = data;
          if(this.returnData.hasOwnProperty('success')) {
            if(this.returnData.success === true) {
              this.validToken = true;
            }
          }
        },
        err => {
          console.log(err);
          this.validToken = false;
          this.testForm.controls.recaptchaInput.reset();
        },
        () => {
          console.log('done checking token');
        }
    );

    if(this.validToken === true) {
      console.log('it worked!');
      this.testForm.reset();
    }
  }
}
