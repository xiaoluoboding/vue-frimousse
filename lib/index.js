import { createElementBlock, createElementVNode, defineComponent, openBlock, toDisplayString } from "vue";

//#region src/packages/MyComponent.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = { class: "greetings" };
const _hoisted_2 = { class: "green" };
var MyComponent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "MyComponent",
	props: { msg: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createElementVNode("h1", _hoisted_2, toDisplayString(_ctx.msg), 1)]);
		};
	}
});

//#endregion
//#region \0/plugin-vue/export-helper
var export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};

//#endregion
//#region src/packages/MyComponent.vue
var MyComponent_default = /* @__PURE__ */ export_helper_default(MyComponent_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-32b9fa64"]]);

//#endregion
export { MyComponent_default as MyComponent };