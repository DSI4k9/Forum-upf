import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../../post.model';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
})

export class ListPostComponent implements OnInit {
  Posts: Post[];

  constructor(private postService: PostService,public authService: AuthService) {}

  ngOnInit() {
    this.postService.getPostList().subscribe((res) => {
      this.Posts = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Post),
        };
      });
    });
  }

  removePost = (post) => this.postService.deletePost(post);
}
