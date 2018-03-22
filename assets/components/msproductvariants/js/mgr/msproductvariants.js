var msProductVariants = function (config) {
    config = config || {};
    msProductVariants.superclass.constructor.call(this, config);
};
Ext.extend(msProductVariants, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, form: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('msproductvariants', msProductVariants);

msProductVariants = new msProductVariants();
