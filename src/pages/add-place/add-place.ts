import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../.././models/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PlacesService } from '../../services/places';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location : Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  imageUrl:string;

  locationIsSet: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private modalCtrl: ModalController,
              private geoLocation: Geolocation,
              private camera: Camera,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  onSubmit(form: NgForm){
    console.log(form);
    this.placesService.addPlace(form.value.title,form.value.description,form.value.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 40.7624324,
     lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }

  onOpenMap(){
    const modal= this.modalCtrl.create(SetLocationPage, {location : this.location, isSet: this.locationIsSet});

    modal.present();
    modal.onDidDismiss( data=> {
      if(data){
        this.location = data.location;
        this.locationIsSet = true;
      }
    })
  }

  onLocate(){
    const loader = this.loadingCtrl.create({
      content: 'Getting location...'
    });
    loader.present();
    this.geoLocation.getCurrentPosition()
    .then( data=> {
      this.location.lat= data.coords.latitude;
      this.location.lng= data.coords.longitude;
      this.locationIsSet = true;
      loader.dismiss();
    })
    .catch(error=> {
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Could not get location. Please choose is manually',
        duration: 2500
      });
      toast.present();
    });
  }

  onTakePhoto(){
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
    .then(
      imageData => {
        this.imageUrl = imageData;
      }
    )
    .catch(
      err=> console.log(err)
      
    )
  }
}
