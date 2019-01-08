(function() {
    'use strict';
    function app(offset, appList) {
        var off = offset || 0;
        var app = appList || [];
        return kintone.api(kintone.api.url('/k/v1/apps', true), 'GET', {'offset': off}).then(function(resp) {
            app.push.apply(app, resp.apps);
            if (resp.apps.length === 100) {
                off += 100;
                return app(off, app);
            } else {
                return app;
            }
        });
    }

    function getAllapps(event) {
        app().then(function(apps) {
            // createTable(apps, event.record.BookMark_st.value);
            apps.forEach(function(app) {
                delete app.code;
                delete app.description;
                delete app.createdAt;
                delete app.creator;
                delete app.modifiedAt;
                delete app.modifier;
                delete app.threadId;
                delete app.spaceId;
            });
            // self.createJQtable(apps);
            createVuetable(apps);
        });
    }


    kintone.events.on('app.record.create.show', function(event) {
        getAllapps(event);
    })
})