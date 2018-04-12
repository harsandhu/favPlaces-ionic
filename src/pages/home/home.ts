import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { PlacesService } from '../../services/places';
import { Place } from '../../models/place';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(public navCtrl: NavController, 
              private placeService: PlacesService,
              private modalCtrl: ModalController) {

  }

  ionViewWillEnter(){
    this.places = this.placeService.loadPlaces();
  }

  onOpenPlace(place: Place,index: number){
    const modal = this.modalCtrl.create(PlacePage,{place: Place, index: index});
    modal.present();
  }

}
