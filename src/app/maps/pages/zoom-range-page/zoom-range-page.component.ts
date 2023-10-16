import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';


@Component({
  selector: 'page-zoom-range',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('map') divMap?: ElementRef;
  public zoom : number = 10; 
  public map?:  Map;
  public currentLngLat: LngLat = new LngLat(-4, 37)

  ngAfterViewInit(): void {
  
    if ( !this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }
  //añadimos una serie de listeners del objeto  tipo Map a nuestra app 
  mapListeners(){
    //Comprobamos que siempre habrá un objeto mapa
    if (!this.map) throw 'Mapa no inicializado';
    //obtenemos el zoom del mapa
    this.map.on('zoom', (ev)=>{
      this.zoom = this.map!.getZoom();
    });
    //si el valor del zoom sobrepasa el 18 vuelve a 18
    this.map.on('zoomend', (ev)=>{
      if (this.map!.getZoom()<18) return;
      this.map!.zoomTo(18);      
    });
    this.map.on('move', ()=>{
      this.currentLngLat = this.map!.getCenter();
    });

  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }
  
  //capturamos los cambios de valor del zoom
  zoomChanged( value: string){
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }
  //Borramos todos los listeners al acabar
  ngOnDestroy(): void {
    this.map?.remove();
  }

}
