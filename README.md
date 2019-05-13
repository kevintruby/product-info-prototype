# product-info-prototype
Uses Vue CLI 3.7 to set up and run project.

Automatically sets API bearer token upon app startup, and will automatically refresh if expired. Decided to increase product count from 10 to 12 so that it can fit into Bootstrap columns more easily. Given more time, would have preferred to expose the username and password credentials necessary to fetch the bearer token in a .env file, supported by the CLI framework. Couldn't fit this into the 3 hour time frame, unfortunately, so it is hard-coded for now.

Utilizes Vuex and Vue-Router to support proper SPA structure; though Vue-Router is currently not really utilized, it is bundled to make future scalability easier. I have found in my experience that it's much more difficult to incrementally add the routing aspect to a project that used custom, internal state attributes to figure out where a user belongs in the application.

Vuex drives the majority of data, so that any component may read or mutate the state, based on an opt-in configuration of single-file Vue components, via Vuex mapping helper methods. Currently set up with two modules, `products` and `session`, which encapsulate async API logic via Vuex actions.

Leveraging webpack bundling, the `axios` library can easily be configured from within the `session` module to use the API bearer token, in order to make product-related API requests from within the `products` module.

Uses ES6 classes to represent information related to products among all aspects of the application, and also helps define a common definition for attributes and images. Defines a factory to populate instances of the class from API results, which have a much more complicated data structure; this structure is greatly simplified via the `lodash` library's `_.get()` method.

This project structure was a lot to cram in within 3 hours, so the presentation is a little bland. It would have been difficult to define so many classes and centralized functions, and the core Vuex structure with getters, actions, and mutations, if not for a lot of experience building SPAs with these tools in the past.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
