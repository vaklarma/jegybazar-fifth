import {Component, OnInit} from '@angular/core';
import {TicketBidinfoService} from '../../shared/ticket-bidinfo.service';

@Component({
  selector: 'app-ticket-bid-info',
  templateUrl: './ticket-bid-info.component.html',
  styleUrls: ['./ticket-bid-info.component.css']
})
export class TicketBidInfoComponent implements OnInit {
  bids: any;

  constructor(private ticketAndBidinfoService: TicketBidinfoService) {
  }

  ngOnInit() {
    this.ticketAndBidinfoService.getTicketAndBid();

    this.ticketAndBidinfoService.getBids().subscribe(
      (data) => {
        this.bids = data;
        console.log(this.bids);
      }
    );

  }

}
