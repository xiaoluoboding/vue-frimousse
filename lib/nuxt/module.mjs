import { defineNuxtModule, addComponent } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "vue-frimousse",
    configKey: "vueFrimousse",
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
      filePath: "vue-frimousse",
      mode: "client"
    });
    if (moduleOptions.css) {
      nuxt.options.css.push("vue-frimousse/style.css");
    }
  }
});

export { module as default };
