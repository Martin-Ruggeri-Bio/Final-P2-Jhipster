import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SaleFormService, SaleFormGroup } from './sale-form.service';
import { ISale } from '../sale.model';
import { SaleService } from '../service/sale.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-sale-update',
  templateUrl: './sale-update.component.html',
})
export class SaleUpdateComponent implements OnInit {
  isSaving = false;
  sale: ISale | null = null;

  usersSharedCollection: IUser[] = [];

  editForm: SaleFormGroup = this.saleFormService.createSaleFormGroup();

  constructor(
    protected saleService: SaleService,
    protected saleFormService: SaleFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sale }) => {
      this.sale = sale;
      if (sale) {
        this.updateForm(sale);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sale = this.saleFormService.getSale(this.editForm);
    if (sale.id !== null) {
      this.subscribeToSaveResponse(this.saleService.update(sale));
    } else {
      this.subscribeToSaveResponse(this.saleService.create(sale));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISale>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(sale: ISale): void {
    this.sale = sale;
    this.saleFormService.resetForm(this.editForm, sale);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, sale.client);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.sale?.client)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
