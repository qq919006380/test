import ToastConstructor from './index.vue';
import { createVNode, render } from 'vue'

export default function (message,opts) {
    
    
    let options = {
        message:message,
        onClose: () => {
            close(id, userOnClose)
        },

    }
    Object.assign(options,opts)
    console.log(options);
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
