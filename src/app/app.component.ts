import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isLoading: boolean = false;
  title = 'angular-bootstrap-review-with-expressjs';

  ngOnInit(): void {
    const timer$ = timer(3000);

    // SHOW LOADING 3s
    timer$.subscribe(
      ()=> {
        this.isLoading = false;
      }
    )
  }
}
