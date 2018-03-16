import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecaptchaService } from '../recaptcha.service';
import { Meta, Title } from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  title: string = 'Test Recaptcha Form';
  testForm: FormGroup;
  token: string;
  public returnData;
  validToken: boolean;

  constructor(
    private recaptchaService: RecaptchaService,
    private meta: Meta,
    private titleService: Title
  ) {
    this.meta.addTag({ name: 'description', content: 'This is my really cool form.' });
    this.titleService.setTitle( this.title );
  }

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
