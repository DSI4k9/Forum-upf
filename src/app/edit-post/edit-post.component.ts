import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from "../shared/services/auth.service";


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent implements OnInit {

  public editForm: FormGroup;
  postRef: any

  constructor(
    public authService: AuthService,
    public postService: PostService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      title: [''],
      message: ['']
    })
  }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');

    this.postService.getPostDoc(id).subscribe(res => {
      this.postRef = res;
      this.editForm = this.formBuilder.group({
        title: [this.postRef.title],
        message: [this.postRef.message],
      })
    })
  }

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');

    this.postService.updatePost(this.editForm.value, id);
    this.router.navigate(['list-posts']);
  };

}
