var Story = require("../models/story");

class StoryDAO{
  constructor(){}

  getAllStories(){
    return [
      new Story({
        id: 0,
        title: "Mama",
        story: "Nice story",
        criteria: "None",
        value: 100,
        estimations: 100,
        status: ":)"
      })
    ];
  }

  getStory(id){
    return new Story({
        id: id,
        title: "Mama",
        story: "Nice story",
        criteria: "None",
        value: 100,
        estimations: 100,
        status: ":)"
      });
  }

  addStory(story){
    return undefined;
  }

  updateStory(story){
    return undefined;
  }
}

module.exports = StoryDAO;
