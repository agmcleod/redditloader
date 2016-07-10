var rp = require('request-promise');

module.exports = {
  getSubredditPosts: function (name) {
    return rp('https://reddit.com/r/' + name + '.json?limit=10').then(function (data) {
      var parsedData = JSON.parse(data);
      var mappedData = [];
      for (var i = 0; i < parsedData.data.children.length; i++) {
        var childData = parsedData.data.children[i].data;
        var preview = null;
        if (childData.preview && childData.preview.images.length > 0) {
          preview = childData.preview.images[childData.preview.images.length - 1];
        }
        var object = {
          preview: preview,
          permalink: childData.permalink,
          title: childData.title,
          url: childData.url
        };

        mappedData.push(object);
      }
      return Promise.resolve(mappedData);
    });
  }
};