import { AuthCredentials } from '@features/auth/interfaces/auth';
import { PageClient } from '../interface/filters.clients.interface';

export class GetClients {
  static readonly type = '[Client] GetClients';
  constructor(public readonly payload: PageClient) {}
}

export class RegisterClient {
  static readonly type = '[Client] RegisterClient';
  constructor(public readonly payload: AuthCredentials) {}
}

export class CreateClient {
  static readonly type = '[Client] createClient';
  constructor(public readonly payload: any) {}
}

export class UpdateClient {
  static readonly type = '[Client] UpdateClient';
  constructor(
    public readonly id: string,
    public readonly payload: any,
  ) {}
}
export class DeleteClient {
  static readonly type = '[Client] DeleteClient';
  constructor(public readonly id: string) {}
}