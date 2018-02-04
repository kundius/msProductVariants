Ext.ComponentMgr.onAvailable('minishop2-product-tabs', function () {
    this.on('beforerender', function () {
        this.add({
            title: _('msproductvariants_tab_title'),
            hideMode: 'offsets',
            items: [
                {
                    xtype: 'msproductvariants-grid',
                    cls: 'main-wrapper'
                }
            ]
        });
    });
});