import { Component, OnInit } from '@angular/core';
import {Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {ElementRef} from '@angular/core';
import {Observable} from 'rxjs';
import {map, filter, debounceTime} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';
import { SearchResult } from '../search-result.model';
import {YoutubesearchService} from '../youtubesearch.service';
/**
 * 1. We say that this class implements ngOnInit becasue we want to use the NgOnInit life cycle call back.
 *  - If a class implements OnInit then the ngOnInit function will be called after the first change detection check.
 *  - ngOnInit is a good plcae to do initializtion (vs the constructor) because inputs set on a component are not available in the constructor. 
 * 2. The two Outputs specify that events will be from this component.
 *  - That is we can use the (outout)="callback" syntax in our view to listen to events on this component.
 *  - In the @Components class we're specifying the properties of the events with the names loading and results.
 *    - In this example, each event will have a corresponding EventEmitter as an instance variable of the controller 
 *class.
 *  - We create the EventEmitters for both loading and results. loading will emit a boolean when this serach is loading and results will remit an array of SearchResults when the search is finished.
 * 3. In the constructor we inject the YoutubeSearchService and the element el that this component is attached to.
 *  - el is an object of type ElementRef, which is an Angular wrapper around a native element. 
 *  - Both injections are set as instance variables.
 * 4. Convert the "keyup" event into an obserable stream.
 *  - 1st argument is this.el.nativeElement, the native DOM element that this component is attached to. 
 *  - 2nd argument is the string "keyup" which is the name of the event we want to turn in a stream
 * 5. .map is says to map over each keyup event, then find the event target and extract the value of that element. This means our stream is now a stream of  strings.
 * 6. Filter means that the stream will not emit any search strings for which the length is less than one.
 * 7. debounceTime means we will throttle requests that come in faster than 250ms. That is, we wont search on every keystroke, but rather after the user has paused a small ammount.
 * 8. .do emables loading 
 *  - "do" on a stream is a way to perform a function mid-stream for each event, but it does not change anything in the steam.
 *  - this.loading is an EventEmitter. we "turn on" loading by emitting true as the next event.
 *  - Writing this.loading.emit(true) means, emit a true event on the laoding EventEmitter.
 *  - When we listen to the loading event on this component, the $event value will now be true.
 * 9. .map to perform a search for each query that is emitted.
 *  - By using switch we are essentially saying "ignore all search events but the most recent". That is if a new search comes in, we want to use the most recent and discard the rest.
 * 10. In the subscribe the 1st argument specifies what we want to do when the sream emits a reuglar event.
 *  - this.loading.emit(false), indicating we have stopped loading, this.results.emit(results), which will emit an event containing the list of results. 
 * - 2nd argument specifies what should happen when the stream has an error event. We set this.loading.emit(false) and log out the error. 
 * - 3rd argument specifies what should happen when the stream completes. Here we also emit that we are done loading. 
 *  
 */

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();
  constructor(private youtube: YoutubesearchService, private el: ElementRef ) { }

  ngOnInit(): void {
    // convert the `keyup` event into an observable stream
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value) // extract the value of the input
      .filter((text: string) => text.length > 1) // filter out if empty
      .debounceTime(250)                         // only once every 250ms
      .do(() => this.loading.emit(true))         // enable loading
      // search, discarding old events if new input comes in
      .map((query: string) => this.youtube.search(query))
      .switch()
      // act on the return of the search
      .subscribe(
        (results: SearchResult[]) => { // on sucesss
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.emit(false);
        },
        () => { // on completion
          this.loading.emit(false);
        }
      );
  }
}
