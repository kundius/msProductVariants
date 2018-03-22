msProductVariants.window.CreateVariant = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'msproductvariants-window-create';
    }
    Ext.applyIf(config, {
        title: _('msproductvariants_variant_create'),
        width: 800,
        autoHeight: true,
        url: msProductVariants.config.connector_url,
        action: 'mgr/variant/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    msProductVariants.window.CreateVariant.superclass.constructor.call(this, config);
};
Ext.extend(msProductVariants.window.CreateVariant, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'product_id',
            id: config.id + '-product_id',
            allowBlank: false,
        }, {
            layout:'column',
            style: 'margin-bottom: 20px',
            defaults: {
                layout: 'form',
                defaults: {
                    msgTarget: 'under'
                }
            },
            items: [{
                columnWidth: .67,
                items: [{
                    xtype: 'textfield',
                    name: 'name',
                    anchor: '100%',
                    allowBlank: false,
                    fieldLabel: _('msproductvariants_variant_name')
                }]
            }, {
                columnWidth: .33,
                style: 'margin-top: 18px',
                items: [{
                    xtype: 'xcheckbox',
                    boxLabel: _('msproductvariants_variant_active'),
                    name: 'active',
                    id: config.id + '-active',
                    checked: true,
                }]
            }]
        }, {
            xtype: 'tabpanel',
            activeTab: 0,
            items: [{
                title: _('msproductvariants_variant_options'),
                layout: 'form',
                autoWidth: true,
                height: 400,
                items: [{
                    xtype: 'msproductvariants-panel-options',
                    inputConfig: {
                        name: 'options',
                        id: config.id + '-options',
                        allowBlank: false
                    }
                }]
            }, {
                title: _('msproductvariants_variant_values'),
                layout: 'form',
                autoWidth: true,
                height: 400,
                items: [{
                    xtype: 'msproductvariants-panel-values',
                    inputConfig: {
                        name: 'values',
                        id: config.id + '-values',
                        allowBlank: false
                    }
                }]
            }]
        }];
    },
});
Ext.reg('msproductvariants-window-create', msProductVariants.window.CreateVariant);


msProductVariants.window.UpdateVariant = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'msproductvariants-window-update';
    }
    Ext.applyIf(config, {
        title: _('msproductvariants_variant_update'),
        width: 550,
        autoHeight: true,
        url: msProductVariants.config.connector_url,
        action: 'mgr/variant/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    msProductVariants.window.UpdateVariant.superclass.constructor.call(this, config);
};
Ext.extend(msProductVariants.window.UpdateVariant, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textarea',
            fieldLabel: _('msproductvariants_variant_options'),
            name: 'options',
            id: config.id + '-options',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('msproductvariants_variant_values'),
            name: 'values',
            id: config.id + '-values',
            height: 150
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('msproductvariants_variant_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

});
Ext.reg('msproductvariants-window-update', msProductVariants.window.UpdateVariant);
