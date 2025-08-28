import { defineNuxtModule, addComponent } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "vue-library-starter",
    configKey: "vueLibraryStarter",
    compatibility: {
      nuxt: ">=3.0.0"
    }
  },
  defaults: {
    css: true
  },
  setup(moduleOptions, nuxt) {
    addComponent({
      name: "MyComponent",
      export: "MyComponent",
      filePath: "vue-library-starter",
      mode: "client"
    });
    if (moduleOptions.css) {
      nuxt.options.css.push("vue-library-starter/style.css");
    }
  }
});

export { module as default };
