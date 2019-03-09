import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatService} from './chat.service';
import {MockedChatService} from './mocked-chat.service';
import {UserService} from '../shared/user.service';
import {environment} from '../../environments/environment';
import {ChatWindowComponent} from './chat-window/chat-window.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { ChatMessageRowComponent } from './chat-message-row/chat-message-row.component';
import { ChatMessageSendFormComponent } from './chat-message-send-form/chat-message-send-form.component';
import {MomentModule} from 'ngx-moment';

export const chatServiceProvideFactoryFn =
  (userService: UserService) => {
    return !environment.production ?
      new ChatService(userService) :
      new MockedChatService(userService);
  };


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    MomentModule
  ],
  declarations: [
    ChatWindowComponent,
    ChatMessageRowComponent,
    ChatMessageSendFormComponent
  ],
  exports: [
    ChatWindowComponent
  ]
})
export class ChatModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: ChatModule,
  //     providers: [
  //       {
  //         provide: ChatService,
  //         useFactory: chatServiceProvideFactoryFn,
  //         deps: [UserService]
  //
  //       },
  //     ]
  //   };
  // }
}
