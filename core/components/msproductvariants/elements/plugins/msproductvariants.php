<?php
$msProductVariants = $modx->getService('msproductvariants', 'msProductVariants', $modx->getOption('msproductvariants_core_path', null, $modx->getOption('core_path') . 'components/msproductvariants/') . 'model/', $scriptProperties);
if (!($msProductVariants instanceof msProductVariants)) return '';

$eventName = $modx->event->name;
if (method_exists($msProductVariants, $eventName)) {
	$msProductVariants->$eventName($scriptProperties, $product);
}