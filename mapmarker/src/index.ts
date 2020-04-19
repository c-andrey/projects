import { User } from './Classes/User';
import { Company } from './Classes/Company';
import { CustomMap } from './Classes/CustomMap';

const elementId = 'map';
const user = new User();
const company = new Company();

const mapOptions: google.maps.MapOptions = {
  zoom: 1,
  center: {
    lat: user.location.lat,
    lng: user.location.lng
  }
};

const customMap = new CustomMap(elementId, mapOptions);

customMap.addMarker(user);
customMap.addMarker(company);
