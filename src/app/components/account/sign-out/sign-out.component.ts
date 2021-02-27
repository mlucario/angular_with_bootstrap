import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent implements OnInit {
  countDown: number = 3;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.signOut();
    setInterval(() => {
      this.countDown -= 1;
      console.log(this.countDown);
    }, 1000);

    
    setTimeout(() => {
      this.router.navigate(['signin']);
    }, 3000);
  }
}
