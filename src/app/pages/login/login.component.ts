import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logo = 'assets/logo4p.png';
  artInfo = 'assets/art-teste.png';
  form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  getFormValidationErrors(): boolean {
    let controlErrors;
    Object.keys(this.form.controls).forEach((key) => {
      controlErrors = this.form.get(key).errors;
    });
    if (controlErrors) return true;
    return false;
  }
  onSubmit() {
    if (!this.getFormValidationErrors()) {
      let user: User = {
        username: this.form.get('userName').value,
        password: this.form.get('password').value,
        id: '',
        brand: undefined,
        img:''
      };

      this.userService.logar(user).subscribe({
        next: () => this.router.navigate(['']),
        error: (error) => {
          this.snackBar.open(
            'Falha na autenticação',
            'Usuário ou senha incorretos.',
            {
              duration: 10000,
            }
          );
        },
      });
    }
  }
}
