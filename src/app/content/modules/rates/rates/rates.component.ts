// COMPLEMENTOS
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
// SERVICIOS
import { RatesService } from '../../../../core/rates/rates.service';
import { MatPaginator, MatSort } from '@angular/material';
// MODELS
import { AbonosViewModel } from '../../../../core/models/viewModels/abonos.view-model'
import { AbonosDataSource } from '../../../../core/models/dataSourceModels/abonos.datasource'
import { tap, merge, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit, OnDestroy, AfterViewInit {
  public currentEuroRates: any = null;
  public postCurrent: any = null;
  public deleteCurrent: any = null;
  // TABLE ABONOS
  public displayedColumnsAbonos: string[] = ['n', 'tipoCuenta', 'formaPago', 'valor'];
  public dataSourceAbonos: AbonosDataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(private svc: RatesService) { }

  ngOnInit() {
    this.getCurrentEuroRates();
    this.dataSourceAbonos = new AbonosDataSource(this.svc);
    this.dataSourceAbonos.loadAbonos('1','10','id','asc','Y');
  }
  ngOnDestroy(): void {
  }
  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  }

  getCurrentEuroRates(){
    this.svc.getCurrentEuroRates()
    .subscribe(
      res => this.currentEuroRates = res
    );
  }

  postRates(){
    const rates = this.transformData();
    rates.forEach(rate =>
      this.svc.postRates(rate).subscribe(rest=> this.postCurrent = rest)
    );
    
  }

  private transformData() {
    const current = this.currentEuroRates.rates;
    return Object.keys(current).map(key => ({
      date: this.currentEuroRates.date,
      currency: key,
      euros: current[key]
    }));
  }

  deleteMyRates() {
    this.svc.deleteMyRates().subscribe(
      res => this.deleteCurrent = res
    );
  }

  findAllAbonos(){
    this.svc.findAllAbonos()
    .subscribe((res:any)=>this.maperoAbonos(res))
  }

  maperoAbonos(res:any){
    if(res){
      let abonos = new Array<AbonosViewModel>();
      res.list.forEach((value, key) => {
        let abono = new AbonosViewModel();
        abono.n = +key;
        abono.id = +value.id;
        abono.tipoCuenta = value.tipoCuenta;
        abono.formaPago = value.formaPago;
        abono.nombreBanco = value.nombreBanco;
        abono.numeroCuenta = value.numeroCuenta;
        abono.valor = value.valor;
        abono.estado = value.estado;
        abono.fechaCreacion = value.fechaCreacion;
        abono.fechaActualizacion = value.fechaActualizacion;
        abono.usuarioCreacion = value.usuarioCreacion;
        abono.usuarioActualizacion = value.usuarioActualizacion;
        abono.idContrato = value.tbMiContrato?value.tbMiContrato.id:null;
        abono.idCliente = value.tbMiCliente?value.tbMiCliente.id:null;
        abonos.push(abono);
      });
      //this.dataSourceAbonos = new MatTableDataSource<AbonosViewModel>(abonos);
    }
  }

  loadLessonsPage() {
    this.dataSourceAbonos.loadAbonos(
      this.paginator.pageIndex.toString(),
      this.paginator.pageSize.toString(),
      'id',
      'asc',
      'S');
  }

  throwError(){
    throw new Error('My Pretty Error');
  }

  throwHttpError(){
    this.svc.testGet("urlHere").subscribe();
  }

}
