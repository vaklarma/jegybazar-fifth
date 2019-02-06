import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-bidding-card',
  templateUrl: './bidding-card.component.html',
  styleUrls: ['./bidding-card.component.css']
})
export class BiddingCardComponent implements OnChanges {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: Boolean;
  @Output() bid = new EventEmitter<void>();
  loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticket'] != null
      && !changes['ticket'].isFirstChange()
      && changes['ticket'].currentValue != null
    ) {
      console.log('ngOnChanges a tiket inputra');
      this.loading = false;
    }
  }

  onBidWithBidStep() {
    this.bid.emit();
    this.loading = true;
  }


}
