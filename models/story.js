class Story{
  constructor(storyData){
    this._title = storyData.title;
    this._story = storyData.story;
    this._criteria = storyData.criteria;
    this._value = storyData.value;
    this._estimations = storyData.estimations;
    this._status = storyData.status;
  }

  get title(){
    return this._title;
  }

  set title(value){
    this._title = value;
  }

  get story(){
    return this._story;
  }

  set story(value){
    this._story = value;
  }

  get criteria(){
    return this._criteria;
  }

  set criteria(value){
    this._criteria = value;
  }

  get value(){
    return this._value;
  }

  set value(value){
    this._value = value;
  }

  get estimations(){
    return this._estimations;
  }

  set estimations(value){
    this._estimations = value;
  }

  get status(){
    return this._status;
  }

  set status(value){
    this._status = value;
  }
}
