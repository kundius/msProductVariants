msProductVariants.panel.Values = function (config) {
    config = config || {};

    this.valuesInput = new Ext.create(Ext.applyIf(config.inputConfig, {
        xtype: 'hidden'
    }));

    this.fieldStore = new Ext.data.ArrayStore({
        idIndex: 0,
        fields: ['name','label','xtype'],
        data: this.getFieldsArray()
    });

    this.fieldCombo = new Ext.form.ComboBox({
        mode: 'local',
        store: this.fieldStore,
        valueField: 'name',
        displayField: 'label',
        triggerAction: 'all',
        anchor: '100%'
    });

    Ext.applyIf(config, {
        tbar: [
            this.fieldCombo,
            {
                text: _('msproductvariants_add_field'),
                listeners: {
                    click: {
                        fn: this.addField,
                        scope: this
                    }
                }
            }
        ],
        autoWidth: true,
        autoHeight: true,
        layout: 'form',
        items: [this.valuesInput]
    });
    msProductVariants.panel.Values.superclass.constructor.call(this, config);
};
Ext.extend(msProductVariants.panel.Values, Ext.Panel, {

    getFieldsArray: function() {
        var items = [];

        if (msProductVariants.main_fields) {
            Ext.each(msProductVariants.main_fields, function(field) {
                Ext.applyIf(field, {
                    xtype: 'textfield',
                    label: _('resource_' + field.name)
                });
                items.push([field.name, field.label, field.xtype]);
            });
        }

        if (msProductVariants.tv_fields) {
            Ext.each(msProductVariants.tv_fields, function(field) {
                Ext.applyIf(field, {
                    xtype: 'textfield',
                    label: field.name
                });
                items.push([field.name, field.label, field.xtype]);
            });
        }

        return items;
    },

    addField: function () {
        var name = this.fieldCombo.getValue();
        if (name) {
            var record = this.fieldStore.getById(name);
            this.add({
                fieldLabel: record.get('label'),
                xtype: record.get('xtype'),
                anchor: '100%',
                listeners: {
                    change: {
                        fn: function(field, value) {
                            msProductVariants.utils.setComposite(this.valuesInput, record.get('name'), value);
                        },
                        scope: this
                    }
                }
            });
            this.fieldStore.remove(record);
            this.fieldCombo.reset();
            this.doLayout();
        }
    },

});
Ext.reg('msproductvariants-panel-values', msProductVariants.panel.Values);

msProductVariants.panel.Options = function (config) {
    config = config || {};

    this.optionsInput = new Ext.create(Ext.applyIf(config.inputConfig, {
        xtype: 'hidden'
    }));

    this.leftColumn = new Ext.Container({
        layout: 'form',
        columnWidth: 0.5,
        items: []
    });

    this.rightColumn = new Ext.Container({
        layout: 'form',
        columnWidth: 0.5,
        items: []
    });

    Ext.applyIf(config, {
        layout: 'column',
        autoWidth: true,
        autoHeight: true,
        items: [this.optionsInput, this.leftColumn, this.rightColumn]
    });
    msProductVariants.panel.Options.superclass.constructor.call(this, config);
    this.loadOptions();
};
Ext.extend(msProductVariants.panel.Options, Ext.Panel, {

    loadOptions: function() {
        var self = this;
        var values = Ext.getCmp('modx-panel-resource').getForm().getValues();
        self.leftColumn.add({
            xtype: 'combo',
            anchor: '100%',
            name: 'color[]',
            fieldLabel: _('ms2_product_color'),
            triggerAction: 'all',
            store: values['color[]'],
            listeners: {
                change: {
                    fn: self.onChangeOption,
                    scope: self
                }
            }
        });
        Ext.each(miniShop2.config.option_fields, function(item, index) {
            if (item.type == "combo-options") {
                var key = 'options-' + item.key + '[]';
                var row = {
                    xtype: 'combo',
                    anchor: '100%',
                    name: key,
                    fieldLabel: item.caption,
                    triggerAction: 'all',
                    store: values[key],
                    listeners: {
                        change: {
                            fn: self.onChangeOption,
                            scope: self
                        }
                    }
                };
                if (self.leftColumn.items.length > self.rightColumn.items.length) {
                    self.rightColumn.add(row);
                } else {
                    self.leftColumn.add(row);
                }
            }
        });
    },

    onChangeOption: function (combo) {
        msProductVariants.utils.setComposite(this.optionsInput, combo.name, combo.value);
    },

});
Ext.reg('msproductvariants-panel-options', msProductVariants.panel.Options);
