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
        }],
        // listeners: {
        //     beforeSubmit: {
        //         fn: function (a, b, c) {
        //             console.log(a, b, c);
        //             return false;
        //         }, scope: this
        //     }
        // }
    });
    msProductVariants.window.CreateVariant.superclass.constructor.call(this, config);
};
Ext.extend(msProductVariants.window.CreateVariant, MODx.Window, {

    getFields: function (config) {
        var values = Ext.getCmp('modx-panel-resource').getForm().getValues();
        var fieldset = new Ext.form.FieldSet();
        fieldset.add({
            xtype: 'combo',
            name: 'color[]',
            fieldLabel: _('ms2_product_color'),
            triggerAction: 'all',
            store: values['color[]'],
            listeners: {
                change: {
                    fn: this.onChangeOption,
                    scope: this
                }
            }
        });
        Ext.each(miniShop2.config.option_fields, function(item, index) {
            if (item.type == "combo-options") {
                var key = 'options-' + item.key + '[]';
                fieldset.add({
                    xtype: 'combo',
                    name: key,
                    fieldLabel: item.caption,
                    triggerAction: 'all',
                    store: values[key],
                    listeners: {
                        change: {
                            fn: this.onChangeOption,
                            scope: this
                        }
                    }
                });
            }
        });

        return [{
            xtype: 'hidden',
            name: 'product_id',
            id: config.id + '-product_id',
            allowBlank: false,
        }, {
            xtype: 'tabpanel',
            activeTab: 0,
            items: [{
                title: _('msproductvariants_variant_options'),
                items: [fieldset]
            },{
                title: _('msproductvariants_variant_values'),
                items: [{
                    xtype: 'textarea',
                    fieldLabel: _('msproductvariants_variant_values'),
                    name: 'values',
                    id: config.id + '-values',
                    height: 150
                }]
            }]
        }, {
            xtype: 'textarea',
            name: 'options',
            id: config.id + '-options',
            allowBlank: false,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('msproductvariants_variant_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

    onChangeOption: function (a, b) {
        console.log(a, b);
    }
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

    loadDropZones: function () {
    }

});
Ext.reg('msproductvariants-window-update', msProductVariants.window.UpdateVariant);
