<?php

class msProductVariants
{
    /** @var modX $modx */
    public $modx;


    /**
     * @param modX $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config = [])
    {
        $this->modx =& $modx;
        $corePath = MODX_CORE_PATH . 'components/msproductvariants/';
        $assetsUrl = MODX_ASSETS_URL . 'components/msproductvariants/';

        $this->config = array_merge([
            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'processorsPath' => $corePath . 'processors/',

            'connectorUrl' => $assetsUrl . 'connector.php',
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl . 'css/',
            'jsUrl' => $assetsUrl . 'js/',
        ], $config);

        $this->modx->addPackage('msproductvariants', $this->config['modelPath']);
        $this->modx->lexicon->load('msproductvariants:default');
    }

    public function OnDocFormPrerender($sp) {
		if ($this->modx->getOption('mode', $sp) !== 'upd') {
			return;
		}
		if (!$this->modx->getObject('msProduct', $sp['id'])) {
			return;
        }

        $this->modx->controller->addLexiconTopic('msproductvariants:default');
        $data_js = preg_replace(array('/^\n/', '/\t{6}/'), '', '
			msProductVariants.config.connector_url = "' . $this->config['connectorUrl'] . '";
			msProductVariants.product_id = ' . $sp['id'] . ';
		');
		$this->modx->regClientStartupScript("<script type=\"text/javascript\">\n" . $data_js . "\n</script>", true);
        $this->modx->controller->addJavascript($this->config['jsUrl'] . 'mgr/msproductvariants.js');
        $this->modx->controller->addJavascript($this->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->modx->controller->addJavascript($this->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->modx->controller->addJavascript($this->config['jsUrl'] . 'mgr/widgets/variants.windows.js');
        $this->modx->controller->addJavascript($this->config['jsUrl'] . 'mgr/widgets/variants.grid.js');
        $this->modx->controller->addJavascript($this->config['jsUrl'] . 'mgr/widgets/product.tab.js');
		$this->modx->regClientCSS($this->config['cssUrl'] . 'mgr/main.css');
    }

}