<?php

class msProductVariantDisableProcessor extends modObjectProcessor
{
    public $objectType = 'msProductVariant';
    public $classKey = 'msProductVariant';
    public $languageTopics = ['msproductvariants'];
    //public $permission = 'save';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('msproductvariants_variant_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var msProductVariant $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('msproductvariants_variant_err_nf'));
            }

            $object->set('active', false);
            $object->save();
        }

        return $this->success();
    }

}

return 'msProductVariantDisableProcessor';
