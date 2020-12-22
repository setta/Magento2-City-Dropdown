<?php

namespace Eadesigndev\RomCity\Setup;

use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;

class InstallSchema implements InstallSchemaInterface
{
    /**
     * {@inheritdoc}
     */
    public function install(
        SchemaSetupInterface $setup,
        ModuleContextInterface $context
    ) {
        $installer = $setup;
        $installer->startSetup();

        $table_city = $setup->getConnection()->newTable($setup->getTable('eadesign_romcity'));

        $table_city->addColumn(
            'entity_id',
            \Magento\Framework\DB\Ddl\Table::TYPE_INTEGER,
            null,
            array('identity' => true,'nullable' => false,'primary' => true,'unsigned' => true,),
            'City ID'
        );

        $table_city->addColumn(
            'region_id',
            \Magento\Framework\DB\Ddl\Table::TYPE_INTEGER,
            null,
            array('nullable' => false, 'unsigned' => true),
            'Region Id'
        );

        $table_city->addColumn(
            'city',
            \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
            50,
            ['nullable' => false],
            'City Name'
        );

        $table_city->addIndex(
            $installer->getIdxName('idx', ['city_id']),
            ['region_id']
        );

        $setup->getConnection()->createTable($table_city);

        $setup->endSetup();
    }
}