import 'izitoast/dist/css/iziToast.css';
// @ts-ignore
import iziToast from "izitoast";
// @ts-ignore
iziToast.settings({
    position: 'topCenter'
});

export default {
    show(type: string, message: string, title?: string, config?: any) {
        let data: any = {
            message,
        };

        if (title) data['title'] = title;

        if (config)
            data = {
                ...data,
                ...config
            };

        return (iziToast as any)[type](data)
    },
    success(message: string, title?: string, config?: any) {
        return this.show('success', message, title, config)
    },

    info(message: string, title?: string, config?: any) {
        return this.show('info', message, title, config)
    },

    error(message: string, title?: string, config?: any) {
        return this.show('error', message, title, config)
    }
}