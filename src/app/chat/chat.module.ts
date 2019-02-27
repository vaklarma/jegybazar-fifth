import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatService} from './chat.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ChatModule {
static forRoot(): ModuleWithProviders {
  return {
    ngModule: ChatModule,
    providers: [ChatService]
  };
}
}
