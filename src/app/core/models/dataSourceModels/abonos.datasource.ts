import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {AbonosViewModel} from "../viewModels/abonos.view-model";
import {RatesService} from "../../rates/rates.service";
import {catchError, finalize} from "rxjs/operators";

export class AbonosDataSource implements DataSource<AbonosViewModel> {

    private lessonsSubject = new BehaviorSubject<AbonosViewModel[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private svc: RatesService) {}

    loadAbonos(
        page:string,
        pageSize:string,
        sortFields:string,
        sortDirections:string,
        isPaginated:string) {

        this.loadingSubject.next(true);

        this.svc.findAllAbonosPage(page, pageSize, sortFields,
        sortDirections, isPaginated).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(abonos => this.lessonsSubject.next(this.maperoAbonos(abonos)));

    }

    connect(collectionViewer: CollectionViewer): Observable<AbonosViewModel[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    maperoAbonos(res:any): Array<AbonosViewModel>{
        if(res){
            let abonos = new Array<AbonosViewModel>();
            res.list.forEach((value, key) => {
                let abono = new AbonosViewModel();
                abono.n = +key+1;
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
            return abonos;
        }else{
            return null;
        }
      }

}