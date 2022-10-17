import { LocalNotifications } from "@capacitor/local-notifications";

// Adapted code from: https://blog.chinaza.dev/ionic-react-local-notifications-using-capacitor
class Notifications {
    public async schedule(date: Date) {
        try {
            let id = new Date().getMilliseconds();
            //@ts-ignore: next-line
            LocalNotifications.checkPermissions().then((res) => {
                if (res.display !== "granted") return LocalNotifications.requestPermissions();
            });

            // // Clear old notifications in prep for refresh (OPTIONAL)
            // const pending = await LocalNotifications.getPending();
            // if (pending.notifications.length > 0)
            //     await LocalNotifications.cancel(pending);

            await LocalNotifications.schedule({
                notifications: [{
                    title: 'New pokemon available!',
                    body: 'Come claim your new pokemon!',
                    id: id,
                    schedule: {
                        at: date
                    }
                }]
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default new Notifications()