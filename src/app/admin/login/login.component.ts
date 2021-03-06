import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';
import { DatacarrierService } from './../../core/datacarrier.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public datacarrierService: DatacarrierService,
  ) {
    this.datacarrierService.setLandingPageStatus(false); // to remove landing page from view
   }

  ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(

            data => {
                if ( this.returnUrl === '/') {
                this.returnUrl = '/admin/andika-blog';
                }
                this.router.navigate([this.returnUrl]);
                console.log(data);
            },

            

            error => {
                //this.alertService.error(error);
                this.loading = false;
                console.log(error);
            },

            
          );
}

}
