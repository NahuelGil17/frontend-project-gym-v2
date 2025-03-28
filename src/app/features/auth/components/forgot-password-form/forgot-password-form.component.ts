import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

import { AsyncPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { SnackBarService } from '@core/services/snackbar.service';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { BtnDirective } from '@shared/directives/btn/btn.directive';
import { InputDirective } from '@shared/directives/btn/input.directive';
import { ConditionalTextPipe } from '@shared/pipes/conditional-text.pipe';
import { ForgotPassword } from '../../state/auth.actions';
import { AuthState } from '../../state/auth.state';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    BtnDirective,
    AsyncPipe,
    ConditionalTextPipe,
    InputDirective,
  ],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.css',
})
export class ForgotPasswordFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  showPassword = false;
  showMessageConfirmation = false;
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
    // Create the login form with email and password fields
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
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
  recoveryPassword(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(new ForgotPassword(this.loginForm.value));
      this.actions
        .pipe(ofActionSuccessful(ForgotPassword), takeUntil(this.destroy))
        .subscribe(() => {
          //this.router.navigate(['/']);
          //TODO
          //this.store.dispatch(GetUserPreferences);
          this.snackbar.showSuccess('Éxito!', 'Email enviado');
          this.showMessageConfirmation = true;
        });
    }
  }

  goBack() {
    this.router.navigate(['auth/login']);
  }
}
