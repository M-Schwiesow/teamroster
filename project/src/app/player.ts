export class Player {
  _id: String;
  name: String;
  pref_position: String;
  //read up on projections in mongodb
  //project fields from query results
  status: {
    game_id: String,
    status: String
  }[];
}
