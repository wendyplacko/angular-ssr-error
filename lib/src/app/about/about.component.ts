import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {

  public title: string = 'About';
  referral: string;
  desiredReferral: string;


  constructor(
    private meta: Meta,
    private titleService: Title
  ) {
    this.meta.addTag({ name: 'description', content: 'This is my really cool about page.' });
    this.titleService.setTitle( this.title );
  }

  ngOnInit() {
    $(document).foundation();
  }

  ngAfterViewInit() {
    this.referral = document.referrer;
    this.desiredReferral = 'mndental.test';
    if(this.referral.indexOf(this.desiredReferral) >= 1 ) {
      console.log('yes');
      $('#test-modal').foundation('open');
      console.log('done');
    }
  }

}
