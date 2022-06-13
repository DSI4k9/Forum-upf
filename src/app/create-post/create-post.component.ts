import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import { PostService } from '../post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";




@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public postForm: FormGroup;

  constructor(public postService: PostService,
              public formBuilder: FormBuilder,
              public router: Router,public authService: AuthService){
    this.postForm = this.formBuilder.group({
      title: [''],
      message: [''],
      owner: this.authService.userData.displayName ,
      date: new Date().toLocaleString()
    })
  }


  ngOnInit(): void {
  }

  onSubmit() {
    this.postService.createPost(this.postForm.value);
    this.router.navigate(['list-posts']);
  };

}


