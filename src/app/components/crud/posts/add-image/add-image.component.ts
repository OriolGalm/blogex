import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from './../../../../shared/services/article.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {
  imageForm!: FormGroup;
  miniatura!: File;
  inputUpload!: File;
  constructor(
    private readonly fBuilder: FormBuilder,
    private articleService: ArticleService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.initForm();
  }

  ngOnInit() {
  }

  onSubmit(undefined: any){
    const articleId = Number(this.activatedRoute.snapshot.paramMap.get('articleid'));
    console.log(articleId);
    this.articleService.addImageToArticle(this.inputUpload, articleId).subscribe({
      next: data => {
        this.toastr.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['list'])
      },
      error: err => {
        this.toastr.error(err.error.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    })
    
  }

  private initForm(): void{
    this.imageForm = this.fBuilder.group({
      articleId: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  handleImage(event: any){
    this.inputUpload = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (e: any) => {
      this.miniatura = e.target.result;
    }
    fr.readAsDataURL(this.inputUpload);
  }

}
