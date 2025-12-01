import { h, inject, provide, readonly, ref } from 'vue';

const ROUTER_KEY = Symbol('router');

function pathToRegex(path) {
  const paramNames = [];
  const regexPath = path
    .replace(/\//g, '\\/')
    .replace(/:(\w+)/g, (_, key) => {
      paramNames.push(key);
      return '([^/]+)';
    });
  const regex = new RegExp(`^${regexPath}$`);
  return { regex, paramNames };
}

function matchRoute(path, routes) {
  for (const route of routes) {
    const { regex, paramNames } = pathToRegex(route.path);
    const match = path.match(regex);
    if (match) {
      const params = {};
      paramNames.forEach((name, index) => {
        params[name] = match[index + 1];
      });
      return {
        path,
        name: route.name,
        params,
        meta: route.meta || {},
        matched: [route],
        component: route.component
      };
    }
  }
  return {
    path,
    params: {},
    matched: [],
    component: null,
    meta: {}
  };
}

export function createWebHistory() {
  return {
    mode: 'history'
  };
}

export function createRouter({ history, routes }) {
  const currentRoute = ref(matchRoute(window.location.pathname, routes));

  const navigateTo = (path, replace = false) => {
    const targetRoute = matchRoute(path, routes);
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    currentRoute.value = targetRoute;
  };

  const handlePopState = () => {
    currentRoute.value = matchRoute(window.location.pathname, routes);
  };

  const router = {
    history,
    currentRoute: readonly(currentRoute),
    push: (path) => navigateTo(path, false),
    replace: (path) => navigateTo(path, true),
    install(app) {
      app.provide(ROUTER_KEY, router);
      app.component('RouterView', RouterView);
      app.component('RouterLink', RouterLink);
      window.addEventListener('popstate', handlePopState);
    }
  };

  return router;
}

export function useRouter() {
  const router = inject(ROUTER_KEY);
  if (!router) {
    throw new Error('Router instance was not found. Did you forget to call app.use(router)?');
  }
  return router;
}

export function useRoute() {
  const router = useRouter();
  return router.currentRoute;
}

const RouterView = {
  name: 'RouterView',
  setup() {
    const route = useRoute();
    return () => {
      const matched = route.value?.matched?.[0];
      if (matched && matched.component) {
        return h(matched.component);
      }
      return null;
    };
  }
};

const RouterLink = {
  name: 'RouterLink',
  props: {
    to: {
      type: String,
      required: true
    },
    replace: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const router = useRouter();

    const navigate = (event) => {
      event.preventDefault();
      if (props.replace) {
        router.replace(props.to);
      } else {
        router.push(props.to);
      }
    };

    return () => h(
      'a',
      {
        href: props.to,
        onClick: navigate
      },
      slots.default ? slots.default() : props.to
    );
  }
};
