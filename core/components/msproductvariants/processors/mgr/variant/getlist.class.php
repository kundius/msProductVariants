<?php

class msProductVariantGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'msProductVariant';
    public $classKey = 'msProductVariant';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    //public $permission = 'list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
		$product_id = $this->getProperty('product_id');
		$c->where(array('product_id' => $product_id));
        // $query = trim($this->getProperty('query'));
        // if ($query) {
        //     $c->where([
        //         'name:LIKE' => "%{$query}%",
        //         'OR:description:LIKE' => "%{$query}%",
        //     ]);
        // }

        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        $array['actions'] = [];

        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('msproductvariants_variant_update'),
            //'multiple' => $this->modx->lexicon('msproductvariants_variants_update'),
            'action' => 'updateVariant',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('msproductvariants_variant_enable'),
                'multiple' => $this->modx->lexicon('msproductvariants_variants_enable'),
                'action' => 'enableVariant',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('msproductvariants_variant_disable'),
                'multiple' => $this->modx->lexicon('msproductvariants_variants_disable'),
                'action' => 'disableVariant',
                'button' => true,
                'menu' => true,
            ];
        }

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('msproductvariants_variant_remove'),
            'multiple' => $this->modx->lexicon('msproductvariants_variants_remove'),
            'action' => 'removeVariant',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'msProductVariantGetListProcessor';
