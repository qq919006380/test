import ToastConstructor from './index.vue';
import { createVNode, render } from 'vue'

export default function (opts) {
    if (typeof opts === 'string') {
        opts = {
            message: opts,
        }
    }
    let options = opts
    options = {
        ...options,
        onClose: () => {
            close(id, userOnClose)
        },

    }
    var vm = createVNode(
        ToastConstructor,
        options,
        null
    );
    var container = document.createElement("div");
    render(vm, container);
    document.body.appendChild(container)
    return {
        // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
        // for out component, so that all closing steps will not be skipped.
        close: () => (vm.component.proxy).visible = false,
    }
};
