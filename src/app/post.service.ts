import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from 'src/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private angularFirestore: AngularFirestore) {}

  getPostDoc(id) {
    return this.angularFirestore
      .collection('post-collection')
      .doc(id)
      .valueChanges();
  }

  getPostList() {
    return this.angularFirestore
      .collection('post-collection')
      .snapshotChanges();
  }

  createPost(post: Post) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('post-collection')
        .add(post)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  deletePost(post) {
    return this.angularFirestore
      .collection('post-collection')
      .doc(post.id)
      .delete();
  }

  updatePost(post: Post, id) {
    return this.angularFirestore.collection('post-collection').doc(id).update({
      title: post.title,
      message: post.message,
    });
  }
}
