import {FormControl} from '@angular/forms';
import {TicketModel} from '../../shared/ticket-model';

export function bidMinimumValidator(getTicketfn: () => TicketModel) {
  return function (formControl: FormControl) {
    const ticket = getTicketfn();
    const minimumValue = ticket.currentBid + ticket.bidStep;
    if (parseInt(formControl.value, 0) < minimumValue) {
      return {
        'validateMinimumBid': true
      };

    }
  };
}
