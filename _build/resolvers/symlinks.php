<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/msProductVariants/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/msproductvariants')) {
            $cache->deleteTree(
                $dev . 'assets/components/msproductvariants/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/msproductvariants/', $dev . 'assets/components/msproductvariants');
        }
        if (!is_link($dev . 'core/components/msproductvariants')) {
            $cache->deleteTree(
                $dev . 'core/components/msproductvariants/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/msproductvariants/', $dev . 'core/components/msproductvariants');
        }
    }
}

return true;