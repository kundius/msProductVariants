<?php
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var msProductVariants $msProductVariants */
$msProductVariants = $modx->getService('msProductVariants', 'msProductVariants', MODX_CORE_PATH . 'components/msproductvariants/model/');
$modx->lexicon->load('msproductvariants:default');

// handle request
$corePath = $modx->getOption('msproductvariants_core_path', null, $modx->getOption('core_path') . 'components/msproductvariants/');
$path = $modx->getOption('processorsPath', $msProductVariants->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);