import Mappable from '../Interfaces/Mappable';

export class CustomMap {
  private googleMap: google.maps.Map;

  // google.maps.map() can receive null, i've hacked the type
  // but always make a null check
  constructor(elementId: string, mapOptions?: google.maps.MapOptions) {
    this.googleMap = new google.maps.Map(
      document.getElementById(elementId) as HTMLElement,
      mapOptions
    );
  }

  addMarker(entity: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: entity.location.lat,
        lng: entity.location.lng
      }
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: entity.markerContent()
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
