const navigation = {
  recentLocation: [], // Array of recent places user have searched
  rideRoute: [], // Array of places
  ridingDetails: {
    status: 0, // NotStarted: 0, Riding: 1, Paused: 2, Stopped: 3
    rideType: 0, // SoloRide: 0, GroupRide: 1,
    routeDetails: {
      originInfo: {},
      rideRoute: [], // Array of places
      distanceInfo: {}, // Distance of entire route
    },
    favourite: false, // Is in favourite list
  },
  favouriteRides: [], // Array of favourite rides of user
  rentalsData: [],
  favouriteRoutesList: [],
  userRoutesList: [],
  groupRoutesList: [],
};

export default navigation;
