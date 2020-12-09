import 'izitoast/dist/css/iziToast.css';
// @ts-ignore
import iziToast from "izitoast";

iziToast.settings({
    position: 'topCenter'
})

export default {
    show(type, message, title, config) {
        let data = {
            message,
        };

        if (title) data['title'] = title;

        if (config)
            data = {
                ...data,
                ...config
            };

        return iziToast[type](data)
    },
    success(message, title, config) {
        return this.show('success', message, title, config)
    },

    info(message, title, config) {
        return this.show('info', message, title, config)
    },

    error(message, title, config) {
        return this.show('error', message, title, config)
    }
}