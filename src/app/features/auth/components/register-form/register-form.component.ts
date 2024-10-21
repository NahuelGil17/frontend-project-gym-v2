import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from '@core/services/snackbar.service';
import { passwordValidator } from '@core/validators/password.validator';
import { AuthState } from '@features/auth/state/auth.state';
import { Actions, Store } from '@ngxs/store';
import { BtnDirective } from '@shared/directives/btn/btn.directive';
import { InputDirective } from '@shared/directives/btn/input.directive';
import { ConditionalTextPipe } from '@shared/pipes/conditional-text.pipe';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    BtnDirective,
    AsyncPipe,
    ConditionalTextPipe,
    InputDirective,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;

  showPassword = false;
  confirmPassword = false;
  private destroy = new Subject<void>();

  loading$: Observable<boolean> = this.store.select(AuthState.authLoading);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private actions: Actions,
    private snackbar: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      identifier: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, passwordValidator()]],
      confirmPassword: [null, [Validators.required, passwordValidator()]],
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  /**
   * Authenticate the user and redirect to dashboard
   * @returns void
   */
  register(): void {
    if (this.registerForm.valid) {
      console.log('VALID');
    }
    console.log('INVALID');
  }

  registerWithGoogle(): void {}
}
