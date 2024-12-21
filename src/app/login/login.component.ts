import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isRegisterMode: boolean = false;
  loginError: boolean = false;

  private adminUser = {
    username: 'admin',
    password: '12345'
  };

  constructor(private fb: FormBuilder, private router: Router,  public dialogRef: MatDialogRef<LoginComponent>  // Inyectamos el MatDialogRef
  ) {  }

  ngOnInit(): void {
 this.dialogRef.afterOpened;
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      newUsername: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  onLogin(): void {
    const { username, password } = this.loginForm.value;

    if (username === this.adminUser.username && password === this.adminUser.password) {
      this.loginError = false;
      alert ('Credenciales correctas');
      this.router.navigate(['/productos']);
      this.cerrarLogin();  // Cierra el modal después del login exitoso
    } else {
      this.loginError = true;
    }
  }

  onRegister(): void {
    console.log('Usuario registrado:', this.registerForm.value);
    this.toggleForm();
  }

  toggleForm(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.loginError = false;
  }


  cerrarLogin(): void {
    this.dialogRef.close();  // Cierra el modal
  }

}
