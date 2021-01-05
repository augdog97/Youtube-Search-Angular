import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 * 1.Defined 2 instance variables: data and loading.
 *  - These will be used for the API return value and loading indicator.
 * 2. Injected the HttpClient in the constructor.
 * 3. In the makeRequest method we first set loading to true which will show the Div
 *  - we call this.http.get and pass the URL to which we want to make the GET request to.
 *  - http.get returns an Observable. We can subscribe to changes(akin to using .then in a promise) using subscribe.
 *  - When the request returns from the server the stream will emit a Response object.
 *  - We extract the body of the response as an Object by using json and then we set this.data to that Object.
 *  - Since we have a response, we are not loading anymore so we set this.loading to false. 
 */

@Component({
  selector: 'simple-http',
  templateUrl: './simple-http.component.html',
  styleUrls: ['./simple-http.component.css']
})
export class SimpleHttpComponent implements OnInit {
  data: object;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
makeRequest():void {
  this.loading = true;
  this.http
  .get('https://jsonplaceholder.typicod.com/posts/1')
  .subscribe(data => {
    this.data = data 
    this.loading = false;
  })
}
}
