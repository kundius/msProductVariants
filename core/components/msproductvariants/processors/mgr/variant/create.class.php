<?php

class msProductVariantCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'msProductVariant';
    public $classKey = 'msProductVariant';
    public $languageTopics = ['msproductvariants'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {

        return parent::beforeSet();
    }

}

return 'msProductVariantCreateProcessor';