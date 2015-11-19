## Make Comments to a Dataset
Service for making comments to a dataset. Service designed to be used in conjunction with the Freshness Dashboard.

[![Build Status](https://travis-ci.org/luiscape/hdx-monitor-comments.svg)](https://travis-ci.org/luiscape/hdx-monitor-comments) [![Coverage Status](https://coveralls.io/repos/luiscape/hdx-monitor-comments/badge.svg?branch=master&service=github)](https://coveralls.io/github/luiscape/hdx-monitor-comments?branch=master)

### Usage
The API has the following working methods:

* `/[ORGANIZATION_ID]` **GET**: Retrieves statistics about an organization in CKAN.
* `/historic/[ORGANIZATION_ID]` **GET**: Retrieves a historic time-series about an organization in CKAN.


### Docker Usage
[![](https://badge.imagelayers.io/luiscape/hdx-monitor-comments:latest.svg)](https://imagelayers.io/?images=luiscape/hdx-monitor-comments:latest 'Get your own badge on imagelayers.io')

Run the docker command below:

```shell
$ docker run -d --name comments \
  -p 8000:8000 \
  luiscape/hdx-monitor-comments:latest
```

### Coding Standard
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
