import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SerialSet } from 'src/app/models/serial-set';
import { SerialSetRequest } from 'src/app/models/serial-set-request';
import { SerialSetService } from 'src/app/services/serial-set.service';

@Component({
  selector: 'app-serial-form',
  templateUrl: './serial-form.component.html',
  styleUrls: ['./serial-form.component.css']
})
export class SerialFormComponent implements OnInit {

 
  serialSetForm!: FormGroup;

  constructor(private serialSetService: SerialSetService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }



  initForm(): void {
    this.serialSetForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      configuration: [false],
      serialLength: [0],
      numbers: [false],
      upperCase: [false],
      lowerCase: [false],
      exclusions: [''],
    });
  }

  createSerialSet(): void {
    if (this.serialSetForm.valid) {
      const newSerialSet: SerialSetRequest = {
        ...this.serialSetForm.value,
      };

      this.serialSetService.createSerialSet(newSerialSet).subscribe(
        (createdSerialSet) => {
          console.log('Serial Set created successfully:', createdSerialSet);
          this.serialSetForm.reset();
          alert(`Serial Set created successfully: ${JSON.stringify(createdSerialSet)}`);
        },
        (error) => {
          console.error('Error creating serial set:', error);

          let errorMessage = 'Unknown error';

          if (error && error.error && error.error.message) {
            // Use the error message from the backend response
            errorMessage = error.error.message;
          }

          alert(`Error creating serial set: ${errorMessage}`);
        }
      );
    }
  }


  cancel(): void {
    this.serialSetForm.reset();
  }
}
