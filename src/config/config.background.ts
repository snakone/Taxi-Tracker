import { BackgroundGeolocationConfig } from "@ionic-native/background-geolocation";

export const config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: false, 
    stopOnTerminate: false,
    interval: 5000
};