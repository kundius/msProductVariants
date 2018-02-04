<?php

class msProductVariantUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'msProductVariant';
    public $classKey = 'msProductVariant';
    public $languageTopics = ['msproductvariants'];
    //public $permission = 'save';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        if (empty($id)) {
            return $this->modx->lexicon('msproductvariants_variant_err_ns');
        }

        return parent::beforeSet();
    }
}

return 'msProductVariantUpdateProcessor';
